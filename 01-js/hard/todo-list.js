/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.items = [];
  }
  add(x) {
    this.items.push(x);
  }
  getAll() {
    return this.items;
  }
  remove(index) {
    if (index < 0) {
      throw new Error();
    }
    this.items.splice(index, 1);
  }
  get(index) {
    if (index < 0) {
      throw new Error();
    }
    if (this.items[index] == undefined) {
      return null;
    }
    return this.items[index];
  }
  clear() {
    this.items = [];
  }
  update(index, todo) {
    try {
      if (index < 0 || index >= this.items.length) {
        throw new Error();
      }
      this.items[index] = todo;
    } catch (err) {
    }
  }
}

module.exports = Todo;
