import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Cambia la URL al dominio de tu backend

export default socket;
