require('@babel/register')({
    presets: ['@babel/react', '@babel/preset-env']
});

require("@babel/core").transform("code", {
    plugins: ["dynamic-import-webpack"],
});

let port = (typeof (process.env.PORT_M) !== 'undefined' ? process.env.PORT_M : 3000); //3000 - for dev, 8083 - loginfor stg
let fs = require('fs');

let Express = require('express')
let app = Express();
let router = require('./Router/routes');

let cors = require('cors');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let requestIp = require('request-ip');

let compression = require('compression');
app.use(compression());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(requestIp.mw()); //define request ip middileware
app.use(cors());
app.use(cookieParser());


if (process.env.NODE_ENV_M !== 'prod') {
    let webpack = require('webpack');
    let webpackDevMiddleware = require('webpack-dev-middleware');
    let versionData = JSON.parse(fs.readFileSync(__dirname + '/version.json', 'utf8'));
    let chunkWritePath = require('../webpack');
    let config = require('../webpack.config')(Number(versionData.main_min), Number(versionData.jsChunks), Number(versionData.cssChunks), chunkWritePath);
    let compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        historyApiFallback: true
    }));
}

app.set('etag', false); // turn off

let domainName = '';
if (typeof (process.env.NODE_ENV_M) == 'undefined')
    domainName = process.env.NODE_ENV_M ? '' : 'localhost';
else
    domainName = process.env.NODE_ENV_M ? '' : 'prod-buyer-my-pw';


app.listen(port, domainName, function (error) {
    // console.log("port",port)
    // console.log(process.env.NODE_ENV_M);
    // console.info('In index.js');
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up localhost:%s/ in your browsers.', port, port)
    }
});

if (process.env.NODE_ENV_M == 'prod' || process.env.NODE_ENV_M == 'prod_test') {
    require('elastic-apm-node').start({
        serviceName: 'prod-buyer-my-pw',
        secretToken: 'P5FqLU1dMgu1',
        serverUrl: 'https://kibana-apm.intermesh.net:8300/',
    });
} else if(process.env.NODE_ENV_M == 'dev') {
    require('elastic-apm-node').start({
        serviceName: 'dev-buyermy-nodejs',
        secretToken: 'P5FqLU1dMgu1',
        serverUrl: 'https://kibana-apm.intermesh.net:8300/',
   });
}

router(app);

