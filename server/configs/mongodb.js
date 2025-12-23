import mongoose from "mongoose"

const  connectDB= async ()=>{
   await mongoose.connect(`${process.env.DB_URL}`).then(()=> console.log('db connected ')).catch(()=>{console.log('db dis connected')})

}
export default connectDB