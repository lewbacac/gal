// Modules
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './_style.scss';

const Search = ({id, name, labelText, placeholder, type, ...attrs}) => {
    return (
        <div className="search">
            { labelText &&
                <label htmlFor={id}>{labelText}</label>
            }
            <input
                className="search_input"
                name={id}
                id={id}
                placeholder="Enter Keyword"
                type="text"
                {...attrs}
            />
        </div>
    );
}

Search.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    labelText: PropTypes.string,
}
Search.defaultProps = {
    placeholder: "Enter Keyword",
    type: "text",
    labelText: "",
}

export default Search;
