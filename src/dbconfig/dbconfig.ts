import mongoose from "mongoose"


export async function connect(){
    try {
        mongoose.connect(process.env.MONDO_URL!)
        const connection =mongoose.connection;

        connection.on("connected",()=>{
            console.log("Mongoose connected");
            
        })

        connection.on("erroe",(err)=>{
            console.log("something went wrong"+err);
            process.exit();
        })
    } catch (error) {
        console.log("somting went wrong -"+error);
        
    }
}