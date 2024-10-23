// コードA: JSONファイルを読み込む関数
let filePath = "./data.json";

export let readJsonFile = async (): Promise<Object> => {
	const data = await Deno.readTextFile(filePath); // ファイルをテキスト形式で読み込む
	//return JSON.parse(data); // テキストをJSONオブジェクトに変換
	return data; // テキスト
}

export let writeJsonFile = async (jsonObject: any): Promise<void> => {
    const jsonString = JSON.stringify(jsonObject, null, 2); // JSONオブジェクトを文字列に変換
    await Deno.writeTextFile(filePath, jsonString); // ファイルに書き込む
}

