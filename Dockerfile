# Stage 1: Build ที่มีเครื่องมือพัฒนาทั้งหมด
FROM node:20.14.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps


COPY . .
RUN npm run build

FROM node:20.14.0-alpine AS production

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json


CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]