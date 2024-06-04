# 开发环境

安装依赖

```shell
pnpm install
```

初始化数据库

```shell
pnpm db:init
```

运行

```shell
pnpm dev
```

打开 http://localhost:3000

# docker 部署

```shell
docker build -t rtc-player .
```

```shell
docker run -d -p 3000:3000 rtc-player
```
