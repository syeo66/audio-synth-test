FROM node:20 as node

WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN make build

FROM nginx as server

EXPOSE 80

COPY --from=node /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

