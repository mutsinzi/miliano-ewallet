# Miliano eWallet API 🚀

The Miliano eWallet API is designed with scalability in mind, ready to handle the demands of up to 1 million users. Built with Node.js, Express, MongoDB, and Redis, it leverages a stateless design, caching, and optimized data access patterns to ensure high performance and scalability.

## Table of Contents

- [Strategy](#strategy)
- [Setup](#setup)
- [API Docs](#documentation)

# Strategy

This strategy focuses on using best practices in software engineering, promoting departmental collaboration, and carefully planning and executing both backend and frontend needs.

| Phase | Activity | Description |
|-------|----------|-------------|
| **Phase 1: Requirement Gathering, Planning & Estimation** | Stakeholder Meetings | Conduct kickoff meetings with tech team, business units, UI/UX designers, and product owner to establish vision, objectives, and priorities for Miliano-eWallet system. |
|  | Requirement Gathering | Collaborate with business teams and experts to gather detailed requirements and understand the limitations of the legacy system to create a new design. |
|  | Technology Stack Selection | Choose a modern, scalable, and maintainable backend technology stack like Node.js, MongoDB, and Redis for their performance and scalability features. |
|  | Architecture Design | The backend was designed to accommodate 1 million users, using microservices for modularity and Redis for efficient caching strategies. |
| **Phase 2: Design and Development** | API Contract Definition | In collaboration with frontend teams, define API contracts using Swagger for clear, documented communication protocols. |
|  | Agile Development Process | Adopt an Agile methodology for iterative development, with sprints planned around the roadmap milestones. Engage the Scrum Master to facilitate sprint planning, daily stand-ups, and retrospectives. |
|  | Implementation | Start backend development, adhering to coding standards, and implementing best practices for security, data modeling, and business logic. |
|  | Continuous Integration/Continuous Deployment (CI/CD) | Set up CI/CD pipelines for automated testing and deployment, ensuring code quality and facilitating rapid iterations. |
| **Phase 3: Testing** | Quality Assurance | Conduct thorough testing, including unit tests, integration tests, and end-to-end tests, to ensure reliability and performance. Engage QA teams early in the development cycle. |
|  | Load Testing | Simulate traffic for 1 million users using tools like JMeter or Locust to validate scalability and identify bottlenecks. |
|  | User Acceptance Testing (UAT) | Coordinate with business teams for UAT to ensure the system meets business requirements and user expectations. |
| **Phase 4: Deployment** | Pilot Launch | Roll out the system to a limited user base to gather real-world usage data, monitor performance, and collect feedback. |
|  | Monitoring and Optimization | Implement monitoring tools (e.g., PM2, Prometheus, Grafana) to track system performance post-launch. Optimize based on insights gathered. |


# Setup

## Prerequisites 📋

Before you start, ensure you have installed:
- Node.js (v14 or newer)
- MongoDB (local or remote instance)
- Redis (for caching purposes)

## Getting Started 🏁

Follow these steps to get your local development environment running:

### Clone the Repository

```bash
git clone https://github.com/mutsinzi/miliano-ewallet.git
cd miliano-ewallet
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Features 💡

- Redis Caching
- Swagger API Documentation
- Stateless JWT Authentication

# Documentation

## Table of Contents

- [👤 Customers](#customers)
- [💰 Wallets](#wallets)
- [💸 Transactions](#transactions)

## Endpoints

### Customers

#### Register a Customer

- **POST** `/api/v1/customers`

Creates a new customer.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "yourPassword"
}
```

**Response Body:**

```json
{
	"status": "success",
	"data": {
		"_id": "6606b90bd7573f5f3661a037",
		"name": "John Doe",
		"email": "john.doe@example.com",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDZiOTBiZDc1NzNmNWYzNjYxYTAzNyIsImlhdCI6MTcxMTcxNjYxOSwiZXhwIjoxNzExODAzMDE5fQ.VoFDpD0fsP5TKZmvkbpUXlQt9Q4xitg8Rrxa0NNEvR8"
	},
	"message": "Customer registered successfully"
}
```


#### Get All Customers

- **GET** `/api/v1/customers`

**Response Body:**

```json
{
	"status": "success",
	"data": [
		{
			"_id": "6606b45e27365b01d3264e44",
			"name": "jake",
			"email": "jake@example.com",
			"createdAt": "2024-03-29T12:30:22.990Z",
			"updatedAt": "2024-03-29T12:30:22.990Z"
		}
	],
	"message": "Customers fetched successfully"
}
```

### Wallets

#### Create Wallet

- **POST** `/api/v1/wallets`

Creates a new wallet for a customer.

**Request Body:**

```json
{
  "customerId": "customer_id",
  "currency": "USD",
  "balance": 100
}
```

**Response:**

```json
{
	"status": "success",
	"data": {
		"customerId": "6606b90bd7573f5f3661a037",
		"currency": "USD",
		"balance": 1000,
		"_id": "6606b929d7573f5f3661a03a",
		"createdAt": "2024-03-29T12:50:49.568Z",
		"updatedAt": "2024-03-29T12:50:49.568Z",
	},
	"message": "Wallet created successfully"
}
```

#### Get all Wallets

Retrieves all wallets

**Request Body:**

```json
{
	"status": "success",
	"data": [
		{
			"_id": "6606b511eea036227010ddfb",
			"customerId": "6606b45e27365b01d3264e44",
			"currency": "USD",
			"balance": 320,
			"createdAt": "2024-03-29T12:33:21.494Z",
			"updatedAt": "2024-03-29T12:44:26.515Z",
		}
	],
	"message": "Wallets fetched successfully"
}
```

### Transactions

#### Create Transaction

- **POST** `/api/v1/transactions`

Records a new transaction to a wallet.

- **Request Body: **
  
```json
{
  "walletId": "wallet_id",
  "type": "credit",
  "amount": 50,
  "description": "Deposit"
}
```

- **Response:**

```json
{
	"status": "success",
	"data": [
		{
			"_id": "6606b6792a981eb608347970",
			"type": "debit",
			"amount": 100,
			"createdAt": "2024-03-29T12:39:21.566Z",
			"updatedAt": "2024-03-29T12:39:21.566Z",
			"currency": "USD"
		}
	],
	"message": "Fetched transactions successfully"
}

