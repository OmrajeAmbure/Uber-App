const port = process.env.PORT || 4000;
const http = require('http');
const app = require('./index');

const server = http.createServer(app);

server.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
