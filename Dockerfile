FROM node:18.12.1

WORKDIR /app

ADD package.json package-lock.json /app/
RUN npm install

EXPOSE 3000

ADD . /app

CMD ["node", "index"]
