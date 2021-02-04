const { spawn } = require('child_process');

export default async (req, res) => {
    const fileName = 'scripts/temp/' + Math.random().toString(36).substring(7) + '.txt';
    try {
        await scrapeProxies(fileName);
        await checkProxies(fileName);
        printProxies(fileName).then((proxies) => {
            res.json(proxies);
        });
    } catch (error) {
        res.json(error);
        res.status(500).end();
    }
}

const scrapeProxies = (fileName) => {
    return new Promise((resolve, reject) => {
        try {
            let sentData;
    
            const python = spawn('python', ['scripts/proxy-scraper/proxyScraper.py', '-p', 'http', '-o', fileName]);
    
            python.stdout.on('data', function (data) {
                sentData = data.toString();
            });
    
            python.on('close', (code) => {
                resolve(sentData);
            });
        } catch (error) {
            reject(error);
        }
    })
}

const checkProxies = (fileName) => {
    return new Promise((resolve, reject) => {
        try {
            let sentData;
    
            const python = spawn('python', ['scripts/proxy-scraper/proxyChecker.py', '-t', '10', '-l', fileName]);
    
            python.stdout.on('data', function (data) {
                sentData = data.toString();
            });
    
            python.on('close', (code) => {
                resolve(sentData);
            });
        } catch (error) {
            reject(error);
        }
    })
}

const printProxies = (fileName) => {
    return new Promise((resolve, reject) => {
        try {
            let sentData;
    
            const python = spawn('python', ['scripts/readProxies.py', fileName]);
    
            python.stdout.on('data', function (data) {
                sentData = data.toString();
            });
    
            python.on('close', (code) => {
                resolve(sentData);
            });
        } catch (error) {
            reject(error);
        }
    })
}
