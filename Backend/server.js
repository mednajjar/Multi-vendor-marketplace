const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3500;

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, ()=>{console.log(`server running on: http://localhost:${PORT}`)});

