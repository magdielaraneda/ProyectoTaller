import mongoose from "mongoose";
import { reporteBodySchema } from "../schema/reporte.schema.js";
import Reporte from "../models/reporte.model.js";
import Reservacion from "../models/reservas.model.js";
import nodemailer from "nodemailer";
import path from "path";


export const crearReporte = async (req, res) => {
  try {
    const { error } = reporteBodySchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error("Errores de validación:", error.details);
      return res.status(400).json({ errors: error.details.map((detail) => detail.message) });
    }

    console.log("Datos recibidos:", req.body);

    const reporteExistente = await Reporte.findOne({ reservacionId: req.body.reservacionId });
    if (reporteExistente) {
      return res.status(400).json({ error: "Ya existe un reporte para esta reservación." });
    }

    const fotosAntes = req.files?.fotosAntes
      ? req.files.fotosAntes.map((file) => path.posix.join("/uploads", file.filename))
      : [];
    const fotosDespues = req.files?.fotosDespues
      ? req.files.fotosDespues.map((file) => path.posix.join("/uploads", file.filename))
      : [];

    console.log("Fotos antes:", fotosAntes);
    console.log("Fotos después:", fotosDespues);

    const {
      reservacionId,
      horaInicio,
      horaTermino,
      tipoServicio,
      observacionesIniciales,
      recomendaciones,
      observacionesCliente,
      firmaCliente,
    } = req.body;

    if (new Date(horaInicio) >= new Date(horaTermino)) {
      return res.status(400).json({ error: "La hora de inicio debe ser menor a la hora de término." });
    }

    const reservacion = await Reservacion.findById(reservacionId);
    if (!reservacion) {
      return res.status(404).json({ error: "La reservación no existe en la base de datos." });
    }

    const reporte = new Reporte({
      reservacionId,
      horaInicio,
      horaTermino,
      tipoServicio,
      observacionesIniciales,
      fotosAntes,
      fotosDespues,
      recomendaciones,
      observacionesCliente,
      firmaCliente,
    });

    await reporte.save();

    reservacion.estado = "completada";
    reservacion.reporteId = reporte._id;
    await reservacion.save();

    if (reservacion.clienteEmail) {
      try {
        await enviarEncuestaPorCorreo(reservacion.clienteEmail, reservacionId);
      } catch (emailError) {
        console.error("Error al enviar la encuesta:", emailError.message);
      }
    }

    res.status(200).json({ message: "Reporte completado y notificado al cliente" });
  } catch (error) {
    console.error("Error general al completar reporte:", error.message);
    res.status(500).json({ error: "Error al completar reporte" });
  }
};

const enviarEncuestaPorCorreo = async (email, reservacionId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "aniiko.magdi@gmail.com",
        pass: process.env.EMAIL_PASS || "kofu bfza olox ydoo",
      },
    });

    const encuestaUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/encuestas/responder-encuesta/${reservacionId}`;
    const mensaje = `
      <h1>Encuesta de Satisfacción</h1>
      <p>Estimado cliente,</p>
      <p>Agradecemos su confianza. Por favor, tómese un momento para completar nuestra encuesta de satisfacción.</p>
      <a href="${encuestaUrl}" 
         style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
         Responder Encuesta
      </a>
      <p>Gracias por su tiempo.</p>
    `;

    // Enviar correo
    const info = await transporter.sendMail({
      from: `"INSERV-CHILE" <${process.env.EMAIL_USER || "aniiko.magdi@gmail.com"}>`,
      to: email,
      subject: "Encuesta de Satisfacción",
      html: mensaje,
    });

    console.log("Correo enviado:", info.messageId);

    // Actualizar estado de la reservación
    await Reservacion.findByIdAndUpdate(reservacionId, { encuestaEnviada: true });
    console.log("Estado de la encuesta actualizado correctamente.");
  } catch (error) {
    console.error("Error al enviar la encuesta:", error);
    throw new Error("No se pudo enviar la encuesta.");
  }
};

export const actualizarReporteServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const fotosAntes = req.files?.fotosAntes
      ? req.files.fotosAntes.map((file) => path.posix.join("/uploads", file.filename))
      : [];
    const fotosDespues = req.files?.fotosDespues
      ? req.files.fotosDespues.map((file) => path.posix.join("/uploads", file.filename))
      : [];

    const reservacion = await Reservacion.findById(id);
    if (!reservacion) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const reporte = await Reporte.findOneAndUpdate(
      { reservacionId: id },
      {
        colaboradorId: reservacion.colaboradorId,
        descripcion: req.body.descripcion || "",
        fotosAntes,
        fotosDespues,
        status: "completado",
      },
      { new: true, upsert: true }
    );

    reservacion.estado = "completado";
    reservacion.reporteId = reporte._id;
    await reservacion.save();

    if (reservacion.clienteEmail) {
      try {
        await enviarEncuestaPorCorreo(reservacion.clienteEmail, id);
      } catch (emailError) {
        console.error("Error al enviar la encuesta:", emailError.message);
      }
    }

    res.json({ message: "Reporte actualizado, estado de la reserva actualizado y encuesta enviada", reporte });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el reporte de servicio", details: error.message });
  }
};

export const obtenerReportesCompletados = async (req, res) => {
  try {
    const reportes = await Reporte.find()
      .populate("reservacionId", "clienteNombre horario estado")
      .populate("servicioId", "nombre categoria");

    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los reportes completados", details: error.message });
  }
};

export const obtenerReportePorId = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido." });
    }
    const reporte = await Reporte.findById(id).populate({
      path: "reservacionId",
      populate: {
        path: "servicioId",
        select: "nombre email categoria",
      },
    });

    if (!reporte) {
      return res.status(404).json({ error: "Reporte no encontrado." });
    }

    res.json(reporte);
  } catch (error) {
    console.error("Error al obtener el reporte:", error.message);
    res.status(500).json({
      error: "Error al obtener el reporte.",
      details: error.message,
    });
  }
};

export const eliminarReporte = async (req, res) => {
  const { id } = req.params;

  try {
    const reporteEliminado = await Reporte.findByIdAndDelete(id);
    if (!reporteEliminado) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    res.json({ message: "Reporte eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el reporte", details: error.message });
  }
};

