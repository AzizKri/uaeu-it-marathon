import React from 'react';
import "./studentinfo.css";

function StudentInfo({ title, name, school, team, supervisor }) {
    return (
        <div className="container">
            <div className="padding">
                <div className="font">
                    <div className="top">
                        <img src="/download.png" alt='student'/>
                    </div>
                    <div className="bottom">
                        <p>{title}</p>
                        <p className="desi">IT Marathon</p>
                        <div className="barcode">
                            <img src="/logo256.png" alt='qr code'/>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div className="back">
                <h1 className="Details">Information</h1>
                <hr className="hr" />
                <div className="details-info">
                    <p><b className="name-field">Name: </b></p>
                    <p className="name">{name}</p>
                    <p className="school-field"><b>School:</b></p>
                    <p className="school">{school}</p>
                    <p className="supervisor-field"><b>Team: </b></p>
                    <p className="supervisor">{team}</p>
                    <p className="supervisor-field"><b>Supervisor: </b></p>
                    <p className="supervisor">{(supervisor)? supervisor : ""}</p>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default StudentInfo;
