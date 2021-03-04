import fs from "fs"
import path from "path"
const baseArr: string[] = []
const diffArr: string[] = []
let current = "base"
type FirstIndicator = "base" | "diff" | null
export function fromDir(startPath: string, filter: string, first: FirstIndicator = null): string[] | null {
    if (first) {
        current = first
        if (first === "base") {
            baseArr.length = 0
        } else {
            diffArr.length = 0
        }
    }
    const currentArr = current === "base" ? baseArr : diffArr
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return null;
    }
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter);
        }
        else if (filename.endsWith(filter)) {
            currentArr.push(filename)
        };
    };
    return currentArr
};