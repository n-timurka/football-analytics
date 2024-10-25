# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:dev"]
