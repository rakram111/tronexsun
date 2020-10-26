const contractAddress = 'TT7nkEeWBCdYtggBCYDzhw5L97tcNsE8i3'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;