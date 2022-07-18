FROM node:18-alpine
RUN apk update
WORKDIR /app
COPY .env ./
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY src /app/src
COPY prisma /app/prisma
RUN ls -a
RUN npm install
RUN npm run build
RUN npm run generate
EXPOSE 8080
CMD npm start