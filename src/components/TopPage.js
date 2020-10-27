import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/back.jpg"
import TronWeb from 'tronweb';
import Utils from '../utils';
import Banner from "./Banner";
import Invest from "./Invest";
import SmartInfo from "./SmartInfo";
import PersonalStats from "./PersonalStats";
import MyPresentStaking from "./MyPresentStaking";
import MyStakingInfo from "./MyStakingInfo";
import TeamBiz from "./TeamBiz";
import ReferralLink from "./ReferralLink";
import Withdraw from "./Withdraw";

import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

let url = "https://hardcore-newton-af71f6.netlify.app/";
// '
let contract_address = 'TDUye4UkDZ56MtWe2ZbPMaAQDANY7LgxEC';

// let tronContracturl = "https://tronscan.org/#/contract/" + contract_address;
// let tronAddressurl = "https://tronscan.org/#/address/";

toast.configure();

class TopPage extends Component {

    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();

    }

    connectTronWeb = async () => {
        await new Promise(resolve => {
            const tronWebState = {
                installed: window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (tronWebState.installed) {
                this.setState({
                    tronWeb:
                        tronWebState
                });
                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if (tries >= 20) { //310
                    // const TRONGRID_API = 'https://api.trongrid.io';
                    const TRONGRID_API = 'https://3.225.171.164';
                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if (!this.state.tronWeb.installed) {
            toast.error("Tron blockchain support not enabled, Try using Token Pocket/ Tron Wallet/ Tron Link Pro for Mobile OR Tron Link chrome extension for PC");
        }



        if (!this.state.tronWeb.loggedIn) {
            window.tronWeb.on('addressChanged', () => {
                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }


        await Utils.setTronWeb(window.tronWeb);
    }

    loadBlockChainData = async () => {

        // Global Stats
        const sunny = 1000000;
        var extra_biz = 0;


        await Utils.contract.getAdmin().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        })

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });

        } else {
            this.setState({ refid: this.state.owner });
        }

        console.log("owner " + this.state.owner);
        this.setState({ refLoading: false });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
        // this.setState({ account: this.state.refid });
        this.setState({ walletload: false });


        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: contractBalance / sunny });

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });
        this.setState({ totalInvested: this.state.totalInvested + extra_biz });

        const totalWithdrawn = await Utils.contract.total_withdraw().call();
        this.setState({ totalWithdrawn: Number(totalWithdrawn) / sunny });


        let subAccountstr = this.state.account.toString();
        let subAccount = subAccountstr.substring(0, 8);
        this.setState({ subAccount });

        let contractStr = contract_address.toString();
        let subContract = contractStr.substring(0, 8);
        this.setState({ subContract });

        const userInfoTotals = await Utils.contract.userInfoTotals(this.state.account).call();

        this.setState({ userTotalDeposit: Number(userInfoTotals.total_deposits) / sunny });
        this.setState({ referrals_count: Number(userInfoTotals.referrals) });
        this.setState({ userTotalWithdrawn: Number(userInfoTotals.total_payouts) / sunny });
        this.setState({ total_structure: Number(userInfoTotals.total_structure) });
        this.setState({ teambiz: Number(userInfoTotals.team_biz) / sunny });
        this.setState({ deposit_payouts: Number(userInfoTotals.deposit_payouts) / sunny });

        /////////////////////////////////////////////////////////////////////////////
        const userInfo = await Utils.contract.userInfo(this.state.account).call();
        // console.log(userInfo);

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) });

        this.setState({ direct_bonus: Number(userInfo.direct_bonus) / sunny });
        this.setState({ gen_bonus: Number(userInfo.gen_bonus) / sunny });
        this.setState({ deposit_amount: Number(userInfo.deposit_amount) / sunny });
        this.setState({ payouts: Number(userInfo.payouts) / sunny });
        this.setState({ deposit_time: Number(userInfo.deposit_time) });
        this.setState({ user_status: Number(userInfo.user_status) });

        const CONTRACT_BALANCE_STEP = await Utils.contract.CONTRACT_BALANCE_STEP().call();
        this.setState({ contract_step: Number(CONTRACT_BALANCE_STEP) / sunny });

        const PERCENTS_DIVIDER = await Utils.contract.PERCENTS_DIVIDER().call();
        this.setState({ percent_divider: Number(PERCENTS_DIVIDER) });

        const time_step = await Utils.contract.TIME_STEP().call();
        this.setState({ time_step: Number(time_step) });

        // const now = await Utils.contract.getNow().call();
        // this.setState({ now: Number(now) });

        console.log('time step ' + this.state.time_step);

        const contract_bonus = await Utils.contract.getContractBonus().call();
        this.setState({ contract_bonus: Number(contract_bonus / 100).toFixed(2) });

        const avlBalance = await Utils.contract.getUserBalance(this.state.account).call();
        this.setState({ avlBalance: Number(Number(avlBalance) / sunny).toFixed(5) });
        console.log(this.state.avlBalance)

        const dividend = await Utils.contract.getUserDividends(this.state.account).call();
        this.setState({ dividend: Number(Number(dividend) / sunny).toFixed(5) });
        console.log('dividend ' + this.state.dividend)


        const totalRate = await Utils.contract.getRate().call();
        this.setState({ totalRate: (Number(totalRate) / 100).toFixed(2) });

        console.log('contract - ' + this.state.upline);
        // console.log('account - ' + this.state.account);
        // console.log('owner - ' + this.state.owner);
        console.log('link refid - ' + this.state.refid);


    }

    constructor(props) {
        super(props)

        this.state = {

            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestmentLoad: true,
            playerStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,
            contract_bonus: 0,
            hold_bonus: 0,
            totalBiz: 0,
            directBiz: 0,
            balance: 0,
            refFlag: 0,
            totalInvested: 0,

            lastDepositTime: 0,
            depositCount: 0,

            copySuccess1: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }

    }

    render() {

        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", marginTop: "-30px", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        };
        // backgroundImage: `url(${back})`, backgroundColor: "blue",

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
                    <div style={{ textAlign: "center", paddingTop: "40px" }}>
                        <a href={url} >  <img src={require("./Image1/logo.png")} alt="Logo" width="600px" /></a>

                    </div>

                    <Banner />

                    {this.state.user_status === 0 ?
                        <Invest
                            refLoading={this.state.refLoading}
                            refid={this.state.refid}
                            deposit_amount={this.state.deposit_amount}
                            balance={this.state.balance}
                            invest={this.invest}
                            reinvest={this.reinvest}
                        />
                        : null
                    }

                    <SmartInfo
                        smartLoading={this.state.smartLoading}
                        totalInvested={this.state.totalInvested}
                        contractBalance={this.state.contractBalance}
                        totalWithdrawn={this.state.totalWithdrawn}
                        subContract={this.state.subContract}
                        totalDepositCount={this.state.totalDepositCount}
                        totalUsers={this.state.totalUsers}
                    />
                    {this.state.userTotalDeposit > 0 ?
                        <MyPresentStaking
                            totalRate={this.state.totalRate}
                        /> : null}

                    {this.state.userTotalDeposit > 0 ?
                        <ReferralLink
                            account={this.state.account}
                        /> : null}
                    {this.state.userTotalDeposit > 0 ?
                        <MyStakingInfo
                            contract_bonus={this.state.contract_bonus}
                            hold_bonus={this.state.hold_bonus}
                            totalRate={this.state.totalRate}

                        /> : null}

                    {this.state.userTotalDeposit > 0 ?
                        <TeamBiz

                            teambiz={this.state.teambiz}

                        /> : null}
                    {this.state.userTotalDeposit > 0 ?
                        <PersonalStats
                            user_status={this.state.user_status}
                            account={this.state.account}
                            subAccount={this.state.subAccount}
                            upline={this.state.upline}
                            subUpline={this.state.subUpline}
                            userTotalDeposit={this.state.userTotalDeposit}
                            avlBalance={this.state.avlBalance}
                            dividend={this.state.dividend}
                            direct_bonus={this.state.direct_bonus}
                            gen_bonus={this.state.gen_bonus}
                            userTotalWithdrawn={this.state.payouts}
                            deposit_amount={this.state.deposit_amount}
                            deposit_payouts={this.state.deposit_payouts}

                        /> : null}

                    {this.state.user_status !== 0 && this.state.deposit_amount > 0 ?
                        <Withdraw
                            avlBalance={this.state.avlBalance}
                        /> : null}

                    <div style={{ paddingBottom: "20px" }}></div>

                    {/* <div className="row" >
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://t.me/abcd"   >  <img src={require("./Image1/official.png")} alt="Logo" width="200px" /></a>
                        </div>
                        <div className="col-xl-6" style={{ textAlign: "center", paddingTop: "20px" }}   >
                            <a href="https://t.me/abcd"   > <img src={require("./Image1/support.png")} alt="Logo" width="200px" /></a>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-xl-4" style={{ textAlign: "center" }}  >
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center", paddingTop: "20px" }}  >
                            <a href="https://tronexsun.io"   >
                                <img src={require("./Image1/refresh.png")} alt="Logo" width="170px" /></a>
                        </div>
                        <div className="col-xl-4" style={{ textAlign: "center" }}   >
                        </div>

                    </div> */}

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopPage;
