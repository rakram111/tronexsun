const contractAddress = 'TVh8VQ2rJ7mvcaQfmVGzsurL5FJKZhe6tn'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;