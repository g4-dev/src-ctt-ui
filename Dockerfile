FROM alpine:3.7

RUN apk add --update nginx

RUN mkdir /app
WORKDIR /app
COPY app/ .
RUN yarn global add @vue/cli
RUN yarn install
ENV HOST=0.0.0.0
CMD ["yarn", "run", "serve"]
