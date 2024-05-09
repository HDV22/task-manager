const readline = require('readline');

class Task {
  constructor(id, title, description) 
    {this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;} // Initially set completion status to false 
 
  markAsCompleted() 
    {this.completed = true;} // Update completion status to true  
  }

class TaskManager 
  {constructor() 
    {this.tasks = [];} // Initialize an empty array to store tasks
  
  addTask(title, description) 
    {const id = this.tasks.length + 1; // Generate ID based on the number of existing tasks
    const task = new Task(id, title, description); // Create a new task object
    this.tasks.push(task); // Add the task to the tasks array
    console.log(`Task '${task.title}' has been added with ID ${task.id}`); 
    }
 
  markTaskAsCompleted(id) 
    {const task = this.getTaskById(id); // Find the task with the provided ID
    if (task) 
      {task.markAsCompleted(); // Mark the task as completed
      console.log(`Task '${task.title}' has been marked as completed.`);}
    else 
      {console.log(`Task with ID ${id} not found.`);}
    }

  getTaskById(id) 
    {return this.tasks.find(task => task.id === id);} // Find the task with the provided ID
  
  listAllTasks() {
    if (this.tasks.length === 0) {
      console.log("No task found");}
    else {
      console.log('ID\tTitle\t\tDescription\t\tCompletion');
      this.tasks.forEach(task => {
      const completionStatus = task.completed ? 'X' : ''; // Use 'X' to represent completed tasks
      console.log(`${task.id}\t${task.title}\t\t${task.description}\t\t${completionStatus}`);}); 
       }
      }

  deleteTask(id) 
    {const taskIndex = this.tasks.findIndex(task => task.id === id); // Find the index of the task with the provided ID
    if (taskIndex !== -1) 
      {const deletedTask = this.tasks.splice(taskIndex, 1)[0]; // Remove the task from the tasks array
      console.log(`Task '${deletedTask.title}' has been deleted.`);}
    else 
      {console.log(`Task with ID ${id} not found.`);} 
    }
  }

function runTaskManager() 
  {const taskManager = new TaskManager(); // Create a new instance of TaskManager
  const rl = readline.createInterface(
    {input: process.stdin,
    output: process.stdout });
 
  function promptUser() 
   {console.log('\nTask Manager Application');
    console.log('1. Add a task');
    console.log('2. Mark a task as completed');
    console.log('3. List all tasks');
    console.log('4. Delete a task');
    console.log('5. Exit');

    rl.question('Enter your choice (1-5): ', choice => 
      {switch (choice) 
       {case '1':
          rl.question('Enter task title: ', title => 
           {rl.question('Enter task description: ', description => 
            {taskManager.addTask(title, description); // Add the task with the provided title and description
            promptUser();
            });
           });
          break;
        case '2':
          rl.question('Enter task ID to mark as completed: ', id => 
            {taskManager.markTaskAsCompleted(parseInt(id)); // Mark the task with the provided ID as completed
            promptUser();
            });
          break;
        case '3':
          taskManager.listAllTasks(); // List all tasks
            promptUser();
          break;
        case '4':
          rl.question('Enter task ID to delete: ', id => 
            {taskManager.deleteTask(parseInt(id)); // Delete the task with the provided ID
            promptUser();
            });
          break;
        case '5':
          rl.close(); // Close the readline interface
          break;
        default:
          console.log('Invalid choice. Please try again.');
            promptUser();
       }
      });
    
    }
            promptUser();
  }
runTaskManager();