# Use a specific Node.js LTS version (Alpine for smaller size)
FROM node:20-alpine

LABEL maintainer="Ethan Lee ethantlee21@gmail.com"

# Set the working directory
WORKDIR /usr/src/

# Copy package.json and package-lock.json (if available)
# This leverages Docker's cache. Only re-runs if these files change.
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev --ignore-scripts

# Copy the rest of your application's source code
# This includes your src/main.js
COPY . .

# Expose the port your app runs on (from your main.js)
EXPOSE 3000

# Define the command to run your application
# Assumes main.js is in the src directory relative to WORKDIR
CMD [ "node", "src/main.js" ]