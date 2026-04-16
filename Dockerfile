# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build the production bundle
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy the built app from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run uses PORT env variable (default 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
