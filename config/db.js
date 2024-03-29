import mongoose from "mongoose";
import 'colors'

const connect = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI, {dbName: process.env.DB_NAME || 'milianowallet'})
        console.log(`MongoDB Connected: ${conn?.connection?.host}`.cyan.underline)
    } catch(error){
        console.log(error);
        process.exit(1)
    }
}

export default connect;
