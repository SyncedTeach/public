const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '/config/config.json');

if (!fs.existsSync(configPath)) {
    console.log('config.json not found, creating...');
    fs.writeFileSync(configPath, JSON.stringify({
        api_route: '',
    }));
}


