import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/back.png"
import TronWeb from 'tronweb';
import Utils from '../utils';
import PersonalStats2 from "./PersonalStats2";

import TeamBiz from "./TeamBiz";

import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

let url = "https://hardcore-newton-af71f6.netlify.app/";
// '
let contract_address = 'TU3TJN9fKVqHTg8wTu1wedCgWdFYXGUTKK';

toast.configure();


class TopPage2 extends Component {

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
                if (tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

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
            toast.error("Tron blockchain support not enabled, Try using Token Pocket/ Tron Wallet for Mobile OR Tron Link chrome extension for PC");
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

        const dailyRate = await Utils.contract.getContractPlusBaseRate().call();
        this.setState({ dailyRate: (Number(dailyRate) / 100).toFixed(2) });

        await Utils.contract.getAdmin().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        })

        if (this.props.refLinkid) {
            this.setState({ account: this.props.refLinkid });
        }

        // // console.log("refid " + this.state.refid);

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
        this.setState({ totalInvested: this.state.totalInvested });

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
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", marginTop: "-30px"
        };
        // backgroundImage: `url(${back})`, backgroundColor: "blue",

        return (
            <div>
                <div>
                    <p></p>
                </div>
                <div style={backStyle}>
                    <div style={{ textAlign: "center", paddingTop: "40px" }}>
                        <a href={url} >  <img src={require("./Image1/logo.png")} alt="Logo" width="600px" /></a>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>

                    <TeamBiz
                        teambiz={this.state.teambiz}
                    />
                    <PersonalStats2
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
                        userTotalWithdrawn={this.state.userTotalWithdrawn}
                        deposit_amount={this.state.deposit_amount}

                    />


                    <div style={{ paddingBottom: "30px" }}></div>
                </div>
            </div >
        );
    }
}
export default TopPage2;
