FROM node:12

WORKDIR /app

ADD package.json /app
ADD package-lock.json /app
RUN apt update && \
  apt install --no-install-recommends systemd -y && \
  rm -rf /var/lib/apt/lists/* && \
  npm install

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV


ADD . /app
RUN npm run build \
  && chmod +x ./scripts/entry.sh

ENTRYPOINT ["./scripts/entry.sh" ]

EXPOSE 3000