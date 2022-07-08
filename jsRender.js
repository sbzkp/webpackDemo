const express = require('express');
const math = require('./src/test/test')
const app = express();

const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;
 
    console.log("访问地址为 http://%s:%s", host, port);

});

app.get('/', function (req, res) {
    setTimeout(()=>{
        res.send('Hello2323 World!');
    }, 1000)
})
app.get('/test', function (req, res) {
    res.type('application/javascript');
    res.set("access-control-allow-origin", "*")
    setTimeout(()=>{
        res.sendFile('/Users/admin/Desktop/study/webpackDemo-master/src/test/test.js')
    }, 3000)
})

app.get('/time', function (req, res) {
    console.log("time time time")
    res.type('application/javascript');
    res.set("access-control-allow-origin", "*")
    setTimeout(()=>{
        res.sendFile('/Users/admin/Desktop/study/webpackDemo-master/src/test/test.js')
    }, 1000)
})

