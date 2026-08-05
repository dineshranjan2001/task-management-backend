# FROM node:24-alpine as builder

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci

# COPY tsconfig.json ./
# COPY src ./src

# RUN npm run build




# FROM node:24-alpine AS deps

# WORKDIR /usr/src/app

# COPY package*.json ./

# # Clean install only production dependencies (ignores devDependencies)
# RUN npm ci --only=production


# FROM node:24-alpine AS runner

# # Set production environment flags
# ENV NODE_ENV=production
# PORT=3000

# WORKDIR /usr/src/app

# # Copy production node_modules from deps stage
# COPY --from=deps /usr/src/app/node_modules ./node_modules

# # Copy compiled JavaScript code from builder stage
# COPY --from=builder /usr/src/app/dist ./dist
# COPY package*.json ./

# # Use native unprivileged non-root user for security
# USER node

# # Expose Express application port
# EXPOSE 3000

# # Run the compiled production application
# CMD ["node", "dist/server.js"]


FROM postgres:17-alpine

ENV POSTGRES_USER=tms
ENV POSTGRES_PASSWORD=tms@1234
ENV POSTGRES_DB=tms

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432