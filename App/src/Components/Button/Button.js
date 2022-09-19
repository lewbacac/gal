// Modules
import React from 'react';
import PropTypes from 'prop-types';

// Style
import './_style.scss';

const Button = (props) => {
    const { children, onClick, disabled } = props;

    return (
        <button onClick={onClick} disabled={disabled} className={`button ${disabled && 'disabled'}`}>
            {children}
        </button>
    );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  children: "",
  disabled: false,
  onClick: () => {},
};

export default Button;
