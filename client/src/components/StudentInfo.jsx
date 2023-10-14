import React from 'react';
import "./studentinfo.css";

function StudentInfo({ title, name, school, team, supervisor }) {
    return (
        <div class="container">
            <div class="padding">
                <div class="font">
                    <div class="top">
                        <img src="%PUBLIC_URL%/download.png" />
                    </div>
                    <div class="bottom">
                        <p>Student</p>
                        <p class="desi">IT Marathon</p>
                        <div class="barcode">
                            <img src="%PUBLIC_URL%/qrsample.png" />
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div class="back">
                <h1 class="Details">information</h1>
                <hr class="hr" />
                <div class="details-info">
                    <p><b class="name-field">Name : </b></p>
                    <p class="name">Mohammad</p>
                    <p class="supervisor-field"><b>Supervisor: </b></p>
                    <p class="supervisor">Ali</p>
                    <p class="school-field"><b>School:</b></p>
                    <p class="school">FLPS</p>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default StudentInfo;
