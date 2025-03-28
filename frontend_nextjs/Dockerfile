# Install dependencies
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the project files
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build the project at runtime and start the server
CMD ["sh", "-c", "npm run build && npm start"]
