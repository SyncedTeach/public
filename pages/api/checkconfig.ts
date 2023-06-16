import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
// import settings from "@/utils/settings";
type Data = {
  success: Boolean;
  message: String;
  path?: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // create config file
    const config = {
        api_route: ''
    }
    
    // check if file exists
    try {
        const configPath = path.join(process.cwd(), 'config/config.json');
        if(fs.existsSync(configPath)) {
            res.status(200).json({ success: true, message: 'Config file already exists', path: configPath });
        }else{
            // create file
            fs.mkdirSync(path.join(process.cwd(), 'config'), { recursive: true });
            fs.writeFile(configPath, JSON.stringify(config), (err) => {
                if(err) {
                    res.status(500).json({ success: false, message: 'an error occured while creating config file ' + err });
                }else{
                    res.status(200).json({ success: true, message: 'Config file created', path: configPath });
                }
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'an error occured while checking config file ' + err });
    }
}

