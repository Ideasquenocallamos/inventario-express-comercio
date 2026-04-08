//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './Base de Datos/db.js';  
import { getProductos, createProducto, getProductoById, updateProducto, deleteProducto } from './Controlador/controller.js';
import cors from 'cors'; // Instala con: npm install cors
dotenv.config();
 

const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json());

app.use(express.static('public'));

connectToDB();

// Rutas de la API
app.get('/productos', getProductos);
app.post('/productos', createProducto);
app.get('/productos/:id', getProductoById);
app.put('/productos/:id', updateProducto);
app.delete('/productos/:id', deleteProducto);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${port}`);
});