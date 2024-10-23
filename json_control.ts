

// func01を定義
export let update2D = (argName: string, argKey: string, newValue: string, js_text: string): string => {
 	// nameが"ota"のオブジェクトを検索してtypeにアクセス
    const js = JSON.parse(js_text);
	const index = js.data.findIndex((item: { name: string }) => item.name === argName);

	if (index >= 0) {
		js.data[index][argKey] = newValue;
	} else {
		console.log(`${argName}` +"が見つかりませんでした");
	}
	
	return String(js);
}

