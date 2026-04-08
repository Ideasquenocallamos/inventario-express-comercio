import { Producto } from "../Modelo/producto.js";

// 1. Listar todos los productos (GET /productos)
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos); // Status 200 explícito
  } catch (error) {
    res.status(500).json({ 
        mensaje: "Error interno al obtener productos",
        error: error.message 
    });
  }
};

// 2. Crear producto (POST /productos)
export const createProducto = async (req, res) => {
  try {
    // Validación de campos requeridos (Punto 3 de la rúbrica)
    const { nombre, precio, stock, categoria } = req.body;
    if (!nombre || precio === undefined || stock === undefined || !categoria) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto); // 201: Creado con éxito
  } catch (error) {
    res.status(400).json({ 
        mensaje: "Error en la validación de datos", 
        detalle: error.message 
    });
  }
};

// 3. Ver un solo producto (GET /productos/:id)
export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    // Si el ID no tiene el formato correcto de MongoDB, caerá aquí
    res.status(400).json({ mensaje: "El formato del ID proporcionado es inválido" });
  }
};

// 4. Actualizar (PUT /productos/:id)
export const updateProducto = async (req, res) => {
  try {
    // runValidators: true asegura que se validen los datos también al editar
    const actualizado = await Producto.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } 
    );
    
    if (!actualizado) {
        return res.status(404).json({ mensaje: "No se encontró el producto para actualizar" });
    }
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ 
        mensaje: "Error al actualizar el producto", 
        detalle: error.message 
    });
  }
};

// 5. Eliminar (DELETE /productos/:id)
export const deleteProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    
    if (!eliminado) {
        return res.status(404).json({ mensaje: "No se encontró el producto para eliminar" });
    }
    
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al procesar la eliminación" });
  }
};