const fs = require('fs');
const path = require('path');

// Paths to data files
const postsFilePath = path.join(__dirname, 'data', 'Posts.json');
const categoriesFilePath = path.join(__dirname, 'data', 'Categories.json');

// Global arrays 
let posts = [];
let categories = [];

// Function to read  JSON file
function readAndParseJSONFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Unable to read file: ${filePath}`);
        return;
      }
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (error) {
        reject(`Error parsing JSON file: ${filePath}`);
      }
    });
  });
}

// Module Initialized by reading and loading data files
function initialize() {
  return Promise.all([
    readAndParseJSONFile(postsFilePath).then((data) => (posts = data)),
    readAndParseJSONFile(categoriesFilePath).then((data) => (categories = data)),
  ]);
}

// Function to get all posts
function getAllPosts() {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      reject('No results returned');
    } else {
      resolve(posts);
    }
  });
}

// Function to get published posts
function getPublishedPosts() {
  return new Promise((resolve, reject) => {
    const publishedPosts = posts.filter((post) => post.published === true);
    if (publishedPosts.length === 0) {
      reject('No results returned');
    } else {
      resolve(publishedPosts);
    }
  });
}

// Function to get all categories
function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject('No results returned');
    } else {
      resolve(categories);
    }
  });
}

module.exports = {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories,
};
