const path = require('path');
const express = require('express');
const app = express();

//robotjs
var robot = require("robotjs");

// settings
app.set('port', process.env.PORT || 4000);

// start the server
const server = app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'))
})

// static files
app.use(express.static(path.join(__dirname , 'public')));

// Socket io
const SocketIO = require('socket.io');
const io = SocketIO(server); //Configuración del chat


var screen = robot.getScreenSize();
    //console.log(screen.width + "x" + screen.height);  

// websockets
io.on('connection', (socket) => {

    var factorWidth, factorHeight;

    socket.on('Canvas:Size', (data) => {
       
        console.log(data.canvasWidth, data.canvasHeight)
        factorWidth=screen.width/data.canvasWidth;
        factorHeight=screen.height/data.canvasHeight;
        console.log(factorWidth, factorHeight)
        
    }) 

    socket.on('Canvas:Movement', (data) => {
        
        robot.moveMouse((data.positionx*factorWidth).toFixed(), (data.positiony*factorHeight).toFixed());
        //console.log((data.positionx*factorWidth).toFixed(), (data.positiony*factorHeight).toFixed());
       
    })

    socket.on('Canvas:Click', (data) => {
                
        if(data.Type == "left")
        {
            if(data.Action == "up")
            {
                //console.log(data.Type,data.Action);
                robot.mouseToggle("up","left")
            }
            else
            {
                //console.log(data.Type,data.Action);
                robot.mouseToggle("down","left")
            }            
        }
        else if(data.Type == "all")
        {
            //console.log(data.Type,data.Action);
            robot.mouseToggle("up","left")
        }  
    })
    
})
