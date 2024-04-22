import express from 'express';
const app = express();

app.get ("/helloWorld", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get ("/search", (req, res) => {
    res.send(`<h1>${req.query.name}</h1>`);
});

import dashboardRoutes from './routes/dashboard.js';
import loginRoutes from './routes/login.js';
app.use('/dashboard', dashboardRoutes);


app.listen (5000, () => {
    console.log('Server is running on port 5000');
});