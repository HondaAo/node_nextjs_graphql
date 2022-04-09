FROM node:latest

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server
RUN yarn install

COPY . /app/server

EXPOSE 4000

CMD [ "yarn", "start2" ]