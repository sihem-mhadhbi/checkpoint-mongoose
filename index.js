const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("could not connect to the mongodb");
  });
// schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});
//create model
const Person = mongoose.model("Person", personSchema);
// Create and Save a Record of a Model:
const createPerson = async () => {
  const person = await Person.create({
    name: "mhadhbi sihem",
    age: 24,
    favoriteFoods: ["pizza", "lazania", "pancake"],
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
//createPerson();
// Create Many Records with model.create()
const createPersonnes = async (personnes) => {
  try {
    const result = await Person.find(personnes);
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
createPersonnes([
  {
    name: "ines elkefi",
    age: 27,
    favoriteFoods: ["couscous", "walnut bubble", "gateau"],
  },
  {
    name: "rawdha rawdha",
    age: 27,
    favoriteFoods: ["souflé", "gateau"],
  },
  {
    name: "mary mary",
    age: 27,
    favoriteFoods: ["walnut bubble", "gateau"],
  },
]);
createPersonnes();

//find model
const findPerson = async (person) => {
  try {
    const result = await Person.find({ name: person });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
findPerson("rawdha rawdha");

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = async (food) => {
  try {
    const result = await Person.findOne({ favoriteFoods: food });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
//findOnePerson("gateau");
//Use model.findById() to Search Your Database By _id
const findIdPerson = async (personId) => {
  try {
    const result = await Person.find({ _id: personId });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
//findIdPerson("635d3060faea1e0536cd4312");
//Perform Classic Updates by Running Find, Edit, then Save
const updateFood = async (id, food) => {
  try {
    const result = await Person.findById({ _id: id });
    result.favoriteFoods.push(food);
    await result.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//updateFood("635d3060faea1e0536cd4312", "hamburger");
//Perform New Updates on a Document Using model.findOneAndUpdate()
const updateAge = async (name, age) => {
  try {
    const result = await Person.findOneAndUpdate(
      { name },
      { age },
      { new: true }
    );
    await result.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
updateAge("rawdha rawdha", 20);

//Delete One Document Using model.findByIdAndRemove
const deletePerson = async (id) => {
  try {
    const result = await Person.findByIdAndRemove({ _id: id });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
deletePerson("635d2ed85d22a1c819f25c7c");
//MongoDB and Mongoose - Delete Many Documents with model.remove()
