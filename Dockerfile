FROM node:12 AS builder
# Or whatever Node version/image you want
WORKDIR /client
COPY package.json yarn.lock .yarnrc /client/
RUN yarn
COPY . /client/
RUN yarn install && yarn build


# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /client/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]


