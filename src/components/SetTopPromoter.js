import React, { Component } from 'react'
import Utils from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/bootstrap.css";

toast.configure();

export class SetTopPromoter extends Component {

    constructor(props) {
        super(props)


        this.setTop = this.setTop.bind(this);

    }

    async setTop(refid) {
        await Utils.contract
            .setTopPromoterStatus(refid)
            .send({
                from: this.props.account,

            }).then(res => toast.success(' Top Promoter Status changed', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            ).then(res => {
                setInterval(() => {
                    window.location = "/";
                }, 2000);
            }).catch(err => toast.error("Insufficient Balance or Transaction Declined"));
    }



    render() {

        const colStyle = {
            opacity: "80%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };


        const investButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginTop: "30px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to right, #FFDD00, #FBB034)", fontSize: "18px", borderRadius: "30px", marginLeft: "150px"
        };

        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>


                        <div className="col-xl-12" style={{ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#1AE865", textAlign: "center", fontWeight: "bold", fontSize: "21px" }}>
                            Change Status</div>
                        <br />
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const refid = this.props.userid;

                                this.setTop(refid);



                            }}

                        >
                            <p style={{ color: "white" }} >{this.props.top_promoter ? "I am a top leader" : "Ohhh, I am not a top leader|"}</p>

                            <button type="submit" className="btn btn-success" style={investButton}>Change</button>


                        </form>


                    </div>

                    <div className="col-xl-4"></div>
                </div>

            </div>
        )
    }
}

export default SetTopPromoter
