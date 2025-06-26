import * as config from './config.ts'
import { createForm } from './createForm.ts'

async function stopLive() {
    const body = createForm({
        csrf: config.CSRF,
        room_id: config.ROOM,
        platform: 'android'
    })
    const req_a = await fetch('https://api.live.bilibili.com/room/v1/Room/stopLive', {
        credentials: "include",
        method: "post",
        body,
        headers: {
            Cookie: `buvid3=${config.BUVID3};SESSDATA=${config.SESSDATA};bili_jct=${config.CSRF};`,
            'app-key': 'android64',
            'User-Agent': 'Mozilla/5.0 BiliDroid/8.34.0 (bbcallen@gmail.com) os/android model/FUCK mobi_app/android build/8340200 channel/oppo innerVer/8340210 osVer/1145141919810 network/2',
        }
    })
    const res = await req_a.json()
    if (res.msg === '0') {
        console.log(`已下播`)
    }
}

await stopLive()