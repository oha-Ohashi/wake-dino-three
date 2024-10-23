import { readJsonFile } from "./read.ts"
import { update2D } from "./json_control.ts"

export let initMembers = async (): Promise<void> => {
    console.log("初期化するよ");
    const kv = await Deno.openKv();
    const content: any = await readJsonFile();
    await kv.set(["kintai"], content);

    //fetchKVContent();
}

export const fetchKVContent = async (): Promise<string> => {
    const kv = await Deno.openKv();
    const entry = await kv.get(["kintai"]);
    //console.log(`aa!__${entry.value}`);
    
    return JSON.parse(String(entry.value));
}

export const writeKVContent = async (argContent: Object): Promise<void> => {
    const kv = await Deno.openKv();
    kv.set(["kintai"], JSON.stringify(argContent));
}

export const updateCell = async (argName: string, argKey: string, newValue: string): Promise<void> => {
    let js: any = await fetchKVContent();
    let target = js.content.find((element: any) => element.name === argName);
    if(target != undefined){
        target[argKey] = newValue;
    }
    

    //console.log(`${JSON.stringify(js)}`);
    await writeKVContent(js);
}