const dotenv = require("dotenv");
dotenv.config();// Is this really required? I haven't had to use it before
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.error("Db is already initialized");//This should push an error, I've looked over these before
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      console.error("Something went wron with the DB!");//This one too.
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not Initialized.");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
