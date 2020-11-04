import React, { Component } from 'react'
import loader from "./img/loadicon1.gif"

const contract_address = 'TM5uShsLgdvTX9JXvwnEgY3zWsCqDWxjNw';

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
            backgroundImage: "linear-gradient(to right,  #131050, black)", opacity: "70%", marginTop: "60px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
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
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.next_draw_time} s</p>

                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Pool Balance</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> {this.props.pool_balance} TRX</p>

                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>  Total Users</p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> # {this.props.totalUsers}  </p>
                            <br /><br />



                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default SmartInfo
