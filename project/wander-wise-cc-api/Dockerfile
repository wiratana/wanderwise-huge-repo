FROM node:18.17.0
WORKDIR /app
ENV PORT 5000
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "start"]