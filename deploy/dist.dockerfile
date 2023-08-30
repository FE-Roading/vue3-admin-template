# 直接将本地构建的dist目录打包到镜像中。使用前请取消根目录下.dockerignore的dist文件项
FROM nginx:1.18

# 复制构建文件和配置
RUN mkdir -p /usr/share/nginx/html/dist
COPY ./dist /usr/share/nginx/html/dist
COPY ./deploy/nginx.conf /etc/nginx/

# 运行服务
EXPOSE 80
