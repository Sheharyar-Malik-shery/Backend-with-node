import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
 try {
   let DBinstanse = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
   console.log(`Connected to database on host: ${DBinstanse.connection.host}`);
   
 } catch (error) {
     console.log("Somethink went wrong while connecting db",error);
     
 }
}

export default connectDB;