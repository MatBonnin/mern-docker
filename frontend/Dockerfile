# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
