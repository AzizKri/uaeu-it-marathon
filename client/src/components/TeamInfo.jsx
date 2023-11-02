import React from 'react';
import "./teaminfo.css";

function TeamInfo({ team_id, team, school, supervisor, students }) {
	console.log(students)
    return (
        <div>
            <div className="container">
                <div className="padding">
                    <div className="font">
                        <div className="top">
                            <img src="/download.png" alt='student'/>
                        </div>
                        <div className="bottom">
                            <p>{team}</p>
                            <p className="desi">IT Marathon</p>
                            <div className="barcode">
                                <img src="/logo256.png" alt='itm logo'/>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
                <div className="back">
                    <h1 className="Details">Information</h1>
                    <hr className="hr" />
                    <div className="details-info">
                        <p><b className="name-field">Team {team_id}</b></p>
                        <p className="school-field"><b>School:</b></p>
                        <p className="school">{school}</p>
                        <p className="supervisor-field"><b>Team: </b></p>
                        <p className="supervisor">{team}</p>
                        <p className="supervisor-field"><b>{(supervisor.length <= 2)? "" : "Supervisor: "}</b></p>
                        <p className="supervisor">{supervisor}</p>
                        <p className="student-field"><b>Students: </b></p>
                        <p className="student">{students[0]}</p>
                        <p className="student">{students[1]}</p>
						{(students[2] === undefined || students[2].length <= 2)? 
						<></> : <p className="student">{students[2]}</p>}
						{(students[3] === undefined || students[3].length <= 2)? 
						<></> : <p className="student">{students[3]}</p>}
						
                    </div>
                </div>
                <hr />
            </div>
            <div className='Info_Powered'>
                <p><b>Powered by</b></p>
                <img src="/cs.png" alt='CS Club'/>
            </div>
        </div>
    );
}

export default TeamInfo;
