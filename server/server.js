import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import cors from "cors";

// Routers
import userAuthentication from "./routers/userAuthRouter.js";
import blogsRouter from "./routers/blogsRouter.js";
import podRouter from "./routers/podRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";
import contactRouter from "./routers/contactRouter.js";
import notificationRouter from "./routers/notificationRouter.js";
import interactionRouter from "./routers/interactionRouter.js";
import feedbackRouter from "./routers/feedbackRouter.js";

const server = express();
let PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_LOCATION, { autoIndex: true });


// Middlewares
server.use(express.json());
server.use(cors({ origin: "*" }));
server.use("/", userAuthentication);
server.use("/", blogsRouter);
server.use("/api/pod/", podRouter);
server.use("/", settingsRouter);
server.use("/", dashboardRouter);
server.use("/", contactRouter);
server.use("/", notificationRouter);
server.use("/",interactionRouter);
server.use("/",feedbackRouter);

server.listen(PORT, () => {
    console.log("Server is listening on port 3001");
})