改文件夹内存放的全部是所有的 docker 构建命令的执行脚本。在开始使用前，请在`deploy`目录中，修改好各个环境的构建配置。

命令使用方式如下：在项目根目录下执行(可能在执行之前需要添加可执行权限)

```bash
# image_name为镜像名称，image_tag镜像标签
./bash/xxx.sh image_name image_tag
```
