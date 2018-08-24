FROM node:alpine

WORKDIR /app
ADD . ./
RUN apk add --no-cache --update python alpine-sdk
RUN npm install --no-progress --ignore-optional

EXPOSE 2018
VOLUME /data

CMD npm run start
