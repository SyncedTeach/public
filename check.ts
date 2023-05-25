const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), '/config/config.json');

if (!fs.existsSync(configPath)) {
    // create a folder
    if (!fs.existsSync(path.join(process.cwd(), '/config'))) {
        console.log('config folder not found, creating...');
        fs.mkdirSync(path.join(process.cwd(), '/config'));
    }

    console.log('config.json not found, creating...');
    fs.writeFileSync(configPath, JSON.stringify({
        api_route: '',
    }));
}


