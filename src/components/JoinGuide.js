import React, { Component } from 'react';
import back from "./Image1/back.jpg"

import "./css/style.css";

let url = "https://tronexsun.net/";


class JoinGuide extends Component {

    render() {

        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        };

        return (
            <div>
                <div style={{ backgroundColor: "black", textAlign: "center" }}>
                    <br />
                    <h4 style={{ color: "white", fontSize: "15px" }}>Choose Language {/* <img src={require("./Image1/english.jpg")} alt="Flag" width="30px" /> */}
                    </h4>

                    <div id="google_translate_element">

                    </div>
                    <br />
                </div>

                <div style={backStyle}>
                    <hr />
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <a href={url} >  <img src={require("./Image1/logo.png")} alt="Logo" width="260px" /></a>
                    </div>
                    <div className="container" style={{ backgroundColor: "black", opacity: "80%", padding: "20px" }}>

                        <h4 style={{ color: "#1AE865" }}>Joining Guide</h4><hr />
                        <p style={{ color: "white" }}>
                            To join Tronex Sun you need to use one of the following Dapp wallets.
                            <br /> To connect with the smart contract, please download, set up, and fund your preferred wallet from the instructions below.
                            <br /> It is mandatory to use a referral link 1st time depositing to Tronex Sun smart contract, please get back to the person that introduced you to Tronex Sun.
                            <br /><br /> <span style={{ color: "#1AE865" }}>PHONE WALLETs - KLEVER Wallet or TOKEN POCKET</span>
                            <br /> KLEVER WALLET - download at offical site:<br />
                            <br /> Official website: <a href="https://play.google.com/store/apps/details?id=cash.klever.blockchain.wallet">Klever Wallet here</a>
                            <br /> TOKEN POCKET WALLET - download at offical site:<br />
                            <br /> Official website: <a href="https://play.google.com/store/apps/details?id=vip.mytokenpocket">Token Pocket Wallet here</a>
                            <br /> KLEVER WALLET is a secure p2p crypto wallet and exchange for TRON (TRX)
                            <br /> Download and set up the wallet to phone<br /> Fund TRON wallet with TRX<br /> Go to Dapp browser in wallet and enter the ref link<br /> select amount to deposit and click join<br /><br /> TRONLINK Wallet - PC BROWSER EXTENSION
                            <br /><br /> What is TRONLINK?
                            <br /> TRONLINK is Available as a browser extension and as a mobile app, TronLink equips you with a key vault, secure login, and token wallet—everything you need to manage your digital assets.
                            <br /> TronLink generates passwords and keys on your device, so only you have access to your accounts and data
                            <br /><br /> How download TRONLINK browser extension?
                            <br /> Official website: <a href="https://www.tronlink.org/">Tron Link here</a>
                            <br /> How to connect TRONLINK to Tronex Sun smart contract?
                            <br /> Open Web browser with TronLink download<br /> Enter <a href="https://www.tronexsun.net/">tronexsun.net</a> (ref link) an click enter<br /> Allow TRONLINK wallet to connect to <a href="https://www.tronexsun.net/">tronexsun.net</a>
                            <br /> First time joining Tronex Sun, follow these steps
                            <br /> Copy ref link from sponsor<br /> enter ref link into your pc browser with TRONLINK extension<br /> Select the amount you wish to deposit  <br /> Click join and confirm transaction in wallet

                            <hr />


                            <a href={url} style={{ color: "red", textDecoration: "underline" }} >Back</a>

                        </p>

                    </div>
                </div >
            </div >
        );
    }
}
export default JoinGuide;
