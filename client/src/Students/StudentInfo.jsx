import React from 'react';

function StudentInfo({name, school, supervisor}) {
    return (
        <div>
            {name}
            <br />
            <br />
            {school}
            <br />
            <br />
            {supervisor}
            <br />
            <br />
        </div>
    );
}

export default StudentInfo;
