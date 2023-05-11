const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


let books = [];


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/books', (req, res) => {
  res.json(books);
});


app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;


  const id = Date.now().toString();


  const book = {
    id,
    title,
    author,
    publishedDate
  };


  books.push(book);


  res.json(book);
});


app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    
    const deletedBook = books.splice(index, 1)[0];

    
    res.json({ message: 'Book successfully deleted', deletedBook });
  } else {
    
    res.status(404).json({ message: 'Book not found' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
