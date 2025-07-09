const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mangesh9326:Mangesh9326@library.ewonobb.mongodb.net/Library')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Connection error", err));

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String
});
const Book = mongoose.model('Book', bookSchema);

const books = [
  {
    title: "Atomic Habits",
    description: "An easy & proven way to build good habits & break bad ones.",
    price: 499,
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Alchemist",
    description: "A novel by Paulo Coelho about following your dreams.",
    price: 399,
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
  },
  {
    title: "Ikigai",
    description: "The Japanese secret to a long and happy life.",
    price: 299,
    image: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
  }
  // ✅ Add more if needed
];

Book.insertMany(books)
  .then(() => {
    console.log("📘 Books inserted successfully");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error inserting books", err);
    mongoose.disconnect();
  });
