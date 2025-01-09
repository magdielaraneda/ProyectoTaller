import Reservacion from "../models/reservas.model.js";
import User from "../models/user.model.js";
import Servicio from "../models/servicios.model.js";
import { sendEmail } from "../utils/mailer.js";
import mongoose from "mongoose";
import { io } from "../index.js";
import Role from "../models/role.model.js";

export const obtenerColaboradoresPorServicio = async (req, res) => {
  try {
    const { servicioId } = req.query;

    // Obtener el ObjectId del rol "colaborador"
    const role = await Role.findOne({ name: "colaborador" });
    if (!role) {
      return res.status(404).json({ error: "Rol 'colaborador' no encontrado" });
    }

    // Buscar colaboradores con el rol "colaborador"
    let colaboradores = await User.find({ roles: role._id }).populate("servicios");

    // Filtrar colaboradores por servicioId si se proporciona
    if (servicioId) {
      colaboradores = colaboradores.filter((colaborador) =>
        colaborador.servicios.some((servicio) => servicio._id.toString() === servicioId)
      );
    }

    if (colaboradores.length === 0) {
      return res.status(404).json({ message: "No se encontraron colaboradores" });
    }

    res.json(colaboradores);
  } catch (error) {
    console.error("Error al obtener colaboradores:", error.message);
    res.status(500).json({ error: "Error interno al obtener colaboradores" });
  }
};


export const obtenerHorarioColaborador = async (req, res) => {
  try {
    const { colaboradorId, semanaInicio } = req.query;

    // Validar parámetros
    if (!colaboradorId || !semanaInicio) {
      return res.status(400).json({ error: "Faltan parámetros requeridos" });
    }

    const inicio = new Date(semanaInicio);
    if (isNaN(inicio)) {
      return res.status(400).json({ error: "Fecha de inicio inválida" });
    }

    const fin = new Date(inicio);
    fin.setDate(inicio.getDate() + 6);

    const reservas = await Reservacion.find({
      colaboradorId,
      horario: { $gte: inicio, $lt: fin },
    }).lean();

    const horarioSemanal = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicio);
      dia.setDate(inicio.getDate() + i);

      const horariosDia = [];
      for (let hora = 8; hora < 17; hora++) {
        if (hora === 13) continue;

        const inicioHora = new Date(dia);
        inicioHora.setHours(hora, 0, 0, 0);
        const finHora = new Date(inicioHora);
        finHora.setHours(hora + 1);

        const ocupado = reservas.some(
          (reserva) =>
            new Date(reserva.horario).getTime() === inicioHora.getTime()
        );

        horariosDia.push({ inicioHora, finHora, ocupado });
      }

      horarioSemanal.push({ dia, horariosDia });
    }

    res.json(horarioSemanal);
  } catch (error) {
    console.error("Error al obtener horario del colaborador:", error.message);
    res.status(500).json({ error: "Error al obtener horario del colaborador" });
  }
};



export const obtenerColaboradoresDisponibles = async (req, res) => {
  try {
    console.log("Iniciando la búsqueda de colaboradores disponibles...");

    // Obtener el ObjectId del rol "colaborador"
    const rolColaborador = await Role.findOne({ name: "colaborador" });
    if (!rolColaborador) {
      console.log("Rol 'colaborador' no encontrado.");
      return res
        .status(404)
        .json({ error: "No se encontró el rol 'colaborador' en la base de datos." });
    }

    console.log("ObjectId del rol 'colaborador':", rolColaborador._id);

    // Buscar colaboradores que tienen el rol "colaborador"
    const colaboradores = await User.find({ roles: rolColaborador._id });
    console.log("Colaboradores encontrados:", colaboradores);

    if (!colaboradores || colaboradores.length === 0) {
      console.log("No se encontraron colaboradores disponibles.");
      return res.status(404).json({ error: "No hay colaboradores disponibles en el sistema." });
    }

    res.json(colaboradores);
  } catch (error) {
    console.error("Error al obtener colaboradores disponibles:", error.message);
    res.status(500).json({ error: "Error al obtener colaboradores disponibles" });
  }
};



export const crearReservacion = async (req, res) => {
  const {
    servicioId,
    horario,
    clienteNombre,
    clienteEmail,
    clienteTelefono,
    direccionCliente,
    observaciones,
    colaboradorId,
  } = req.body;

  if (!servicioId || !colaboradorId || !horario || !clienteNombre || !clienteEmail || !clienteTelefono || !direccionCliente) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  try {
    // Validar que la fecha de la reserva sea al menos el día siguiente
    const fechaReserva = new Date(horario);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establecer la hora de la fecha actual a las 00:00:00
    const fechaMinimaReserva = new Date(fechaActual);
    fechaMinimaReserva.setDate(fechaActual.getDate() + 1);

    if (fechaReserva < fechaMinimaReserva) {
      return res.status(400).json({
        error: "No puedes hacer reservas para el mismo día ni para días anteriores.",
      });
    }

    const servicio = await Servicio.findById(servicioId);
    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado." });
    }

    const colaborador = await User.findById(colaboradorId);
    if (!colaborador) {
      return res.status(404).json({ error: "Colaborador no encontrado." });
    }

    const inicioReserva = new Date(horario);
    const finReserva = new Date(horario);
    finReserva.setHours(finReserva.getHours() + 1);

    const conflictos = await Reservacion.find({
      colaboradorId,
      $or: [
        { horario: { $gte: inicioReserva, $lt: finReserva } },
        { horarioFin: { $gt: inicioReserva, $lte: finReserva } },
      ],
    });

    if (conflictos.length > 0) {
      return res.status(400).json({ error: "El colaborador no está disponible en el horario seleccionado." });
    }

    const reservacion = new Reservacion({
      servicioId,
      horario: inicioReserva,
      horarioFin: finReserva,
      clienteNombre,
      clienteEmail,
      clienteTelefono,
      direccionCliente,
      observaciones,
      colaboradorId,
      estado: "en proceso",
      nombreServicio: servicio.nombre,
      categoria: servicio.categoria,
      precio: servicio.precio,
    });

    await reservacion.save();

    console.log("Reservación creada exitosamente:", reservacion);

    // Enviar correo de confirmación al cliente
    const emailSubject = "Reserva Creada";
    const emailText = `Hola ${clienteNombre}, tu reserva para el servicio ${servicio.nombre} ha sido creada. Aquí tienes los detalles:

Servicio: ${servicio.nombre}
Categoría: ${servicio.categoria}
Fecha y Hora: ${inicioReserva.toLocaleString()}
Dirección: ${direccionCliente}
Observaciones: ${observaciones || "Sin observaciones"}

Si necesitas cancelar tu reserva, puedes hacerlo desde el siguiente enlace:`;

    const emailHtml = `
      <h1>Reserva Creada</h1>
      <p>Hola <strong>${clienteNombre}</strong>,</p>
      <p>Tu reserva para el servicio <strong>${servicio.nombre}</strong> ha sido creada con éxito.</p>
      <h2>Detalles de tu Reserva:</h2>
      <ul>
        <li><strong>Servicio:</strong> ${servicio.nombre}</li>
        <li><strong>Categoría:</strong> ${servicio.categoria}</li>
        <li><strong>Fecha y Hora:</strong> ${inicioReserva.toLocaleString()}</li>
        <li><strong>Dirección:</strong> ${direccionCliente}</li>
        <li><strong>Observaciones:</strong> ${observaciones || "Sin observaciones"}</li>
      </ul>
      <p>Si necesitas cancelar tu reserva, haz clic en el siguiente enlace:</p>
      <a href="http://localhost:3000/api/reservaciones/cancelar/${reservacion._id}" style="display:inline-block; padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px;">Cancelar Reserva</a>
    `;

    await sendEmail(clienteEmail, emailSubject, emailText, emailHtml);

    res.status(201).json({ message: "Reserva creada con éxito", reservacion });
  } catch (error) {
    console.error("Error general al crear la reserva:", error.message);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const obtenerReservacionesAgrupadasPorFechaYCategoria = async (req, res) => {
  try {
    const reservaciones = await Reservacion.aggregate([
      {
        $lookup: {
          from: "servicios",
          localField: "servicioId",
          foreignField: "_id",
          as: "servicioInfo",
        },
      },
      { $unwind: "$servicioInfo" },
      {
        $lookup: {
          from: "users",
          localField: "colaboradorId",
          foreignField: "_id",
          as: "colaboradorInfo",
        },
      },
      {
        $group: {
          _id: {
            fecha: { $dateToString: { format: "%Y-%m-%d", date: "$horario" } },
            categoria: "$servicioInfo.categoria",
          },
          reservas: {
            $push: {
              _id: "$_id",
              horario: "$horario",
              clienteNombre: "$clienteNombre",
              estado: "$estado",
              nombreServicio: "$servicioInfo.nombre",
              colaborador: { $arrayElemAt: ["$colaboradorInfo", 0] }, // Asociar colaborador
              reporteId: "$reporteId",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.fecha",
          categorias: { $push: { categoria: "$_id.categoria", reservas: "$reservas" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(reservaciones);
  } catch (error) {
    console.error("Error al obtener reservas agrupadas:", error.message);
    res.status(500).json({ error: "Error al obtener reservas agrupadas." });
  }
};



export const obtenerReservasPorColaborador = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "El ID del colaborador no es válido." });
  }

  try {
    const reservas = await Reservacion.find({ colaboradorId: id }).populate("servicioId", "nombre categoria precio");
    if (!reservas || reservas.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservaciones." });
    }
    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerReservacionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const reservacion = await Reservacion.findById(id)
  .populate("servicioId")
  .populate("colaboradorId", "nombre email");
    if (!reservacion) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json(reservacion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reservación", details: error.message });
  }
};

export const eliminarReservacion = async (req, res) => {
  const { id } = req.params;

  try {
    const reservacion = await Reservacion.findByIdAndDelete(id);
    if (!reservacion) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json({ message: "Reserva eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};

export const cancelarReservacion = async (req, res) => {
  const { id } = req.params;

  try {
    const reservacion = await Reservacion.findById(id);

    if (!reservacion) {
      return res.redirect("http://localhost:5173/cancelacion?estado=no-encontrada");
    }

    // Eliminar la reservación
    await reservacion.deleteOne();

    res.redirect("http://localhost:5173/cancelacion?estado=exito");
  } catch (error) {
    console.error("Error al cancelar y eliminar la reserva:", error.message);
    res.redirect("http://localhost:5173/cancelacion?estado=error");
  }
};

