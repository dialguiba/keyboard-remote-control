const socketServer = io() 

//DOM elements
let message = document.getElementById('message');
let btn = document.getElementById('send');
let canvas = document.getElementById("myCanvas");

//Resolution
  
    //var FactorWidth = ResWidthPC/canvas.width;
    //var FactorHeight = ResHeightPC/canvas.height;


 
    btn.addEventListener('click', function(){
    //enviar los datos al servidor
    socketServer.emit('PC:Data', {
        IP: "192.168.1.13",
        Port: "4000",
        canvasWidth: canvas.width,        
        canvasHeight: canvas.height 
    }); 
    //console.log(username.value,message.value);
    });

    //window.addEventListener("load", function(e){
        
    //})
    
   /*  window.addEventListener("load", function(e) {        
        socketServer.emit('Canvas:Size', {        
            canvasWidth: canvas.width,        
            canvasHeight: canvas.height            
        });        
      }); */
    

    canvas.addEventListener("mousemove", function(e){
    if (!e) e = window.event;
    var ctx = canvas.getContext("2d");
    var x = e.offsetX==undefined?e.layerX:e.offsetX;
    var y = e.offsetY==undefined?e.layerY:e.offsetY;
    //console.log(x,y);    
    socketServer.emit('Canvas:Movement', {        
        positionx: x,        
        positiony: y
    }); 

    canvas.onmouseup = function(e){
        socketServer.emit('Canvas:Click', {        
            Type: "left",        
            Action: "up"
        });
    }
    canvas.onmousedown = function(e){
        socketServer.emit('Canvas:Click', {        
            Type: "left",        
            Action: "down"
        }); 
    }    

    canvas.onmouseout = function(e){
        socketServer.emit('Canvas:Click', {        
            Type: "all",        
            Action: "up"
        }); 
    }

});


