FROM node:15.8.0-alpine3.10
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
