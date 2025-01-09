import Swal from "sweetalert2";

/**
 * Muestra una alerta de éxito al crear una reserva.
 * @param {string} message - Mensaje a mostrar
 */
export const showCrearReserva = async (message) => {
  await Swal.fire({
    icon: "success",
    title: message || "Reserva creada exitosamente",
  });
};

/**
 * Muestra una alerta de error al crear una reserva.
 * @param {Error} error - Error a mostrar
 */
export const showErrorCrearReserva = async (error) => {
  const errorMessage = error.message || "Error desconocido al crear la reserva";
  let title = "Error al crear la reserva";
  let text = errorMessage;

  if (errorMessage.includes("No disponible")) {
    title = "Horario no disponible";
    text = "El servicio no está disponible en el horario especificado. Selecciona otro horario.";
  } else if (errorMessage.includes("Servicio no encontrado")) {
    title = "Servicio no encontrado";
    text = "El servicio solicitado no existe. Verifica los datos ingresados.";
  }

  await Swal.fire({
    icon: "error",
    title,
    text,
  });
};

/**
 * Muestra una alerta de éxito al asignar un colaborador.
 * @param {string} clienteNombre - Nombre del cliente.
 * @param {string} nombreServicio - Nombre del servicio asignado.
 */
export const showAsignarColaborador = async (clienteNombre, nombreServicio) => {
  await Swal.fire({
    icon: "success",
    title: "Colaborador asignado",
    html: `
      <p>El colaborador ha sido asignado exitosamente para:</p>
      <p><strong>Cliente:</strong> ${clienteNombre}</p>
      <p><strong>Servicio:</strong> ${nombreServicio}</p>
    `,
    confirmButtonText: "Aceptar",
  });
};

/**
 * Muestra una alerta de confirmación al cancelar una reserva.
 */
export const showCancelarReserva = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro de cancelar la reserva?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cancelar",
    cancelButtonText: "No, mantener",
    reverseButtons: true,
    customClass: {
      confirmButton: "bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600",
      cancelButton: "bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600",
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      icon: "success",
      title: "Reserva cancelada con éxito",
    });
  } else {
    await Swal.fire({
      icon: "info",
      title: "Cancelado",
      text: "La reserva sigue activa.",
    });
  }

  return result.isConfirmed;
};

/**
 * Muestra una notificación estilo "toast".
 * @param {string} icon - Icono (info, success, warning, error).
 * @param {string} title - Título de la notificación.
 * @param {string} text - Mensaje de la notificación.
 * @param {function} onClick - Acción a realizar al hacer clic (opcional).
 */
export const showToastNotification = (icon, title, text, onClick = null) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("click", () => {
        if (onClick) onClick();
      });
    },
  });
};


/**
 * Muestra una alerta de éxito al crear un servicio.
 */
export const showCrearServicio = async () => {
  await Swal.fire({
    icon: "success",
    title: "Servicio creado exitosamente",
  });
};

/**
 * Muestra una alerta de error al crear un servicio.
 * @param {Error} error - Error a mostrar
 */
export const showErrorCrearServicio = async (error) => {
  const errorMessage = error.message || "Error desconocido al crear el servicio";
  await Swal.fire({
    icon: "error",
    title: "Error al crear el servicio",
    text: errorMessage,
  });
};

/**
 * Muestra una alerta de éxito al enviar una encuesta.
 */
export const showCrearEncuesta = async () => {
  await Swal.fire({
    icon: "success",
    title: "Encuesta enviada exitosamente",
  });
};

/**
 * Muestra una alerta de error al enviar una encuesta.
 */
export const showErrorCrearEncuesta = async (error) => {
  const errorMessage = error.message || "Error desconocido al enviar la encuesta";
  await Swal.fire({
    icon: "error",
    title: "Error al enviar la encuesta",
    text: errorMessage,
  });
};

/**
 * Muestra una alerta de éxito al actualizar un reporte.
 */
export const showActualizarReporte = async () => {
  await Swal.fire({
    icon: "success",
    title: "Reporte actualizado con éxito",
  });
};

/**
 * Muestra una alerta de error al actualizar un reporte.
 * @param {Error} error - Error a mostrar
 */
export const showErrorActualizarReporte = async (error) => {
  const errorMessage = error.message || "Error desconocido al actualizar el reporte";
  await Swal.fire({
    icon: "error",
    title: "Error al actualizar el reporte",
    text: errorMessage,
  });
};

/**
 * Muestra una alerta de éxito al eliminar una reserva.
 */
export const showEliminarReserva = async () => {
  await Swal.fire({
    icon: "success",
    title: "Reserva eliminada con éxito",
  });
};

/**
 * Muestra una alerta de éxito al eliminar un servicio.
 */
export const showEliminarServicio = async () => {
  await Swal.fire({
    icon: "success",
    title: "Servicio eliminado con éxito",
  });
};


/**
 * Muestra una notificación de éxito.
 * @param {string} message - El mensaje a mostrar.
 */
export const showSuccessNotification = async (message) => {
  await Swal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: message || "La operación se completó con éxito.",
  });
};

/**
 * Muestra una notificación de error.
 * @param {string} message - El mensaje de error.
 */
export const showErrorNotification = async (message) => {
  await Swal.fire({
    icon: "error",
    title: "Error",
    text: message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
  });
};
/**
 * Muestra una alerta de confirmación al eliminar un reporte.
 */
export const showEliminarReporte = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro de eliminar este reporte?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No, cancelar",
    reverseButtons: true,
    customClass: {
      confirmButton: "bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600",
      cancelButton: "bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600",
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      icon: "success",
      title: "Reporte eliminado con éxito",
    });
  } else {
    await Swal.fire({
      icon: "info",
      title: "Cancelado",
      text: "El reporte no se eliminó.",
    });
  }

  return result.isConfirmed;
};
