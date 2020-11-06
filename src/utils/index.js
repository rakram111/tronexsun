const contractAddress = 'TTDQzaox2WFz4YwBwVgUBsv5H54nb9n72H'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;