# Use an official Node.js image as the base image for building the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (only production dependencies)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Serve the app using a lightweight web server (nginx)
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 to serve the app
EXPOSE 3000

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]