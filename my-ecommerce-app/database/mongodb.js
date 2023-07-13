import mongoose from "mongoose"; //npm i mongoose

const connection = {};
const uri = "mongodb+srv://tahir:1@eticaretdb.24vlokn.mongodb.net/";

export default async function dbConnect(){
    if(connection.isConnected) return;

    const db = await mongoose.connect(uri);

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDb Bağlantısı Başarılı!");
}