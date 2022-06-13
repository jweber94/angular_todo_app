# Building the angular project
FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

# Install and build
RUN npm install
RUN npm run build

# Create deployment server with nginx
FROM nginx:latest
COPY ./docs/ /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]