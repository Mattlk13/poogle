FROM node:8

WORKDIR /app/

COPY package*.json yarn.lock /app/

RUN yarn --pure-lockfile --ignore-engines

COPY . /app/

RUN npm run build

EXPOSE 3000

CMD ["yarn", "run", "dev"]
