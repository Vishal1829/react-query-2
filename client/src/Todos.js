// Todos.js

// Dummy array of todos
let todos = [
  { id: 1, title: 'Complete assignment', completed: false },
  { id: 2, title: 'Buy groceries', completed: true },
  { id: 3, title: 'Read book', completed: false },
];

// Asynchronous function to add a new todo
const addTodo = async (title) => {
  console.log("in add todo method")
  try {
    // Simulate asynchronous operation, such as an API request
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay with setTimeout

    // Generate a unique ID for the new todo
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    // Create the new todo object
    const todo = { id, title, completed: false }; // Assuming new todos are initially not completed

    // Add the new todo to the array
    todos.push(todo);

    // Return the newly added todo
    return todo;
  } catch (error) {
    // Handle any errors that occur during the asynchronous operation
    console.error('Error adding todo:', error);
    throw new Error('Failed to add todo');
  }
};

// Asynchronous function to fetch all todos
const fetchTodos = async () => {
  try {
    // Simulate asynchronous operation, such as an API request
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay with setTimeout

    // Return all todos
    return todos;
  } catch (error) {
    // Handle any errors that occur during the asynchronous operation
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
};

// Asynchronous function to fetch a todo by ID
const fetchTodoById = async (id) => {
  try {
    // Simulate asynchronous operation, such as an API request
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay with setTimeout
    
    // Find the todo with the specified ID
    const todo = todos.filter((item) => item.id == id )
    
    console.log("in find todo by id method")
    // Return the todo
    console.log("todo -> ", todo)
    return todo;
  } catch (error) {
    // Handle any errors that occur during the asynchronous operation
    console.error('Error fetching todo by ID:', error);
    throw new Error('Failed to fetch todo by ID');
  }
};


export { todos, addTodo, fetchTodos, fetchTodoById };
