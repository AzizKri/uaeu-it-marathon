import React from 'react';
import "./teaminfo.css";

function TeamInfo({ team_id, team, school, supervisor, students }) {
    return (
		<div>
			<div className="team_container">
				<div className="team_padding">
					<div className="team_font">
						<div className="team_top">
							<h1 className="team_Details">ID: {team_id}</h1>
							<hr /> 
						</div>
						<div className="team_bottom">
							<p>Team:</p>
							<p className="team_info">{team}</p>
							<br></br>
							<p>School:</p>
							<p className="team_info">{school}</p>
							<br></br>
							<p>Supervisor:</p>
							<p className="team_info">{supervisor}</p>
							<br></br>
						</div>
					</div>
				</div>
				<div className="team_back">
					<h1 className="team_Details">Students</h1>
					<hr className="team_hr"/>
					<div className="team_details-info">
						<p className="team_name-field">{students[0]}</p>
						<p className="team_name-field">
						<hr className='team_student-separator'/>{students[1]}</p>
						{(students[2] !== undefined && students[2].length >= 2)?
						<p className="team_name-field">
						<hr className='team_student-separator'/>
						{students[2]}</p> :
						<></>}
						{(students[3] !== undefined && students[3].length >= 2)?
						<p className="team_name-field">
						<hr className='team_student-separator'/>
						{students[3]}</p> :
						<></>}
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
