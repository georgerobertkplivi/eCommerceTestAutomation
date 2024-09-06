# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Install Allure
RUN npm install -g allure-commandline --save-dev

# Run the tests
CMD ["npx", "playwright", "test", "--reporter=line,allure-playwright"]
