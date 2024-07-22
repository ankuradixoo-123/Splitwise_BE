const express = require('express');
const usersRoutes = require('./User/Routes');
const expensesRoutes = require('./Expenses/ExpRoutes');
// const authenticateToken = require('../src/User/Controller'); // If you have authentication

const app = express();
const port = 3000; // Use a single port for both routes

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Users routes
app.use('/api/v1/users', usersRoutes);

// Expenses routes
app.use('/api/v1/expensess', expensesRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
