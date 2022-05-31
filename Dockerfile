FROM node:16.14.0 as build 
WORKDIR /src
ADD ./package* /src/
RUN npm install
ADD . /src/
RUN npm run build

FROM openresty/openresty:buster-fat
COPY --from=build /src/dist /usr/local/openresty/nginx/html
