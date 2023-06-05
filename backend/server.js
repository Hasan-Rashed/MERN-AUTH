import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000  ;
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('server is ready'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    }
);