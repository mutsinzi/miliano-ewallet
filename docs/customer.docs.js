const customerDocs = {
  "/api/v1/customers": {
    post: {
      tags: ["Customers"],
      summary: "Register a new customer",
      description: "Create a new customer with name, email, and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john.doe@example.com" },
                password: { type: "string", example: "Password123" }
              },
              required: ["name", "email", "password"]
            }
          }
        }
      },
      responses: {
        201: {
          description: "Customer registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  token: { type: "string" }
                }
              },
              example: {
                _id: "601c2a539e334a42188aef5d",
                name: "John Doe",
                email: "john.doe@example.com",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              }
            }
          }
        },
        400: {
          description: "Invalid input data or email already exists."
        }
      }
    },
    get: {
      tags: ["Customers"],
      summary: "Get all customers",
      description: "Retrieve a list of all registered customers.",
      responses: {
        200: {
          description: "A list of customers.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: { type: "number" },
                  message: { type: "string" },
                  payload: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" },
                        __v: { type: "number" }
                      }
                    }
                  }
                }
              },
              example: {
                statusCode: 200,
                message: "All customers retrieved successfully",
                payload: [
                  {
                    _id: "601c2a539e334a42188aef5d",
                    name: "John Doe",
                    email: "john.doe@example.com",
                    createdAt: "2024-03-29T10:41:03.519Z",
                    updatedAt: "2024-03-29T10:42:03.519Z",
                    __v: 0
                  },

                ]
              }
            }
          }
        },
        401: {
          description: "Unauthorized access."
        }
      }
    }
  }
};

export default customerDocs;
