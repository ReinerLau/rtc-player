# 概括

诞生于公司项目，支持单路或多路观看的 webrtc 拉流播放器

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

# 使用

初始页面为空白页面，因为还没有配置任何视频流，点击右下角配置

![image](https://github.com/ReinerLau/rtc-player/assets/103234074/74d03cf2-cee9-4029-ab87-98a8d74f5af3)
![image](https://github.com/ReinerLau/rtc-player/assets/103234074/011280fc-3555-4107-b437-a3e5490fb096)
![image](https://github.com/ReinerLau/rtc-player/assets/103234074/6c9a0d60-64e5-463b-89d3-8bdb8f893736)
![image](https://github.com/ReinerLau/rtc-player/assets/103234074/bde0ae2b-21eb-4fae-90fd-afd6ebf25a30)

名称随意填写，地址为 webrtc 格式，如 webrtc://xxx.com/live，填写完整后点击保存即可配置完一个视频流

![image](https://github.com/ReinerLau/rtc-player/assets/103234074/e3985e52-4d29-455a-a110-a826ca097d67)

配置完后刷新一下页面即可对视频进行拉流

如果配置了多路视频流，可以根据右上角序号逐个换页查看或者缩放后多路视频同时查看

![image](https://github.com/ReinerLau/rtc-player/assets/103234074/fe21eff0-6e96-4286-a9ac-f9384b647f50)





