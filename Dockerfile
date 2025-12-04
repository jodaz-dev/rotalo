FROM node:lts-alpine AS build

WORKDIR /app

# Enable corepack and pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lockfile and package manifests first for better caching
COPY package.json pnpm-lock.yaml ./

# Install deps
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . ./

RUN pnpm run build

# Use a minimal Node image to serve static files with 'serve'
FROM node:lts-alpine

# Use a minimal Node image to serve static files with 'serve'
WORKDIR /app

RUN npm install -g serve

# Copy built assets from builder
COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]