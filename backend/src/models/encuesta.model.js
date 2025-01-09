import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EncuestaSchema = new Schema({
  reservacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservacion",
    required: true,
    unique: true, // Evita duplicados a nivel de base de datos
  },
  clasificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },
  comentario: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
}, {
  timestamps: true,
});

export default model("Encuesta", EncuestaSchema);
