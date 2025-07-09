import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleBuy = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const placeOrder = async () => {
    try {
      const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedBook),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Order placed successfully!');
      } else {
        alert('❌ Failed to place order: ' + data.message);
      }
    } catch (err) {
      alert('❌ Server error');
    }
    setShowModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Books</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
        {books.map(book => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
          >
            <Link to={`/book/${book._id}`}>
              <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
            </Link>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <Link to={`/book/${book._id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{book.description}</p>
                  <p className="text-lg font-bold text-blue-700 mb-4">₹{book.price}</p>
                </Link>
              </div>
              <button
                className="mt-auto bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
                onClick={() => handleBuy(book)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-transparent bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
            <p>Do you want to place an order for:</p>
            <p className="font-bold mt-2">{selectedBook.title}</p>
            <div className="mt-6 flex justify-around">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;