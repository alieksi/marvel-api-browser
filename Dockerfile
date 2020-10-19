FROM node:12.19.0

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "start"]