const express = require( 'express');
const app = express();
const PORT = process. env.PORT || 6969;

const taskRoutes = require('./taskroutes');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send ('Hello World!');
});

app.use('/api', taskRoutes);

// Start server
app.listen (PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})