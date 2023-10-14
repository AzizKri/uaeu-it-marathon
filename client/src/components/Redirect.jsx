import React from 'react';
import { Helmet } from 'react-helmet';

const Redirect = ({ Link }) => {
  return (
    <div className='redirect'>
        <Helmet>
            <meta http-equiv="Refresh" content={"0; url=" + Link} />
        </Helmet>
        <div className='redirect_text'>
          <h1>Redirecting...</h1>
          <div className='Powered'>
              <p><b>Powered by</b></p>
              <img src="/cs.png" alt='CS Club'/>
          </div>
        </div>
    </div>
  )
}

export default Redirect