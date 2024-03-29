import bodyParser from 'body-parser';
import express from 'express';
import connectDB from './config/db.js';
import routes from './routes';
import { config } from 'dotenv';
import respondMiddleware from './middleware/respond.middleware.js'; 

config()

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use(respondMiddleware)

app.use('/api/v1', routes);

app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
