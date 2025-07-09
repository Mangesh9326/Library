import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  if (!book) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="mx-auto p-6 bg-white shadow rounded mt-10">
      <div className="flex flex-col md:flex-row">
        <img src={book.image} alt={book.title} className="w-full md:w-[350px] object-cover rounded" />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h2>
          <p className="text-gray-600 mb-4">{book.description}</p>
          <p className="text-xl font-bold text-blue-700 mb-6">₹{book.price}</p>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Add to Cart</button>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        <p className="text-gray-500 italic">No reviews yet.</p> {/* You can add logic later */}
      </div>
    </div>
  );
};

export default BookDetails;