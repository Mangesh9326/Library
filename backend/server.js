const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (specify `library` DB)
mongoose.connect('mongodb+srv://Mangesh9326:Mangesh9326@library.ewonobb.mongodb.net/Library')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Connection error", err));

// =============================
// ✅ SCHEMAS AND MODELS
// =============================

// Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String
});
const Book = mongoose.model('Book', bookSchema);

// User (Admin) schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// =============================
// ✅ ROUTES
// =============================

// GET: Fetch all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
   
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a book
app.delete('/books/:id', async (req, res) => {
  console.log("Deleting Book ID:", req.params.id);
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// POST: Add new book
app.post('/books', async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const book = new Book({ title, description, price, image });
    await book.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

// GET: All orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderedAt: -1 }); // newest first
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});


// PUT (Update) a book
app.put('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: 'Error updating book' });
  }
});




const orderSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  orderedAt: {
    type: Date,
    default: Date.now
  }
});
const Order = mongoose.model('Order', orderSchema);

app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order' });
  }
});


// GET single book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST: Admin login (no token, just password check)
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Login successful' }); // ✅ no token logic
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =============================
// ✅ SERVER START
// =============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});