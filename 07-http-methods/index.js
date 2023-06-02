const http = require("http")
const fs = require("fs")
const url = require("url")


const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.method} New Req Received`;
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        if (myUrl.pathname === "/favicon.ico") return res.end()
        switch (myUrl.pathname) {
            case '/': if (req.method === 'GET') res.end("hello from Home")
                break;
            case '/about':
                const userName = myUrl.query.myName;
                res.end(`hello from about ${userName}`)
            case '/signup':

                if (req.method === 'GET') res.end(`hello from signup`)
                else if (req.method === 'POST') {
                    //send data to DB
                    res.end(`Sucess`)
                }
                break;
            default: res.end("hello from 404")
        }
    })
});


myServer.listen(8000, () => {
    console.log('server started');
})





