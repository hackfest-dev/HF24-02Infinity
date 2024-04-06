import React from 'react';
import './overview.css';
import LineChart from './Charts';

const Overview = ({ }) => {
    return (
        <div className='overview-container'>

            <div className="overview">
                <div className="card">
                    {/* <IoIosPerson /> */}
                    <div className="card-content1">
                        <h3>Total Drivers</h3>
                        {/* <p>{basicData.driversCount}</p> */}
                    </div>
                </div>
                <div className="card">
                    {/* <img alt={title} /> */}
                    <div className="card-content2">
                        <h3>Customers</h3>
                        <p>354</p>
                    </div>
                </div>
                <div className="card">
                    {/* <img alt={title} /> */}
                    <div className="card-content3">
                        <h3>On going Fleets</h3>
                        <p>5</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="overview">
                <div className="charts-line">
                    <LineChart />
                </div>
            </div>

        </div>
    );
}

export default Overview;
