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
ARG CI_COMMIT_SHA
ARG NODE_CONFIG_ENV
RUN echo "{\"tag\": \"$CI_COMMIT_TAG\", \"sha\": \"$CI_COMMIT_SHA\"}" > version.json
RUN echo "{\"status\": \"ok\"}" > healthz
COPY --from=deps /app/packages/Web/build .
CMD ["nginx", "-g", "daemon off;"]
