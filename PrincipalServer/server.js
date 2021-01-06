const path = require('path');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// start the server
const server = app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'))
})

// static files
app.use(express.static(path.join(__dirname , 'public')));

// Socket io
const SocketIO = require('socket.io');
const io = SocketIO(server); //Configuración del chat

// websockets
io.on('connection', (socket) => {

    socket.on('PC:Data', (data) => {
        //PARA SOCKET CON PC
        var io2 = require('socket.io-client')
        var socketPC = io2.connect('http://'+data.IP+':'+data.Port, {reconnect: true});
        // Add a connect listener
        socketPC.on('connect', function() { 
            console.log('Connected!');

          
                //console.log(data.canvasWidth, data.canvasHeight);
                //
                socketPC.emit('Canvas:Size', {        
                    canvasWidth: data.canvasWidth,        
                    canvasHeight: data.canvasHeight            
                });
            
               


    /* socket.on('Canvas:Size', (data) => {
        //console.log(data.canvasWidth, data.canvasHeight);
        //
        socketPC.emit('Canvas:Size', {        
            canvasWidth: data.canvasWidth,        
            canvasHeight: data.canvasHeight            
        });
    })  */

    socket.on('Canvas:Movement', (data) => {
        
        //console.log(data.positionx,data.positiony);
        //
        socketPC.emit('Canvas:Movement', {        
            positionx: data.positionx,        
            positiony: data.positiony
        });
    })

    socket.on('Canvas:Click', (data) => {
                
        if(data.Type == "left")
        {
            if(data.Action == "up")
            {
                //console.log(data.Type,data.Action);                
                //
                socketPC.emit('Canvas:Click', {        
                Type: "left",        
                Action: "up"
        });
                
            }
            else
            {
                //console.log(data.Type,data.Action);
                //
                socketPC.emit('Canvas:Click', {        
                    Type: "left",        
                    Action: "down"
                }); 
            }            
        }
        else if(data.Type == "all")
        {
            //console.log(data.Type,data.Action);
            //
            socketPC.emit('Canvas:Click', {        
                Type: "all",        
                Action: "up"
            }); 
        }  
    })   
});        
})   
})






