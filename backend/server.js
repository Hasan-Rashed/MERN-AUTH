import path from 'path';
import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000  ;
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json()); // to accept json data in the body
app.use(express.urlencoded({ extended: true })); // allow us to send form data

app.use(cookieParser()); // to accept cookies in the browser

app.use('/api/users', userRoutes);

// setting for production
// check if node environment is in production mode
if(process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve(); // get current directory name

    // making dist folder as static 
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); // set static folder

    // any route that we hit which is not api/users is going to load this index.html file
    app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}
// if in development mode
else{
    app.get('/', (req, res) => res.send('server is ready'));
}

app.use(notFound); // not found middleware
app.use(errorHandler); // error handler middleware / custom error handler

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    }
);