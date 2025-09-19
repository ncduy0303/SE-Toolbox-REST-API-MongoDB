# SE-Toolbox Docker Deployment Guide

This guide explains how to run the SE-Toolbox REST API application using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.0 or higher)
- Docker Compose (version 2.0 or higher)

## Architecture

The application consists of three main services:

1. **Frontend** (Next.js) - Port 3000
2. **Backend** (Express.js/Node.js) - Port 8080
3. **Database** (MongoDB) - Port 27017

## Quick Start

1. **Clone and navigate to the repository:**

   ```bash
   cd /path/to/SE-Toolbox-REST-API-MongoDB
   ```

2. **Build and start all services:**

   ```bash
   docker compose up --build
   ```

3. **Access the application:**
   - Frontend: <http://localhost:3000>
   - Backend API: <http://localhost:8080>
   - MongoDB: mongodb://localhost:27017

## Available Commands

### Development Commands

```bash
# Build and start all services in detached mode
docker compose up -d --build

# View logs from all services
docker compose logs -f

# View logs from a specific service
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f mongodb

# Stop all services
docker compose down

# Stop services and remove volumes (WARNING: This will delete database data)
docker compose down -v

# Rebuild a specific service
docker compose build frontend
docker compose build backend

# Start only specific services
docker compose up mongodb backend
```

### Production Commands

```bash
# Start services in production mode (detached)
docker compose up -d

# Check service health
docker compose ps

# Update and restart services
docker compose pull
docker compose up -d --build
```

## Service Details

### Frontend (Next.js)

- **Port:** 3000
- **Environment Variables:**
  - `NEXT_PUBLIC_API_URL`: Backend API URL
- **Health Check:** HTTP GET to /

### Backend (Express.js)

- **Port:** 8080
- **Environment Variables:**
  - `NODE_ENV`: production
  - `PORT`: 8080
  - `MONGODB_URI`: MongoDB connection string
- **Health Check:** HTTP GET to /

### MongoDB

- **Port:** 27017
- **Database:** cs3219-rest-api-example
- **Volumes:**
  - `mongodb_data`: Database files
  - `mongodb_config`: Configuration files
- **Health Check:** MongoDB ping command

## Environment Configuration

The application uses the following environment variables:

### Backend (.env)

```bash
PORT=8080
MONGODB_URI="mongodb://mongodb:27017/cs3219-rest-api-example"
```

### Frontend

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Data Persistence

MongoDB data is persisted using Docker volumes:

- `mongodb_data`: Stores database files
- `mongodb_config`: Stores MongoDB configuration

These volumes ensure your data survives container restarts.

## Networking

All services communicate through a custom Docker network (`app-network`):

- Services can communicate using container names as hostnames
- External access is available through mapped ports

## Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :8080
   lsof -i :27017

   # Stop conflicting services or change ports in docker compose.yml
   ```

2. **Services not starting:**

   ```bash
   # Check logs for errors
   docker compose logs -f

   # Check service health
   docker compose ps
   ```

3. **Database connection issues:**

   ```bash
   # Ensure MongoDB is healthy
   docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"

   # Check backend logs
   docker compose logs backend
   ```

4. **Frontend can't connect to backend:**

   ```bash
   # Verify backend is running
   curl http://localhost:8080/

   # Check CORS configuration in backend/index.js
   ```

### Debugging Commands

```bash
# Execute commands inside containers
docker compose exec backend bash
docker compose exec mongodb mongosh
docker compose exec frontend sh

# Inspect container details
docker inspect se-toolbox-frontend
docker inspect se-toolbox-backend
docker inspect se-toolbox-mongodb

# Monitor resource usage
docker stats se-toolbox-frontend se-toolbox-backend se-toolbox-mongodb
```

## Development vs Production

### Development Mode

- Use `docker compose up --build` for development
- Logs are displayed in the terminal
- Easy to restart and debug

### Production Mode

- Use `docker compose up -d --build` for production
- Services run in the background
- Automatic restart on failure
- Health checks ensure service reliability

## Security Considerations

- All services run with non-root users for security
- MongoDB data is isolated in Docker volumes
- CORS is properly configured for cross-origin requests
- Environment variables are used for sensitive configuration

## Scaling

To scale specific services:

```bash
# Scale backend instances
docker compose up --scale backend=3

# Scale frontend instances
docker compose up --scale frontend=2
```

Note: You'll need to configure a load balancer for multiple instances.
