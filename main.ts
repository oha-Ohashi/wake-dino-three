import { serve } from "https://deno.land/std@0.204.0/http/server.ts";
import { readJsonFile, acceptParams} from "./read.ts"

// クエリパラメータのチェック関数
function isValidQueryParams(url: URL): boolean {
  const mode = url.searchParams.get("mode");
  const name = url.searchParams.get("name");
  const value = url.searchParams.get("value");

  return (
    mode !== null && mode.length > 0 &&
    name !== null && name.length > 0 &&
    value !== null && value.length > 0
  );
}

const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    // クエリパラメータとして mode, name, value が正しく与えられているかチェック
    if (isValidQueryParams(url)) {
        console.log("みっつパラメータ");
        // mode, name, value がすべて存在し、長さ1以上の文字列の場合
        const mode = url.searchParams.get("mode")!;
        const name = url.searchParams.get("name")!;
        const value = url.searchParams.get("value")!;

        await acceptParams(mode, name, value);
    } 
    else{
        console.log("無効パラメータ");
    }

    // JSONファイルを返す
    try {
        const jsonResponse = await readJsonFile(); // JSONファイルを読み込む
        return new Response(
        JSON.stringify(jsonResponse),
        {
            headers: { "Content-Type": "application/json" },
        }
        );
    } catch (error) {
        return new Response(
        JSON.stringify({ error: "Failed to read JSON file." }),
        {
            headers: { "Content-Type": "application/json" },
            status: 500
        }
        );
    }
  
};

console.log("HTTP server is running at http://localhost:8000");
await serve(handler, { port: 8000 });
