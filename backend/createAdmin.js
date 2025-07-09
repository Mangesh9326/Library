const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb+srv://Mangesh9326:Mangesh9326@library.ewonobb.mongodb.net/Library')

  .then(() => console.log('Connected'))
  .catch(err => console.log('Connection error', err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model('Users', userSchema);

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('123', 10); // set your own password
  const user = new User({
    email: 'mangesh@gmail.com',
    password: hashedPassword
  });

  await user.save();
  console.log('✅ Admin created');
  mongoose.disconnect();
}

createAdmin();
