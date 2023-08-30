#!/bin/bash  

# 镜像的tag和version
image_name="vue3-project-build"
if [ $1 ];then
  image_name=$1
fi
image_tag=`date +%Y%m%d%H%M`
if [ $2 ];then
  image_tag=$2
fi

# 开始构建
docker build . -f ./deploy/dev.dockerfile -t $image_name:$image_tag

echo "构建完成😃，镜像版本为$image_name:$image_tag"