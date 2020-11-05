import React, { Component } from 'react';
import back from "./Image1/back.jpg"
import "./css/style.css";
let url = "https://trusting-curie-768fd6.netlify.app/";

class PlanText extends Component {

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

                        <h4 style={{ color: "#1AE865" }}>About Tronex Sun</h4><hr />
                        <p style={{ color: "white" }}>
                            Welcome to the world´s best decentralized community support fund built on TRON blockchain and smart contract technology.
                            <hr />
                            The Tronex Sun Smart Contract is designed to provide everyone with an independent, financial support fund, based on Smart Contract technology, surrounded and supported by multiple services including DEFI and online gaming through ECLIPCITY
                            <hr />
                            Any participant can contribute TRX towards the community fund and support the Tronex Sun community members, the participant will now activate the contract code and will start to receive support back from other community members.
                            <hr />
                            Tronex Sun is 100% decentralized and a community-based project; Meaning that there are no guarantee nor additional profits made in TROCHAIN alone, all that you receive from Tronex Sun is receied from other communty members and based upon your own and the community efforts as this is a P2P support model
                            <hr />
                            You support others and others support you back.
                            <hr />
                            Tronex Sun can actually be viewed as a decentralized “third party” which insures complete fairness, transparency and justice for all according to the algorithm code.
                            <hr />
                            There are no mediators or intermediaries, no owners, no company, no CEO and no human interaction, which is effectively guaranteeing the fairness of all participating partners and partners funds according to the rules of the Smart Contract.
                            <hr />
                            It is the most reasonable, safest, and best cutting-edge financial SUPPORT model available at this time.
                            <hr /><hr />

                            You can participate in Tronex Sun by depositing a minimum of 100 TRX to the Fund, you are now eligable to receive 320% back
                            <hr />
                            The 320% is returned in 4 ways (1 passive and 3 via marketing) and when the 320% is accumulated through any of the 4 ways, a new deposit must be made equal or greater to continue receiving from the fund.
                            <hr />
                            1.1% to 5.0% Daily return on your Deposit - 100% Passive.
                            <hr />
                            10% Direct Referral Commission for Sharing and Growing the Community Fund.
                            <hr />
                            Generation Commission on Partners Daily Income every time they make a withdrawal
                            <hr />
                            1st generation 30%<br />
                            2nd generation 10%<br />
                            3rd generation 5%<br />
                            4th generation 5%<br />
                            5th generation 5%<br />
                            6th generation 5%<br />
                            7th generation 5%<br />
                            8th generation 5%<br />
                            9th generation 5%<br />
                            <hr />


                            1 new level is activated for each direct partner, maximum 9 levels, see above.
                            <hr />

                            Daily Top Referrer Pool 3%, of ALL Deposits set aside in pool, every 24 hour 10% of the pool is shared among top 5 sponsors in volume with 40%, 20%, 15%, 15% and 10%.
                            <hr />


                            Minimum deposit limit 100 TRX
                            <hr /><hr />

                            IMPORTANT NOTES*
                            <hr />
                            *TRONEX SUN is a community-based project, 100% decentralized, P2P transactions through Smart Contract.
                            <hr />
                            *Each Deposit Cycle is 320%.
                            <hr />
                            *When 320% is received, a new deposit must be made to continue earning / receiving from any of the 4 ways.
                            <hr />
                            *Minimum entry is 100 TRX, open to all participants, no restrictions.
                            <hr />
                            *No referrals required in order to receive. 1.1% to 5.0% pays out daily to all members, 100% passive.
                            <hr />
                            *Increase the speed of your returns by growing the community fund through marketing / sharing of TRONEX SUN.
                            <hr />
                            *Admin and Dev team is developing and deploying multiple services wihin DEFI, marketing, Online gaming, Crypto Debit card, Unified Tech Service and much more to complete the vision of a complete decentralized finanial support system<hr />
                            <a href={url} style={{ color: "red", textDecoration: "underline" }} >Back</a>
                        </p>

                    </div>
                </div >
            </div >
        );
    }
}
export default PlanText;
