FROM node:latest

RUN mkdir -p /app/client
WORKDIR /app/client

COPY package*.json /app/web
RUN npm install

COPY . /app/client

EXPOSE 3000

CMD "npm" "run" "dev"