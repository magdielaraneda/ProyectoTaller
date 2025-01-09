import express from 'express';
import { enviarEncuesta, getEncuestas, eliminarEncuesta, getEncuestasByColaborador } from '../controllers/encuesta.controller.js';
import { isGerente } from '../middlewares/authorization.middleware.js';
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post('/', enviarEncuesta);
router.get('/:id?', getEncuestas);
router.get('/buscar/colaborador', getEncuestasByColaborador);
router.delete('/:id', authenticationMiddleware, isGerente, eliminarEncuesta);

export default router;
