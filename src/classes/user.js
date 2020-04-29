//
class User {
  constructor() {
    this.people = [];
  }

  addPerson(id, name, room) {
    let person = { id, name, room };

    this.people.push(person);

    return this.people;
  }
  getById(id) {
    let person = this.people.filter((person) => {
      return person.id === id;
    })[0];

    return person;
  }

  getPeople() {
    return this.people;
  }

  getPeopleRoom(room) {
    let peopleRoom = this.people.filter((person) => {
      return person.room === room;
    });

    return peopleRoom;
  }

  deletePerson(id) {
    let personDelete = this.getById(id);

    this.people = this.people.filter((person) => {
      return person.id != id;
    });

    return personDelete;
  }
}

module.exports = {
  User,
};
