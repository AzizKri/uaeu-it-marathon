import React from 'react';

function StudentInfo({ title, name, school, team, supervisor }) {
    return (
        <div>
            Title: {title}
            <br />
            <br />
            Name: {name}
            <br />
            <br />
            School: {school}
            <br />
            <br />
            Team: {team}
            <br />
            <br />
            {(supervisor)? supervisor :""}
            <br />
            <br />
        </div>
    );
}

export default StudentInfo;
