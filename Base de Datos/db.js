import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.URI).then(() => {
        console.log("Conectado a la base de datos de MongoDB");
    }).catch((error) => {
        console.log("Error al conectar a la base de datos de MongoDB: ", error);
    });
}

export default connectToDB;