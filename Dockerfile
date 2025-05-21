# Use an official Node.js runtime as a parent image
# Using a specific LTS version is recommended, e.g., node:20-alpine
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies (including devDependencies for TypeScript compilation)
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Compile TypeScript to JavaScript
# This assumes you have a "build" script in your package.json, e.g., "build": "tsc"
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev --ignore-scripts

# Copy built assets from the builder stage
# This assumes your tsconfig.json outputs files to a 'dist' folder
# If your compiled files are in 'src' (e.g. main.js alongside main.ts), adjust the COPY paths
COPY --from=builder /usr/src/app/src ./src
# If you have other compiled assets (e.g. formatQuote.js if it was TS), copy them too.
# Since connect.js and formatQuote.js are already JS in your src, they are covered by `COPY . .` in builder
# and then specifically copied here if they are the final runtime files.
# If your build script outputs to a 'dist' folder, it would be:
# COPY --from=builder /usr/src/app/dist ./dist

# Application specific environment variables
# The MONGODB_PASSWORD will be passed in at runtime
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE ${PORT}

# Define the command to run your application
# Adjust the path if your compiled main.js is in a 'dist' folder (e.g., "dist/main.js")
CMD [ "node", "src/main.js" ]