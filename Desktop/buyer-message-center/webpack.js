const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
let outputLog = {};
const fs = require('fs');

const outputLogPath = "/home3/indiamart/statlogs/nodelogs/"


const fileWritePath = function () {
    let chunksWritePath = '';
    if (process.env.NODE_ENV_M == 'prod' || process.env.NODE_ENV_M == 'prod_test') {
        chunksWritePath = '/home3/indiamart/public_html/prod-buyer-my-pw/buyer-lite/pwagifs/';
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        chunksWritePath = '/home3/indiamart/public_html/stg-buyer-my-pw/buyer-lite/pwagifs/';
    }
    else if (process.env.NODE_ENV_M == 'dev') {
        chunksWritePath = "/home3/indiamart/public_html/dev-buyer-my-pw/buyer-lite/pwagifs/";
    }
    else {
        chunksWritePath = __dirname + '/pwagifs/';
    }
    return chunksWritePath;
}();
let versionData = JSON.parse(fs.readFileSync(__dirname + '/server/version.json', 'utf8'));
function srcFileBuild() {
    let cssChunksNum = versionData.cssUp ? Number(versionData.cssChunks) + 1 : Number(versionData.cssChunks);
    let config = webpackConfig(Number(versionData.main_min) + 1, Number(versionData.jsChunks) + 1, cssChunksNum, fileWritePath);
    let compiler = webpack(config);
    compiler.run((err, stats) => { // Stats Object
        if (err) {
            outputLog = err;
        }
        else if (stats.hasErrors()) {
            outputLog = stats.toJson('verbose').errors;
        }
        else {
            let statsData = stats.toJson('verbose');
            let chunkData = [];
            chunkData = statsData.assets.map((data) => {
                return ({
                    name: data.name,
                    size: parseInt(data.size / 1000) + 'KB'
                })
            });
            outputLog = {
                chunks: chunkData,
                time: Math.floor(statsData.time / 1000) + 's',
                warnings: statsData.warnings,
                status: "compiled"
            };
            let updatedVersion = Number(versionData.main_min) + 1, updatedChunk = Number(versionData.chunks) + 1;
            fs.writeFileSync(fileWritePath + 'stats' + updatedVersion + '.json', JSON.stringify(outputLog), (err) => {
                if (err) throw err;
            });
        }
        if (process.env.NODE_ENV_M == 'prod') {
            fs.writeFileSync('/home3/indiamart/statlogs/nodelogs/buildOutput.log', JSON.stringify(outputLog), (err) => {
                if (err) throw err;
            })
        }
    });
}
function srcFileWatch() {
    let config = webpackConfig(versionData.main_min, versionData.chunks);
    let compiler = webpack(config);
    compiler.watch({
        aggregateTimeout: 300,
        poll: 1000
    }, (err, stats) => {
        if (err) {
            console.log(err);
        }
        else if (stats.hasErrors()) {
            console.log(stats.toJson('verbose').errors);
        }
        else {
            let statsData = stats.toJson('verbose');
            outputLog = {
                time: Math.floor(statsData.time / 1000) + 's',
                warnings: statsData.warnings,
                status: "watching"
            };
        }
        console.log(outputLog);
    });
}

if (process.argv[2] == 'build') {
    srcFileBuild();
}
else if (process.argv[2] == 'watch') {
    srcFileWatch();
}

module.exports = fileWritePath;

