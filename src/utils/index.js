const contractAddress = 'TM5uShsLgdvTX9JXvwnEgY3zWsCqDWxjNw'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;