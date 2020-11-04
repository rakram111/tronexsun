import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let addressTronScan = "https://tronscan.org/#/contract/";

toast.configure();

class TopSponsor extends Component {

    constructor(props) {
        super(props)

        this.withdraw = this.withdraw.bind(this);

    }
    async withdraw() {
        await Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Wihdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                window.location = "/";
            });


    }


    render() {

        const colStyle = {
            backgroundImage: "linear-gradient(to right, #131050, black)", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        return (
            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    {this.props.deps1 > 0 ?
                        <div className="col-xl-6" style={colStyle}>

                            <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                                Top Sponsor Stats</div>
                            <br />

                            <div className="col-xl-12" >


                                <p style={{ color: "white", fontSize: "17px", float: "left" }}>1. {this.props.deps1} TRX</p>
                                <a href={addressTronScan + this.props.addrs1} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                    {this.props.deps1 !== 0 ? this.props.subAddres1 : null}...</a>

                                <br /><br />

                                <p style={{ color: "white", fontSize: "17px", float: "left" }}>2. {this.props.deps2} TRX</p>
                                <a href={addressTronScan + this.props.addrs2} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                    {this.props.deps2 !== 0 ? this.props.subAddres2 : null}...</a>

                                <br /><br />

                                <p style={{ color: "white", fontSize: "17px", float: "left" }}>3. {this.props.deps3} TRX</p>
                                <a href={addressTronScan + this.props.addrs3} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                    {this.props.deps3 !== 0 ? this.props.subAddres3 : null}...</a>

                                <br /><br />

                                <p style={{ color: "white", fontSize: "17px", float: "left" }}>4. {this.props.deps4} TRX</p>
                                <a href={addressTronScan + this.props.addrs4} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                    {this.props.deps4 !== 0 ? this.props.subAddres4 : null}...</a>

                                <br /><br />

                                <p style={{ color: "white", fontSize: "17px", float: "left" }}>5. {this.props.deps5} TRX</p>
                                <a href={addressTronScan + this.props.addrs5} style={{ color: "white", fontSize: "17px", float: "right", textDecoration: "underline" }}>
                                    {this.props.deps5 !== 0 ? this.props.subAddres5 : null}...</a>

                                <br /><br />
                            </div>

                        </div>

                        : null}

                    <div className="col-xl-3"></div>
                </div>

            </div >

        )
    }
}

export default TopSponsor
