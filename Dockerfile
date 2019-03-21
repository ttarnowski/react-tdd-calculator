FROM node:11.10.1 as builder
WORKDIR /usr/app
COPY ./package.json .
RUN yarn
COPY . /usr/app
RUN yarn build

FROM nginx:1.15.9
EXPOSE 80
COPY --from=builder /usr/app/build /usr/new/nginx/build