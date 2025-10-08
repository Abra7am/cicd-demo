# Use a modern, lightweight Node version
FROM node:18-alpine

# Set working directory
WORKDIR /opt

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Accept build arg from Jenkins
ARG APP_PORT=3000

# Set environment variable for React/Node to use
ENV PORT=$APP_PORT

# Expose the same port
EXPOSE $PORT

# Start the app using the PORT variable
CMD ["sh", "-c", "PORT=$PORT npm start"]
