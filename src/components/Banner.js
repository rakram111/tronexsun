import React, { Component } from 'react'

class Banner extends Component {

    render() {

        const colStyle = {
            opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee"
        };

        return (

            <div style={{ paddingTop: "30px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>
                        <br />


                        <div style={{ color: "white", fontSize: "23px", fontFamily: "MyFont", textAlign: "left", fontWeight: "bold" }}>
                            <br />1.2% Daily Standard Returns<br />
                            <br />0.02% Contract Bonus (Every 1m TRX till 50m TRX)<br />
                            <br />0.01% Contract Bonus (after 50m TRX)<br />
                            <br />8% Affiliate Bonus  <br />
                            <br />75% Generation Bonus on Dividends  <br />
                            <br />Total Receivable - 300% <br />
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
