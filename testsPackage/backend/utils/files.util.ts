import fs from "fs"
import path from "path"
const baseArr: string[] = []
const newShotsArr: string[] = []
let current = "base"
type FirstIndicator = "base" | "newShots" | null

export const base64Encode = (file: string) => {
    let bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString("base64");
}


export const fromDir = (startPath: string, filter: string, ignoreSuffix: string, first: FirstIndicator = null): string[] | null => {
    if (first) {
        current = first
        if (first === "base") {
            baseArr.length = 0
        } else {
            newShotsArr.length = 0
        }
    }
    const currentArr = current === "base" ? baseArr : newShotsArr
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return null;
    }
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, ignoreSuffix);
        }
        else if (filename.endsWith(filter) && !filename.endsWith(ignoreSuffix)) {
            currentArr.push(filename)
        };
    };
    return currentArr
};


export const sampleConfig = {
    "picType": "png",
    "baseShots": {
        "folder": "screenshot_testing/shots",
        "fileSuffix": "",
        "ignoreSuffix": "full"
    },
    "newShots": {
        "folder": "screenshot_testing/temp",
        "fileSuffix": "-diff",
        "ignoreSuffix": "full"
    }
}
