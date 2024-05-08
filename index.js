import express from 'express';
import auth from './middleware/authentication.middleware.js';
import dashboardRoutes from './routes/dashboard.js';
import loginRoutes from './routes/login.js';
import scriptRoutes from './routes/script.js';
import bodyParse from 'body-parser';
import cors from 'cors';

const app = express();
app.use (bodyParse.urlencoded({extended: true}));
app.use (bodyParse.json());
app.use(cors({credentials: true, origin: true}));

app.use('/login',loginRoutes);
app.use('/dashboard', auth, dashboardRoutes);
app.use('/script',auth, scriptRoutes);

app.listen (5000, () => {
    console.log('Server is running on port 5000');
});