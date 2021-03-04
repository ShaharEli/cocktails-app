import fs from "fs"
import path from "path"
const filesArr: string[] = []

export function fromDir(startPath: string, filter: string, first = false): string[] | null {
    if (first) {
        filesArr.length = 0
    }
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
            filesArr.push(filename)
        };
    };
    return filesArr
};