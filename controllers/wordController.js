// Include Manager file which will contain business logic in order retrieve phonetic result
const word = require('../models/wordManager');
const fs = require('fs');
const es = require('event-stream')

exports.getPhonetic = (req, res) => {
    // We validate that we have a proper language & word parameters are passed to the API call
    if ((typeof req.params.word !== 'undefined' && req.params.word)) {
        word.getPhonetic(req.params.word, (err, data) => {
            // Return an error if one is found
            if (err) {
                return console.log(err);
            }
            console.log('getphonetics', data)
            // Return the result of the getPhonetic function
            res.send(data);
            return data
        });
    }
};

const attempts = [
    [1, 2000], [2001, 4000], [4001, 6000], [6001, 8000], [8001, 1000],
    [1001, 12000], [12001, 14000], [14001, 16000], [16001, 18000], [18001, 20000],
    [20001, 22000], [22001, 24000], [24001, 26000], [26001, 28000], [28001, 30000]
]
const readline = require('readline')

exports.getAllPhonetics = async (req, res) => {
    const { attempt } = req.params
    const rawdata = await fs.readFileSync('english-words.json');
    const words = JSON.parse(rawdata);
    const keyArr = Object.keys(words);
    let index = parseInt(attempt) * 2000
    for (let key of keyArr) {
        if (index < attempts[attempt][0] - 1 || index > attempts[attempt][1]) {
            return
        }
        console.log("exports.getAllPhonetics -> key", key)
        await word.getPhonetic(key);
        index++
    }

    res.send('finish crawling data');
};


// exports.getAllPhonetics = async (req, res) => {
//     const rl = readline.createInterface({
//         input: fs.createReadStream('words_alpha.txt'),
//         output: process.stdout,
//         terminal: false
//     });

//     rl.on('line', (line) => {
//         console.log(line)
//         word.getPhonetic(key);
//     });
//     res.send('finish crawling data');
// };











