#!/bin/bash  

ignore_config_path=".dockerignore"
ignore_config_bak_path="./bash/.dockerignore.bak"

# 备份.dockerignore配置
mv $ignore_config_path $ignore_config_bak_path

# 删除dist
sed '/^dist$/d' $ignore_config_bak_path > $ignore_config_path

# 读取.dockerignore配置
ignore_config=`cat $ignore_config_bak_path`  

# 镜像的tag和version
image_name="vue3-project-dist"
if [ $1 ];then
  image_name=$1
fi
image_tag=`date +%Y%m%d%H%M`
if [ $2 ];then
  image_tag=$2
fi

# 开始构建
docker build . -f ./deploy/dist.dockerfile -t $image_name:$image_tag

# 还原.dockerignore配置
mv $ignore_config_bak_path $ignore_config_path

echo "构建完成😃，镜像版本为$image_name:$image_tag"