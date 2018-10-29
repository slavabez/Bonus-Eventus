FROM node:10-alpine
# Install PM2, we'll use it to run the app
RUN npm install pm2 -g

WORKDIR /user/src/app

COPY package.json ./
COPY yarn.lock ./

ENV NODE_ENV production

RUN yarn install

COPY . .



RUN yarn run build

CMD ["pm2-runtime", "index.js"]
