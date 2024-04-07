const express = require('express');
const router = express.Router();


// Store array of task objects
let tasks = [{id: 0, title: "Wash the dishes", isChecked: false}]

// Keep track of the next unique id to assign following task added
let nextTaskId = 1
  

// Get all tasks
router.get('/', (req, res) => {
  // console.log("GET All Tasks")
  // console.log(tasks)
  res.json(tasks); 
});
 
// Add a new task
router.post('/tasks', (req, res) =>{ 
  // destructure taskName from request body
  const { taskName } = req.body;

  //console.log("ADD Task Name: " + taskName)  

  // Create new task with next ID, taskName, and checked as false
  const newTask = { id: nextTaskId, title: taskName, isChecked: false};
  
  // Update next task ID
  nextTaskId += 1;

  // Add new task to top of the task list
  tasks.unshift(newTask);

  // Send back the updated task list
  res.status(201).json(tasks);
});

// Update a task or Check off a task
router.put('/tasks/:taskIndex', (req, res) => {
  // Get the index of the task in our array
  const taskIndex = parseInt(req.params.taskIndex);

  // Destructure the request to get the newTitle and updateCheck
  const { newTitle, updateCheck } = req.body;

  console.log("CHECK Task Index: " + taskIndex + " " + newTitle)

  if (taskIndex != -1) {
    tasks[taskIndex].title = newTitle;

    if (tasks[taskIndex].isChecked == false && updateCheck == true) {
      // Check off the selected task
      tasks[taskIndex].isChecked = true
 
      // Move task to bottom
      const task = tasks.splice(taskIndex, 1)[0];
      tasks.push(task);
    }
 
    // Send updated tasks
    res.json(tasks);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
router.delete('/tasks/:taskIndex', (req, res) => {
  // Extract index of task in array
  const taskIndex = parseInt(req.params.taskIndex);

  // Delete the element of taskIndex
  const newTasks = [...tasks]
  newTasks.splice(taskIndex, 1)

  // Update current tasks to deleted version
  tasks = newTasks

  // Send back updated tasks
  res.status(201).json(tasks);
}) ;


module.exports = router;