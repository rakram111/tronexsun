const contractAddress = 'TR4NK2Rmqj9TvPPWC5xB4kgLedaUZQfzVY'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;