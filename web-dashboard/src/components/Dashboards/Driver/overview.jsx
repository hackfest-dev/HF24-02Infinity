import React from 'react';
import './overview.css';

const Overview = ({  totaldriver, totalcustomer, ongoingfleet }) => {
    return (
        <div className='overview-container'>

            <div className="overview">
                <div className="card">
                    {/* <IoIosPerson /> */}
                    <div className="card-content1">
                        <h3>Total Drivers</h3>
                        <p>3</p>
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
            <div className="charts">
            <div> Driver details</div>
            </div>
            <div className="contents-driver">
            </div>
            <div className="location-details">
                <div className='driver-details'>Driver details</div>
                <div className='locations'>Locations</div>
            </div>

        </div>
    );
}

export default Overview;
