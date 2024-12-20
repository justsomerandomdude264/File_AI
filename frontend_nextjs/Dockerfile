# Install dependencies
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Start the server
CMD ["npm", "start"]
