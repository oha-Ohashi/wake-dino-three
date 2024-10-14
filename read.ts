// コードA: JSONファイルを読み込む関数
let filePath = "./data.json";

export let readJsonFile = async (): Promise<any> => {
	const data = await Deno.readTextFile(filePath); // ファイルをテキスト形式で読み込む
	return JSON.parse(data); // テキストをJSONオブジェクトに変換
}

export let writeJsonFile = async (jsonObject: any): Promise<void> => {
    const jsonString = JSON.stringify(jsonObject, null, 2); // JSONオブジェクトを文字列に変換
    await Deno.writeTextFile(filePath, jsonString); // ファイルに書き込む
}


export let acceptParams = async (
	argMode: string,
	argName: string,
	argValue: string
): Promise<any> => {
	let data = await Deno.readTextFile(filePath); // ファイルをテキスト形式で読み込む
	data = JSON.parse(data);

	console.log(`${argMode} ${argName} ${argValue}` );

	// mode=reset: nameのwake or departをリセット。
	// value=left: wake, value=right: depart, value=both: 両方
	if (argMode === "reset"){
		if (argValue === "left"){
			update2D(argName, "wake", '-', data);
		}
		else if (argValue === "right"){
			update2D(argName, "depart", '-', data);
		}
		else if (argValue === "both"){
			update2D(argName, "wake", '-', data);
			update2D(argName, "depart", '-', data);
		}
		else if (argValue === "a"){
			update2D(argName, "wake", 'AAAAAAAAAAA', data);
		}
		else if (argValue === "b"){
			update2D(argName, "depart", 'BBBBBBBBBB', data);
		}
	}


	writeJsonFile(data);
}

// func01を定義
function update2D(argName: string, argKey: string, newValue: string, js: any) {
 	// nameが"ota"のオブジェクトを検索してtypeにアクセス
	const index = js.data.findIndex((item: { name: string }) => item.name === argName);

	if (index >= 0) {
		js.data[index][argKey] = newValue;
	} else {
		console.log(`${argName}` +"が見つかりませんでした");
	}
	
	return js;
}

