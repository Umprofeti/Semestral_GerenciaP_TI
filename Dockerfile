# Usar una imagen base con Node.js (alpine para ser más liviano)
FROM node:18-alpine AS base

# Instalar dependencias básicas necesarias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Definir ARGs para recibir variables de entorno durante la construcción
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG MINIO_ENDPOINT
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG MINIO_REGION
ARG MINIO_BUCKET
ARG RESEND_API_KEY
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG AZURE_STORAGE_ALLOW_CONTAINER_CREATE
ARG AZURE_STORAGE_CONTAINER_NAME
ARG AZURE_STORAGE_ACCOUNT_BASEURL
ARG AZURE_STORAGE_CONNECTION_STRING

# Establecer estas variables como ENV dentro del contenedor
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV MINIO_ENDPOINT=${MINIO_ENDPOINT}
ENV MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
ENV MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
ENV MINIO_REGION=${MINIO_REGION}
ENV MINIO_BUCKET=${MINIO_BUCKET}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}
ENV AZURE_STORAGE_ALLOW_CONTAINER_CREATE=${AZURE_STORAGE_ALLOW_CONTAINER_CREATE}
ENV AZURE_STORAGE_CONTAINER_NAME=${AZURE_STORAGE_CONTAINER_NAME}
ENV AZURE_STORAGE_ACCOUNT_BASEURL=${AZURE_STORAGE_ACCOUNT_BASEURL}
ENV AZURE_STORAGE_CONNECTION_STRING=${AZURE_STORAGE_CONNECTION_STRING}

# Instalar dependencias de acuerdo al lockfile
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --force; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Etapa de construcción: crear la aplicación Next.js
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Desactivar telemetría de Next.js durante el build si es necesario
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Etapa final: imagen de producción
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Desactivar telemetría en tiempo de ejecución si es necesario
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar los archivos necesarios para ejecutar la aplicación
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Asegurar permisos correctos
RUN chown -R nextjs:nodejs /app

# Cambiar al usuario creado
USER nextjs

#Utilizar variables de entorno
# Definir ARGs para recibir variables de entorno durante la construcción
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG MINIO_ENDPOINT
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG MINIO_REGION
ARG MINIO_BUCKET
ARG RESEND_API_KEY
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG AZURE_STORAGE_ALLOW_CONTAINER_CREATE
ARG AZURE_STORAGE_CONTAINER_NAME
ARG AZURE_STORAGE_ACCOUNT_BASEURL
ARG AZURE_STORAGE_CONNECTION_STRING

# Establecer estas variables como ENV dentro del contenedor
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV MINIO_ENDPOINT=${MINIO_ENDPOINT}
ENV MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
ENV MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
ENV MINIO_REGION=${MINIO_REGION}
ENV MINIO_BUCKET=${MINIO_BUCKET}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}
ENV AZURE_STORAGE_ALLOW_CONTAINER_CREATE=${AZURE_STORAGE_ALLOW_CONTAINER_CREATE}
ENV AZURE_STORAGE_CONTAINER_NAME=${AZURE_STORAGE_CONTAINER_NAME}
ENV AZURE_STORAGE_ACCOUNT_BASEURL=${AZURE_STORAGE_ACCOUNT_BASEURL}
ENV AZURE_STORAGE_CONNECTION_STRING=${AZURE_STORAGE_CONNECTION_STRING}

# Exponer el puerto de la aplicación
EXPOSE 3000
ENV PORT=3000

# Iniciar la aplicación
CMD ["npm", "run", "start"]
