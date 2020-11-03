import React, { Component } from 'react'

class Banner extends Component {

    render() {

        const colStyle = {
            opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee"
        };

        return (

            <div style={{ paddingTop: "10px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>
                        <br />


                        <div style={{ color: "white", fontSize: "17px", fontFamily: "MyFont", textAlign: "left", fontWeight: "bold" }}>
                            <br /><span style={{ color: "yellow", fontSize: "24px" }}>1.10 %</span> Daily Base Returns<br />
                            <br /><span style={{ color: "yellow", fontSize: "24px" }}>0.02 %</span> Contract Bonus (Every 1m TRX till 50m TRX)<br />
                            <br /><span style={{ color: "yellow", fontSize: "24px" }}>0.01 %</span> Contract Bonus (after 50m TRX)<br />
                            <br /><span style={{ color: "yellow", fontSize: "24px" }}>10 %</span> Affiliate Bonus  <br />
                            <br /><span style={{ color: "yellow", fontSize: "24px" }}>75 %</span> Generation Bonus on Dividends  <br />
                            <br />Total Receivable - <span style={{ color: "yellow", fontSize: "24px" }}>320 %</span> <br />
                        </div>
                        <br />


                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >

        )
    }
}

export default Banner
