const contractAddress = 'TDUye4UkDZ56MtWe2ZbPMaAQDANY7LgxEC'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;