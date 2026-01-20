const mongoose = require('mongoose');

async function connectDatabase() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error('MONGO_URL nao definido no .env');
  }

  await mongoose.connect(mongoUrl, {
    autoIndex: true,
  });
}

module.exports = connectDatabase;
