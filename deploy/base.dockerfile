FROM node:16.18.1-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 修改构建目录，防止在根目录构建时，偶尔出现的/proc报错
WORKDIR /app
ADD ./package.json ./

RUN npm config set registry https://registry.npmmirror.com
RUN pnpm install
