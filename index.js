const path = require("path")
const extress = require("express")
const app = extress()
const cv = require('opencv4nodejs')
const server = require("http").Server(app)
const io = require("socket.io")(server)
const wCam = new cv.VideoCapture(0)
wCam.set(cv.CAP_PROP_FRAME_WIDTH,300)
wCam.set(cv.CAP_PROP_FRAME_HEIGHT,300)
const FPS=10
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'index.html'));
})
setInterval(()=>{
    const frame = wCam.read()
    const image = cv.imencode('.jpg',frame).toString('base64')
io.emit('image',image)
},1000/FPS)
server.listen(3000)
console.log("asda")