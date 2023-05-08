FROM node:18-alpine
WORKDIR /website
COPY . .
RUN npm ci && npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000
