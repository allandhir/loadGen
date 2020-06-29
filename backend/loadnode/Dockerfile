FROM node:lts-slim
WORKDIR '/usr/app/backend'

COPY package.json .
RUN npm install

COPY . .
EXPOSE 5001
CMD ["node","loadnode.js"]

