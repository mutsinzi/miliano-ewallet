import mongoose from "mongoose";
import 'colors'

const connect = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI || 'mongodb+srv://moz:hs1vu0MgOJUVBKyw@miliano.hby8z8j.mongodb.net/?retryWrites=true&w=majority&appName=miliano', {dbName: process.env.DB_NAME || 'milianowallet'})
        console.log(`MongoDB Connected: ${conn?.connection?.host}`.cyan.underline)
    } catch(error){
        console.log(error);
        process.exit(1)
    }
}

export default connect;
