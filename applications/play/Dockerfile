FROM node:8@sha256:d79686b7ff9c9c5342639f374fd1aa887c01b5dd15f34e76697fd23dc71dd58b
ADD . /playground
WORKDIR /playground
RUN npm install && npm run build

EXPOSE 3000

CMD ["/playground/node_modules/.bin/next", "start", "--host", "0.0.0.0"]
