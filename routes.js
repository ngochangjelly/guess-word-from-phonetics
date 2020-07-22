// Including controllers that will handle functions from routing
const wordController = require('./controllers/wordController');

module.exports = (server) => {
    // API route to handle phonetic word retrieval
    server.get('/ipa/:word', wordController.getPhonetic);
    server.get('/get-all-phonetics/:attempt', wordController.getAllPhonetics);
};
