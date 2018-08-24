FROM node:alpine

WORKDIR /app
ADD . ./
RUN npm install --no-progress --ignore-optional

EXPOSE 8080

CMD npm run dev
