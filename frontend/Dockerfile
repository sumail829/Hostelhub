FROM node:20-alpine AS builder
WORKDIR /hostelhub
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]


FROM nginx:1-perl
COPY --from=builder /hostelhub/* /etc/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

