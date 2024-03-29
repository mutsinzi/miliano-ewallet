import customerDocs from './customer.docs.js'; 

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Miliano eWallet API',
    version: '1.0.0',
    description: 'This is the API documentation for the Miliano eWallet application.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server',
    },
  ],
  paths: { ...customerDocs }, 
};

export const options = {
  swaggerDefinition,
  apis: ['../routes/*.js'],
};
