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
app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://yolohome2024.web.app/']}));
/* app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
}); */
app.use('/login',loginRoutes);
app.use('/dashboard', auth, dashboardRoutes);
app.use('/script',auth, scriptRoutes);

app.listen (5000, () => {
    console.log('Server is running on port 5000');
});