const express = require('express')
const logFunc = require('./midleware/logger')
const port = process.env.PORT || 8000
const ConnectModule = require('./module/connect&feed')
const app = express()

//MidleWare For Read Json 
app.use(express.json())
app.use(logFunc)
// Router For Req Api
app.use('/burapat/board/' , ConnectModule)

app.get('/' , (req, res)=> {
    res.send('This is Default Page')
})
app.listen(port , ()=> {
    console.log('start wtih ' , port);
})