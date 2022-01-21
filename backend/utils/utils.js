const ObjectId = require("mongoose").Types.ObjectId;

const generateId = (start) => {
  const d = new Date();
  return (
    "" +
    start +
    d.getFullYear() +
    d.getMonth() +
    d.getDate() +
    "-" +
    (d.getHours() + d.getMinutes() + Math.floor(Math.random() * 9999))
  );
};

const validMongooseId = (id) => {
  return new ObjectId(id) == id;
};

module.exports = { generateId, validMongooseId };
