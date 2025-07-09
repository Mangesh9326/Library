import React, { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '' });

  // Fetch books
  const fetchBooks = async () => {
    const res = await fetch('http://localhost:5000/books');
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Book deleted');
      fetchBooks();
    } else {
      alert('Error deleting book');
    }
  };

  // Handle Edit button
  const handleEdit = (book) => {
    setEditBook(book._id);
    setForm({ title: book.title, description: book.description, price: book.price, image: book.image });
  };

  // Save edited book
  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/books/${editBook}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Book updated');
      setEditBook(null);
      fetchBooks();
    } else {
      alert('Failed to update book');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Manage Books</h2>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">₹{book.price}</td>
                  <td className="py-2 px-4">
                    <img src={book.image} alt={book.title} className="w-16 h-20 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const confirm = window.confirm(`Are you sure to delete "${book.title}"?`);
                        if (confirm) handleDelete(book._id);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Form */}
      {editBook && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">✏️ Edit Book</h3>

            <button
              onClick={() => setEditBook(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border p-2 rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Price"
                className="border p-2 rounded"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="border p-2 rounded"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="border p-2 rounded"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setEditBook(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Update Book
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookList;