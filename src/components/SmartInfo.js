import React, { Component } from 'react'
import loader from "./img/loadicon1.gif"

const contract_address = 'TTDQzaox2WFz4YwBwVgUBsv5H54nb9n72H';

let contracturl = "https://tronscan.org/#/contract/" + contract_address;

export class SmartInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

    }
    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right,  #131050, black)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };




        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Smart Contract</div>

                        <br />

                        <div className="col-xl-12" style={{ textAlign: "center" }}>
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Contract Address </p><p style={{ color: "white", fontSize: "17px", float: "right" }}>
                                {this.props.smartLoading ? <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} /> :
                                    <a href={contracturl} style={{ textDecoration: "underline", color: "white" }} target="_blank" rel="noopener noreferrer">{this.props.subContract}...</a>}
                            </p><br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Total Deposits </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.totalInvested} TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>  Total Paid</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.totalPaid}  TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Contract Balance</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.contractBalance} TRX</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Pool Draw in</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.draw_hrs}h {this.props.draw_mins}m {this.props.draw_secs}s</p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Pool Balance</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.pool_balance} TRX</p>

                            <br /><br />
                            {/* <p style={{ color: "white", fontSize: "17px", float: "left" }}>  Total Users</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> # {this.props.totalUsers > 0 ? Number(this.props.totalUsers) + 1 : 0}  </p>
                            <br /><br /> */}



                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default SmartInfo
