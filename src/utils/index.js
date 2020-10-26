const contractAddress = 'TU3TJN9fKVqHTg8wTu1wedCgWdFYXGUTKK'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;