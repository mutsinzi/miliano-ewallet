import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import { options } from './docs';
import respondMiddleware from './middleware/respond.middleware.js';
import routes from './routes';

config()

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use(respondMiddleware)

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
