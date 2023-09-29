const express = require('express'); // "require" the Express module
const app = express(); // obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080; // assign a port
const path = require('path');

// start the server on the port and output a confirmation ot the console
// app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
app.listen(HTTP_PORT, () => {
    console.log(`Express http server listening on port ${HTTP_PORT}`);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('views/about.html');
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
  })


});




