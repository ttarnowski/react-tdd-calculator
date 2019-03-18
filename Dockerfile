FROM node:latest

WORKDIR /usr/app

COPY package.json .

RUN yarn

COPY . /usr/app

#EXPOSE 3000

#ENTRYPOINT ["yarn", "start"]