FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY init.sh /init.sh

RUN chmod +x /init.sh

EXPOSE 3333

CMD ["/bin/bash", "./init.sh"]
