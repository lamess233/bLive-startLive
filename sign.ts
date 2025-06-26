/*
此文件来自 https://socialsisteryi.github.io/bilibili-API-collect/docs/misc/sign/APP.html
遵循 CC BY-NC 4.0 协议
*/

import { crypto } from '@std/crypto'

type Params = Record<string, any>
const encoder = new TextEncoder

function toHex(buffer: ArrayBuffer) {
    const hashArray = Array.from(new Uint8Array(buffer))                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
    return hashHex
}
const md5 = async (str: string) => toHex(await crypto.subtle.digest('MD5', encoder.encode(str)))

/**
 * 为请求参数进行 APP 签名
 */
export async function appSign(params: Params, appkey: string, appsec: string) {
  params.appkey = appkey
  const searchParams = new URLSearchParams(params)
  searchParams.sort()
  return {...params, sign: await md5(searchParams.toString() + appsec)}
}
