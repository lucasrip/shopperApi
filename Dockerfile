FROM node

RUN mkdir api

WORKDIR /api

RUN rm -rf ./node_modules

COPY yarn.lock package.json  ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn","dev"]
