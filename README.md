# B站无直播姬开播

通过伪装成手机应用发送开播请求来开播  

### 使用方法

-首先安装 [Deno](https://deno.com/)  
-下载该仓库  
-将`config.example.ts`复制一份，把复制出来的文件的文件名改成`config.ts`  
-打开`config.ts`，修改其中的参数  
以下是参数对照（获取方法部分假设你使用Chrome浏览器）  
|参数名|获取方法|
|----|------|
|BUVID3|打开B站网页-F12-应用-Cookie-找一个以bilibili.com结尾的网址-找到`buvid3`-复制到`config.ts`对应项引号内|
|CSRF|打开B站网页-F12-应用-Cookie-找一个以bilibili.com结尾的网址-找到`bili_jct`-复制到`config.ts`对应项引号内|
|SESSDATA|打开B站网页-F12-应用-Cookie-找一个以bilibili.com结尾的网址-找到`SESSDATA`-复制到`config.ts`对应项引号内|
|ROOM|你的直播间号|
|AREA|https://api.live.bilibili.com/room/v1/Area/getList|
|APPKEY|https://socialsisteryi.github.io/bilibili-API-collect/docs/misc/sign/APPKey.html|
|APPSEC|同上|

-右键项目文件夹，点击`在终端内打开`  
-开播：`deno run --allow-net ./startLive.ts` 下播:`deno run --allow-net ./stopLive.ts`

