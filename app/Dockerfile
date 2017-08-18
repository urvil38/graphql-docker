FROM mhart/alpine-node
WORKDIR code
COPY package.json .
RUN npm i && npm i -g nodemon
COPY . .
EXPOSE 8080
CMD ["npm","start"]

