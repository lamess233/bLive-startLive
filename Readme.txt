使用方法

将`config.example.json`复制一份，把复制出来的文件的文件名改成`config.json`  

打开`config.json`，修改其中的参数  
以下是参数对照（获取方法部分假设你使用Chrome浏览器）  
 BUVID3: 打开B站网页-->按键盘F12打开调试工具DevTool-->点击栏目"应用(Application)"-->点击左侧的Storage下的Cookie-->找一个以bilibili.com结尾的网址-->找到`buvid3`-->点击查看值并复制到`config.json`对应项的引号内 
 CSRF: 打开B站网页-F12-应用-Cookie-找一个以bilibili.com结尾的网址-找到`bili_jct`-复制到`config.json`对应项引号内 
 SESSDATA: 打开B站网页-F12-应用-Cookie-找一个以bilibili.com结尾的网址-找到`SESSDATA`-复制到`config.json`对应项引号内 
 AREA: 可以访问这个两个网页之一来查询开播区域ID：https://bliveareaid.deno.dev 或 https://api.live.bilibili.com/room/v1/Area/getList 
 APPKEY: https://socialsisteryi.github.io/bilibili-API-collect/docs/misc/sign/APPKey.html 
 APPSEC: 同上