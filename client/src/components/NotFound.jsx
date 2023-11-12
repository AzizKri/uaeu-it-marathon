import React from 'react';

function NotFound({ type }) {
    return (
        <div className="not_found">
            <h1>{(type) ? type : "Page"} not found</h1>
            <div className='Powered'>
                <p><b>Powered by</b></p>
                <img src="/cs.png" alt='CS Club' />
            </div>
        </div>
    );
}

export default NotFound;
