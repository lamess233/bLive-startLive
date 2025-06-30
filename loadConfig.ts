// loadConfig.ts

// 定义配置对象的类型，以获得类型安全
interface Config {
    BUVID3: string;
    SESSDATA: string;
    CSRF: string;
    ROOM: number;
    AREA: string;
    APPKEY: string;
    APPSEC: string;
}

/**
 * 从同目录下的 config.json 文件异步加载配置
 * @returns 返回配置对象，如果文件不存在或格式错误则返回 null
 */
export async function loadConfig(): Promise<Config | null> {
    try {
        const configText = await Deno.readTextFile("./config.json");
        const config: Config = JSON.parse(configText);
        
        // 关键验证：确保核心凭证不为空
        if (!config.SESSDATA || !config.CSRF || !config.ROOM) {
            console.error("错误：配置文件 'config.json' 中的 SESSDATA, CSRF 或 ROOM 字段未填写！");
            return null;
        }

        return config;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            console.error("错误：未找到配置文件 'config.json'。");
            console.error("请将 'config.example.json' 复制一份，重命名为 'config.json'，并填入您的信息。");
        } else if (error instanceof SyntaxError) {
            console.error("错误：配置文件 'config.json' 格式不正确，请检查是否为有效的 JSON 格式。");
        } else {
            console.error("加载配置文件时发生未知错误:", error);
        }
        return null;
    }
}
