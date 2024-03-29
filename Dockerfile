FROM node:lts-fermium AS build
COPY . /admin-panel
WORKDIR /admin-panel
ENV NODE_ENV production
RUN npm install
ARG GENERATE_SOURCEMAP=false
ENV GENERATE_SOURCEMAP $GENERATE_SOURCEMAP
RUN npm run build

FROM nginx:1.20.2
COPY default.conf /etc/nginx/conf.d
COPY --from=build /admin-panel/build /var/www/opex/html
WORKDIR /var/www/opex/html
COPY env-map.js .
CMD cat env-map.js | envsubst > env.js && nginx -g "daemon off;"
EXPOSE 80
