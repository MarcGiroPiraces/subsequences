FROM node:18-alpine

RUN mkdir /app

COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
COPY ./tsconfig.json /app

WORKDIR /app

RUN npm install

RUN npm run build

CMD ["npm", "start"]
