import { serve } from "https://deno.land/std@0.204.0/http/server.ts";
//import { read } from "./read.ts"

// コードA: JSONファイルを読み込む関数
async function readJsonFile(filePath: string): Promise<any> {
  const data = await Deno.readTextFile(filePath); // ファイルをテキスト形式で読み込む
  return JSON.parse(data); // テキストをJSONオブジェクトに変換
}

const handler = async (req: Request): Promise<Response> => {
  // JSONファイルのパスを指定（適切なファイルパスに変更）
  const jsonResponse = await readJsonFile("./data.json"); // JSONファイルを読み込む

  return new Response(
    JSON.stringify(jsonResponse), 
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

console.log("HTTP server is running at http://localhost:8000");
await serve(handler, { port: 8000 });
