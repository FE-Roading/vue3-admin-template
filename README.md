<h1>Vue Admin Template</h1>

## 介绍

精简版是基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 提炼出的架子，包含主体功能，更适合实际项目开发，打包后的大小在全局引入 [element-plus](https://element-plus.org) 的情况下仍然低于 `2.3MB`，并且会永久同步完整版的代码。开启 `brotli` 压缩和 `cdn` 替换本地库模式后，打包大小低于 `350kb`。

已配套的官方快速开发文档，[查看文档](https://yiming_chang.gitee.io/pure-admin-doc)。(

## 预览

- [查看预览](https://pure-admin-thin.netlify.app/#/login)

## 快速开始

- 环境要求：node 版本应不小于 `16` ，`pnpm` 版本应不小于 `6`。为解决 npm 包管理工具的兼容性，本项目已限制为`pnpm`包工具，请确保环境中已安装该工具。
- Vue 版本：推荐使用`Vue3.3` Composition API 进行组件开发。
- 接口生成：已接入`pont`插件自动有 `Swagger JSON`生成 TS API 接口文件（生成目录默认为`src/api`中，可以自行修改`pont-config.json`配置），请配置`Vscode pont`插件进行使用。
- 代码提交：为规范代码提交时的消息格式，推荐使用`git cz`命令按提示填写提交信息，也可以使用`git commit -m "feat: 更新内容信息"`，`feat`可以使用`feat|fix|docs|style|refactor|perf|test|revert|chore`（各类型的说明可以查看`commitlint.config.js`配置）。
- docker 部署：已在`deploy`文件夹配置 docker 配置，部署前先通过`base.dockerfile`构建出安装完所有以来的基础镜像，再通过`test.dockerfile`构建指定环境的项目（需手动修改内部的基础镜像地址）。构建完成后，运行镜像时配置端口映射到容器内的`80`端口后，即可通过配置端口访问项目。
