import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

Loading.propTypes = {
    loading: PropTypes.bool
};

Loading.propTypes = {
    loading: false
};

function Loading(props) {
    const { loading } = props;


    return (
        <div>
            {loading === true &&
                <div class="dots-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
        </div>
    );
}

export default Loading;