const { Router } = require('express');
const connectRount = Router();
const mqtt = require('mqtt')

// option for mqtt
const option1 = {
    reconnectreconnectPeriod: 0,
    connectTimeout: 5000,

}

connectRount.post('/control-board', (req, res) => {
    const userData = req.body
    const client = mqtt.connect(userData.url, option1)
    client.on('connect', () => {
        client.publish(userData.topic + userData.password, userData.control)
        const rev = `/burapat/board/pass/${userData.password}/callback`
        client.subscribe(rev, () => {
            client.on('message', (topic, mess) => {
                res.json({
                    status: mess
                })
                client.end()
                res.end()
                clearTimeout(delay)
            })
            const delay = setTimeout(() => { 
                res.json({
                    status:"Error"
                })
                res.end()
            }, 5000)


        })})
        client.on('error', (err) => {
            res.json({
                status: 'Error'
            })
            client.end()
            res.end()
        })
    })


    module.exports = connectRount


