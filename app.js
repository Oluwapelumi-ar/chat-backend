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



const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

app.get('/', (req, res) => { // send a get request to root directory ('/' is this file (app.js))
  fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
    .then(res => res.json()) // return a promise containing the response
    .then(json => res.send(`<h1>Today's Activity: ${json.activity}!</h1>`)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
    .catch(function(err){ // catch any errors
      console.log(err); // log errors to the console
    })
})

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
})