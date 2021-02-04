const { spawn } = require('child_process');

export default async (req, res) => {
    const type = req.query.type.toLowerCase();
    const timeout = req.query.timeout;
    const fileName = 'scripts/temp/' + Math.random().toString(36).substring(7) + '.txt';

    try {
        await scrapeProxies(fileName, type);
        await checkProxies(fileName, timeout);
        printProxies(fileName).then((proxies) => {
            res.json(proxies);
        });
    } catch (error) {
        console.log(error);
        res.json(error);
        res.status(500).end();
    }
}

const scrapeProxies = (fileName, type) => {
    return new Promise((resolve, reject) => {
        try {
            let sentData;
    
            const python = spawn('python', ['scripts/proxy-scraper/proxyScraper.py', '-p', type, '-o', fileName]);
    
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

const checkProxies = (fileName, timeout) => {
    return new Promise((resolve, reject) => {
        try {
            let sentData;
    
            const python = spawn('python', ['scripts/proxy-scraper/proxyChecker.py', '-t', timeout, '-l', fileName]);
    
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
