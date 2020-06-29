FROM node:lts-slim
WORKDIR '/usr/app/backend'

COPY package.json .
RUN npm install
RUN apt-get update && apt-get install -y curl jq wget

COPY . .
EXPOSE 5002
CMD ["node","loadgen.js"]

