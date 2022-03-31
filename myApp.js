require('dotenv').config();
const mongoose = require('mongoose');
require('mongodb')

let Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);
let arrayOfPeople = [{ 
  name: "Alejandro",
  age: 20,
  favoriteFoods: ['Eggs', 'Potatoes']
},
{
  name: "Victor",
  age: 34,
  favoriteFoods: ['Unknown']
}];

const createAndSavePerson = (done) => {
  let person = new Person({ name: "Alejandro", age: 20, favoriteFoods: ['Eggs', 'Potatoes'] });
  person.save((err, data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ 
    name: personName
  }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, (err, data) => {
    if(err) return console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if(err) return console.error(err);
      done(null, data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },(err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if(err) return console.error(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
