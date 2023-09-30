
const express = require('express');
const path = require('path');
const app = express();
const blogService = require('./blog-service');
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });
  app.use('/app',(req, res) => {                       
    res.send("404 ERROR")   ;
  });
  


blogService.initialize()
  .then(() => {
    app.get('/blog', (req, res) => {
      blogService.getPublishedPosts()
        .then((posts) => {
          res.json(posts);
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });

    app.get('/posts', (req, res) => {
      // Use blogService to fetch and send posts data
      blogService.getAllPosts()
        .then((posts) => {
          res.json(posts);
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });

    app.get('/categories', (req, res) => {
      // Use blogService to fetch and send categories data
      blogService.getCategories()
        .then((categories) => {
          res.json(categories);
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
    

    // Start the server
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: http://localhost:${HTTP_PORT}`); //This will redirect you to the About page
    });
  })
  .catch((error) => {
    console.error('Initialization error:', error);
  });
