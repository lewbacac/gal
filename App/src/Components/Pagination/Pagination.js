// Modules
import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Styles
import './_style.scss';

const Pagination = ({ handlePagination, totalUsers, userPerPage }) => {
    const pageNumbers = [];
    const [active, setActive] = useState(true);

    for(let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++){
        pageNumbers.push(i);
    }

    const pagination = pageNumbers.map((number) => {
        return (
            <a href="!#"
                onClick={() => {
                    handlePagination(number);
                    setActive(number)}
                }
                key={`page-${number}`}
                className={`pagination__link ${active == number && 'active'}`}
            >
                {number}
            </a>
        )
      });

    return (
        <div className="pagination">
            {pagination}
        </div>
    );
};

Pagination.propTypes = {
    handlePagination: PropTypes.func,
    totalUsers: PropTypes.number,
    userPerPage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default Pagination;
