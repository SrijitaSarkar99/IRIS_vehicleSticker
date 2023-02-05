FROM node:latest

WORKDIR /app

ADD ./package-lock.json package-lock.json
ADD ./package.json package.json

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]