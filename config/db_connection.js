const mongoose = require("mongoose");

async function connectDb() {
  try {
    const db = await mongoose.connect(process.env.DATABASE_CONNECTION);
    console.log("Database Connected", db.connection.host, db.connection.name);
  } catch (err) {
    console.error(err)
    process.exit(1);
  }
}

module.exports = connectDb;