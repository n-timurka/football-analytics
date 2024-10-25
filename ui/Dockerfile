# Use the official Node.js LTS base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package*.json /app/

# Install dependencies
RUN npm install && npm cache clean --force

# Start the Nuxt.js development server with hot-reloading
CMD ["npm", "run", "dev"]
