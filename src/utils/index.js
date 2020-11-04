const contractAddress = 'TGy7DG3PPmpt4b4sJG9HKnEWDj8xezjTGT'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;