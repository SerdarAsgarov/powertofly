FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ui/package.json ./
COPY ui/package-lock.json ./
RUN npm ci
RUN npm install react-scripts@3.4.3 -g --silent
COPY ./ui/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY .docker/ui.docker.nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]