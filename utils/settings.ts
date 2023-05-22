// load config file

let settings = {
    success: false,
    setup: false,
    message: '',
    config: {
        api_route: '',
    }
}

try {
    // check if file exists
    settings.config = require('../config/config.json');
    // if env exists, use it
    settings.config.api_route = process.env.NEXT_PUBLIC_API_ROUTE !== undefined ? process.env.NEXT_PUBLIC_API_ROUTE : settings.config.api_route;
    // console.log(settings.config.api_route);
    settings.success = true;
    settings.message = 'Config file loaded';
    if(settings.config.api_route === '') {
        settings.setup = true;
    }
} catch (err) {
    settings.message = 'an error occured while loading config file ' + err;
    settings.setup = true;
    console.error(settings.message);
}

export default settings;