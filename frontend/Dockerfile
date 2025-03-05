# Frontend Dockerfile
FROM node:14

# Set working directory inside container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the entire frontend project into the container
COPY . /app/

# Expose the port React will run on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
