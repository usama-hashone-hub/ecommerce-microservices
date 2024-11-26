# E-commerce Microservices

A modern e-commerce platform built with NestJS microservices architecture, designed for scalability and maintainability.

## Architecture Overview

The application is built using a microservices architecture with the following components:

- **API Gateway**: Entry point for all client requests, handles routing and request/response transformation
- **Customer Service**: Manages customer data, authentication, and profiles
- **Product Service**: Handles product catalog, inventory, and product information
- **Purchase Service**: Manages orders, transactions, and payment processing

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL
- **Container**: Docker
- **API Documentation**: Swagger/OpenAPI
- **Message Broker**: Built-in NestJS Transport

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MySQL

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-microservices
```

2. Install dependencies:
```bash
npm install
```

3. Start the services using Docker:
```bash
docker-compose up -d
```

## Services Description

### API Gateway (Port: 3000)
- Main entry point for all client requests
- Routes requests to appropriate microservices
- Handles request/response transformation
- API documentation available at `/api/docs`

### Customer Service
- Customer registration and authentication
- Profile management
- Address management
- Customer preferences

### Product Service
- Product catalog management
- Inventory tracking
- Product categories
- Product search and filtering

### Purchase Service
- Order processing
- Transaction management
- Payment integration
- Order history

## Development

To run individual services in development mode:

```bash
# API Gateway
npm run start:dev api-gateway

# Customer Service
npm run start:dev customer-service

# Product Service
npm run start:dev product-service

# Purchase Service
npm run start:dev purchase-service
```

## API Documentation

The API documentation is available through Swagger UI when running the API Gateway:
- Development: http://localhost:3000/api/docs

## Docker Support

The project includes Docker support for easy deployment:

```bash
# Build and start all services
docker-compose up -d

# Stop all services
docker-compose down
```

## Project Structure

```
ecommerce-microservices/
├── apps/
│   ├── api-gateway/
│   ├── customer-service/
│   ├── product-service/
│   └── purchase-service/
├── libs/
├── docker-compose.yml
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.