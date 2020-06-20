FROM node:14.4.0-alpine3.10

ENV HOST=0.0.0.0

RUN apk add --update nginx yarn

# Create the directories we will need
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

# Copy the respective nginx configuration files
COPY .confs/nginx.conf /etc/nginx/nginx.conf
COPY .confs/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
COPY app/ .
RUN yarn global add @vue/cli
RUN yarn install
RUN yarn build

RUN cp -r dist/* /var/www/html

RUN chown nginx:nginx /var/www/html

CMD ["nginx", "-g", "daemon off;"]
