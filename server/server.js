import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import cors from "cors";

// Routers
import userAuthentication from "./routers/userAuthRouter.js";
import blogsRouter from "./routers/blogsRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";


const server = express();
let PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_LOCATION,{autoIndex:true});


// Middlewares
server.use(express.json());
server.use(cors({origin:"*"}));
server.use("/",userAuthentication);
server.use("/",blogsRouter);
server.use("/",settingsRouter);
server.use("/",dashboardRouter);

server.listen(PORT,()=>{
    console.log("Server is listening on port 3000");
})
