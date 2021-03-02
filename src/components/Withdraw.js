import React, { Component } from 'react'
import Utils from "../utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Withdraw extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }
        this.withdraw = this.withdraw.bind(this);

    }
    async withdraw() {
        // await Utils.contract
        //     .withdraw()
        //     .send({
        //         from: this.state.account,
        //     }).then(res => toast.success(' Wihdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })

        //     ).then(res => {
        //         setInterval(() => {
        //             window.location = "/";
        //         }, 3000);
        //     }).catch(err => toast.error("Something went wrong"));

        toast.info("Contract Balance has been drained due to repeated Withdrawals, We are working on a GOOD SOLUTION, Please have Patience");

    }

    render() {

        const colStyle = {
            backgroundImage: "radial-gradient(black, #131050 )", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee"
        };

        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginTop: "30px", marginLeft: "180px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to right, #FFDD00, #FBB034)", fontSize: "18px", borderRadius: "30px"
        };

        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>

                        <div className="col-xl-12" style={{ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Total Withdrawable Balance</div>
                        <br />


                        <div style={{ color: "white", fontSize: "29px", fontFamily: "MyFont", textAlign: "center" }}> {this.props.avlBalance} TRX</div>
                        <br />
                        <p style={{ textAlign: "center", color: "grey" }}> Have a Gas Fee ~ 20 TRX
                        </p>


                        <form
                            onSubmit={(event) => {

                                event.preventDefault();

                                this.withdraw();
                            }}

                        >


                            {this.props.refLoading ? null :
                                <button type="submit" className="btn btn-success" style={investButton}>Withdraw</button>}


                        </form>


                    </div>
                    <div className="col-xl-4"></div>

                </div>
                <div style={{ paddingBottom: "20px" }}></div>
            </div >

        )
    }
}

export default Withdraw
