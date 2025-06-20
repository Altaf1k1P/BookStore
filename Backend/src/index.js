import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
    path: './.env'
})

// db
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
})

.catch((error)=>{
    console.log('Failed to connect to the MongoDB', error);
});