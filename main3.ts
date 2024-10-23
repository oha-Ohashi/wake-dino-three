import { serve } from "https://deno.land/std@0.204.0/http/server.ts";
import { initMembers, fetchKVContent, writeKVContent, updateCell } from "./kvtest1.ts"

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
        // mode, name, value がすべて存在し、長さ1以上の文字列の場合
        const mode = url.searchParams.get("mode")!;
        const name = url.searchParams.get("name")!;
        const value = url.searchParams.get("value")!;

        await acceptParams(mode, name, value);
    } 
    else{
        console.log("mu");
    }

    // JSONファイルを返す
    try {
        const jsonResponse = await fetchKVContent(); // JSONファイルを読み込む
        return new Response(
            JSON.stringify(jsonResponse),
            {
                headers: {
					"Content-Type": "application/json",
					"access-control-allow-origin": "*"
				},
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ "result": "error" }),
            {
                headers: {
					"Content-Type": "application/json",
					"access-control-allow-origin": "*"
				},
                status: 500
            }
        );
    }
  
};

export let acceptParams = async (
	argMode: string,
	argName: string,
	argValue: string
): Promise<any> => {
	console.log(`3パラ: ${argMode} ${argName} ${argValue}` );

	// mode=reset: nameのwake or departをリセット。
	// value=left: wake, value=right: depart, value=both: 両方
    if (argMode === "init"){
        await initMembers();
    }
	else if (argMode === "reset"){
		if (argValue === "left"){
			await updateCell(argName, "wake", '-');
		}
		else if (argValue === "right"){
			await updateCell(argName, "depart", '-');
		}
		else if (argValue === "onboard"){
			await updateCell(argName, "type", 'onboard');
			await updateCell(argName, "wake", '-');
			await updateCell(argName, "depart", '-');
		}
		else if (argValue === "night"){
			await updateCell(argName, "type", 'night');
			await updateCell(argName, "wake", '-');
			await updateCell(argName, "depart", '-');
		}
		else if (argValue === "morning"){
			await updateCell(argName, "type", 'morning');
			await updateCell(argName, "wake", '-');
			await updateCell(argName, "depart", '-');
		}
		else if (argValue === "a"){
			await updateCell(argName, "wake", 'AAAAAAAAAAA');
		}
		else if (argValue === "b"){
			await updateCell(argName, "depart", 'BBBBBBBBBB');
		}
	}


}

console.log("HTTP server is running at http://localhost:8000");
await serve(handler, { port: 8000 });
