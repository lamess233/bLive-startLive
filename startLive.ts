// startLive.ts

import { loadConfig } from './loadConfig.ts';
import { createForm } from './createForm.ts';
import { appSign } from "./sign.ts";

async function main() {
    try {
        const config = await loadConfig();
        if (!config) {
            return; 
        }

        console.log(`正在为直播间 ${config.ROOM} 请求开播...`);

        const signed = await appSign({
            "csrf": config.CSRF,
            "area_v2": config.AREA,
            "disable_rcmd": "1",
            "platform": "android",
            "room_id": config.ROOM.toString(),
            "ts": Math.round(Date.now() / 1000).toString(),
        }, config.APPKEY, config.APPSEC);

        const body = createForm(signed as Record<string, string>);
        const req_a = await fetch('https://api.live.bilibili.com/room/v1/Room/startLive', {
            method: "post",
            body,
            headers: {
                Cookie: `buvid3=${config.BUVID3};SESSDATA=${config.SESSDATA};bili_jct=${config.CSRF};`,
                'app-key': 'android64',
                'User-Agent': 'Mozilla/5.0 BiliDroid/8.34.0 (bbcallen@gmail.com) os/android model/FUCK mobi_app/android build/8340200 channel/oppo innerVer/8340210 osVer/1145141919810 network/2',
            }
        });

        const result = await req_a.json();
        if (result.code !== 0) {
            console.error(`无法开播，错误码: ${result.code}, 错误信息: ${result.message}\n`);
            console.log("完整响应:", result);
            if (result.code === 60024) {
                alert('请先使用网页开播通过人脸识别再回到这里开播');
            }
            return;
        }

        console.log("开播成功！");
        console.table({
            "服务器": result.data.rtmp.addr,
            "推流码": result.data.rtmp.code
        });
    } catch (error) {
        console.error("程序发生意外错误：", error);
    } finally {
        // 无论是成功还是失败，都执行这里
        // 提示用户按回车键退出，从而让窗口保持打开
        await prompt("按 Enter 键退出...");
    }
}

await main();
