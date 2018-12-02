FROM node:10-alpine

WORKDIR /usr/src/app

RUN yarn global add pm2

# Back-end (NODE) is less likely to change, so copy and build it first
# Copy package, lockfile to preserve versions
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Now same for the client side (REACT)

WORKDIR /usr/src/app/client
COPY client/package.json ./
# Also include the lockfile to preserve versions
COPY client/yarn.lock ./

RUN yarn install

# Now copy the main files
WORKDIR /usr/src/app
COPY . .

# Build the production files, both server (typescript) and client (jsx)
RUN yarn run build

EXPOSE 3050

CMD ["pm2-runtime", "dist/index.js"]
