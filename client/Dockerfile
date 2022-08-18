
# Build react client
FROM node:alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

RUN mkdir -p node_modules/.cache
RUN chown node:node node_modules/.cache
USER node

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]