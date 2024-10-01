
import React from 'react';
import '../../pages/loader/loader.css';

const Loader = () => {
    return (
        <div className="loader-overlay">
            {/* <div className="loader">
                <span className="loader__element"></span>
                <span className="loader__element"></span>
                <span className="loader__element"></span>
            </div> */}
              <div className="loader"></div>
        </div>
    );
}

export default Loader;