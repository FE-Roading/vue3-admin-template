FROM node:16.18.1-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 修改构建目录，防止在根目录构建时，偶尔出现的/proc报错
WORKDIR /app
ADD . ./

RUN npm config set registry https://registry.npmmirror.com
RUN pnpm install

# 开启构建工作
RUN pnpm run build:test

# nginx服务构建
FROM nginx:1.18 as server

# 复制构建文件和配置
RUN mkdir -p /usr/share/nginx/html/dist
COPY --from=base /app/dist /usr/share/nginx/html/dist
COPY ./deploy/nginx.conf /etc/nginx/

# 运行服务
EXPOSE 80
