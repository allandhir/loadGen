FROM node:alpine as build
WORKDIR /usr/app/frontend

COPY package.json .
ADD package.json /usr/src/app/frontend/package.json
ENV CI=true
RUN npm install

COPY . ./
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /usr/app/frontend/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
