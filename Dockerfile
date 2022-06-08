FROM node:14 as deps
WORKDIR /app
ARG THEME
COPY . /app
RUN apt-get update
RUN apt-get install -y ca-certificates
RUN cd /app/packages/Web/ && yarn install --frozen-lockfile
RUN cd /app/packages/Web/ && THEME=$THEME npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
ARG CI_COMMIT_TAG
ARG THEME
ARG NODE_CONFIG_ENV
RUN echo "{\"tag\": \"$CI_COMMIT_TAG\", \"theme\": \"$THEME\"}" > version.json
COPY --from=deps /app/packages/Web/build .
ADD config/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
