FROM node:18
WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3052

CMD [ "npm", "start"]
