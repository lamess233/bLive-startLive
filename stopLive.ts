// stopLive.ts

import { loadConfig } from './loadConfig.ts';
import { createForm } from './createForm.ts';

async function main() {
    try {
        const config = await loadConfig();
        if (!config) {
            return;
        }

        console.log(`正在为直播间 ${config.ROOM} 请求下播...`);

        const body = createForm({
            csrf: config.CSRF,
            room_id: config.ROOM.toString(),
            platform: 'android'
        });

        const req_a = await fetch('https://api.live.bilibili.com/room/v1/Room/stopLive', {
            method: "post",
            body,
            headers: {
                Cookie: `buvid3=${config.BUVID3};SESSDATA=${config.SESSDATA};bili_jct=${config.CSRF};`,
                'app-key': 'android64',
                'User-Agent': 'Mozilla/5.0 BiliDroid/8.34.0 (bbcallen@gmail.com) os/android model/FUCK mobi_app/android build/8340200 channel/oppo innerVer/8340210 osVer/1145141919810 network/2',
            }
        });

        const res = await req_a.json();
        if (res.code === 0) {
            console.log(`已成功下播。`);
        } else {
            console.error(`下播失败，错误码: ${res.code}, 错误信息: ${res.message}`);
        }
    } catch (error) {
        console.error("程序发生意外错误：", error);
    } finally {
        // 无论是成功还是失败，都执行这里
        await prompt("按 Enter 键退出...");
    }
}

await main();
