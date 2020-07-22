const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var os = require("os");

function processInput(text) {
    fs.open('/Users/ngochangjelly/Desktop/phonetics-searching/output.txt', 'a', 666, async function (e, id) {
        await fs.write(id, text + os.EOL, null, 'utf8', async function () {
            await fs.close(id, function () {
            });
        });
    });
}

exports.getPhonetic = async (wordToTranslate) => {
    const url = `http://www.collinsdictionary.com/dictionary/english/${wordToTranslate}`;
    request(url, async (error, response, html) => {
        if (!error) {
            // Using cheerio package we will extract the phonetic word from page
            const $ = cheerio.load(html);
            const phoneticWords = $('span.pron').text();
            let phoneticWord = '';

            // Based on language, format the result correctly, as they vary per language
            const string = phoneticWords.split(' ');
            phoneticWord = string[0];
            // Remove spaces & special characters from word
            phoneticWord = phoneticWord.replace(/(\r\n|\n|\r)/gm, '');
            phoneticWord = phoneticWord.replace(/ /g, '');
            phoneticWord = phoneticWord.trim();
            phoneticWord = phoneticWord.replace(/[|&;$%@<>()+]/g, '');
            // Format the result as JSON, store it in Redis and return it
            processInput(`${wordToTranslate} ||||| ${phoneticWord}`)
            return phoneticWord;
        }
    });
};
