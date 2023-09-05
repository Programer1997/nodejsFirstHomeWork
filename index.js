const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Declare a constant (array) as your data for demonstration purposes
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Middleware to simulate database operations
function findItemById(id) {
  return data.find(item => item.id === parseInt(id));
}

function addItem(item) {
  data.push(item);
  return item;
}

function updateItem(id, updatedItem) {
  const index = data.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    return data[index];
  }
  return null;
}

function deleteItem(id) {
  const index = data.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    return deletedItem[0];
  }
  return null;
}

//Browse default get
app.get("/",(req,res)=>{
    res.send("Tu servidor esta funcionando correctamente accede a alguna de las rutas para realizar alguna accion GET,POST,DELETE,PUT");
});

// Browse (GET all items)
app.get('/items', (req, res) => {
  res.json(data);
});

// Read (GET a specific item)
app.get('/items/:id', (req, res) => {
  const item = findItemById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Add (POST an item)
app.post('/items', (req, res) => {
  const newItem = req.body;
  const addedItem = addItem(newItem);
  res.status(201).json(addedItem);
});

// Edit (PUT - Update an item)
app.put('/items/:id', (req, res) => {
  const updatedItem = req.body;
  const item = updateItem(req.params.id, updatedItem);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete (DELETE an item)
app.delete('/items/:id', (req, res) => {
  const item = deleteItem(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
