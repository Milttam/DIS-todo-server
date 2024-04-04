const express = require('express');
const router = express.Router();

let tasks = []

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks); 
});

// Add a new task
router.post('/tasks', (req, res) =>{ 
  // modify to push to top of list
  const { title, isChecked } = req.body;
  const newTask = { id: tasks.length + 1, title, isChecked: isChecked};
  tasks.unshift(newTask);
  res.status(201).json(tasks); // send the new tasks back
});

// Update a task
router.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, isChecked } = req.body; // change this to accept is checked as well
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex != -1) {
    tasks[taskIndex].title = title;
    tasks[taskIndex].isChecked = isChecked; // add this line to update isChecked
    // handle putting the checked off task to the bottom
    if (isChecked) {
      const task = tasks.splice(taskIndex, 1)[0];
      tasks.push(task);
    }
    res.json(tasks); // send the updated tasks back
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  const taskid = parseInt (req.params. id) ;
  tasks = tasks. filter (task = task.id !== taskid);
  res. status (204) .send();
}) ;


module.exports = router;