const express = require('express');
const os = require('os');
const path = require('path');
const app = express();
const port = 6969;

app.use(express.static(__dirname));

app.get('/info', (req, res) => {
    const info = {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        uptime: os.uptime(),
        totalMemory: os.totalmem() / 1_000_000,
        freeMemory: os.freemem()  / 1_000_000
    };
    res.json(info);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});