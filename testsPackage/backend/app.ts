import express, { Request, Response } from 'express';
import path from "path";
import fs from "fs";
import { Config, Configs } from "./types"
import { fromDir } from "./utils"

const rootPath: string = path.resolve(process.cwd(), '../../')



const getConfig = (): Configs => {
    const configJson = fs.readFileSync(rootPath + "/testsConfig.json")
    // @ts-ignore
    const { picType, baseShots: { folder: baseShotsFolder, fileSuffix: baseShotsSuffix }, diffShots: { folder: diffShotsFolder, fileSuffix: diffShotsSuffix } }: Config = JSON.parse(configJson)
    return { picType, base: { path: path.resolve(rootPath, baseShotsFolder), filter: baseShotsSuffix }, diff: { path: path.resolve(rootPath, diffShotsFolder), filter: diffShotsSuffix } }
}

const app = express();

const getPics = (type: "base" | "diff") => {
    const { [type]: { path, filter }, picType } = getConfig()
    return fromDir(path, `${filter}.${picType}`, true)
}



app.use(express.json());

app.get('/', (req, res) => res.send('hello'));

app.use(express.static("../client/build"));
app.use(express.json());

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

export default app;
