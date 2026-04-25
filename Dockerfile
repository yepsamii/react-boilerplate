# Stage 1: Builder
FROM node:22 AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Clean install to avoid esbuild version conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production - Serve with nginx
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Development (uncomment below and use this for dev)
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host"]