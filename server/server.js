const http = require('http');
const app = require('./app');

const PORT = 5000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
