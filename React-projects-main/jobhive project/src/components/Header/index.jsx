import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

Header.propTypes = {
    onPageChange: PropTypes.func
};

Header.defaultProps = {
    onPageChange: null
};

function Header(props) {
    const { onPageChange } = props;

    const handlePageChange = () => {
        if (!onPageChange) return;
        onPageChange();
    }

    return (
        <header>
            <span onClick={() => handlePageChange()}>Job</span>
            <span onClick={() => handlePageChange()}>Hive</span>
        </header>
    );
}

export default Header;