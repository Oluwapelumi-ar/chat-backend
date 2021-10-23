const express = require("express");
const cors = require("cors");
const io = require("socket.io");

const app = express();


app.use(cors());


const http = require("http").createServer(app);


const socket = io(http,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});


socket.on("connection",(io)=>{
   
    io.on("addMessage",(data)=>{
        socket.emit("recieveMessage", data)
    })
})








app.post("/socket-test",(req, res, next)=>{

    socket.emit("recieveMessage", {id:2, name: "stanley"});

  res.send("sent")
})


http.listen("8000",()=>{
    console.log("listening on 8080")
})