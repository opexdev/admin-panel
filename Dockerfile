FROM node:lts-fermium AS build
COPY . /admin-panel
WORKDIR /admin-panel
ENV NODE_ENV production
RUN npm install
ARG GENERATE_SOURCEMAP='false'
ENV GENERATE_SOURCEMAP $GENERATE_SOURCEMAP
ARG REACT_APP_DEFAULT_DIRECTION='LTR'
ENV REACT_APP_DEFAULT_DIRECTION $REACT_APP_DEFAULT_DIRECTION
ARG REACT_APP_BRAND_NAME='OPEX'
ENV REACT_APP_BRAND_NAME $REACT_APP_BRAND_NAME
RUN npm run build

FROM nginx:1.20.2
COPY default.conf /etc/nginx/conf.d
COPY --from=build /admin-panel/build /var/www/opex/html
WORKDIR /var/www/opex/html
COPY env-map.js .
CMD cat env-map.js | envsubst > env.js && nginx -g "daemon off;"
EXPOSE 80
