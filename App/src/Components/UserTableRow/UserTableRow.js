// Modules
import React, {memo} from 'react';
import PropTypes from 'prop-types';

// Styles
import './_style.scss';

const UserTableRow = ({
    loading,
    userAvatarSrc,
    userCompanyStartDate,
    userCompanyDepartment,
    userCompanyName,
    userEmail,
    userFirsName,
    userID,
    userLastName,
}) => {

    if(loading){
        return <tr><th>Loading...</th></tr>
    }

    return (
        <tr className="row table__r">
            <td className="row__d">
                <img src={userAvatarSrc} style={{width:35}} alt="avatar" className="table__img"/>
            </td>
            <td className="row__d">{userID}</td>
            <td className="row__d">{userFirsName}</td>
            <td className="row__d">{userLastName}</td>
            <td className="row__d table__email">{userEmail}</td>
            <td className="row__d">{userCompanyName}</td>
            <td className="row__d">{userCompanyDepartment}</td>
            <td className="row__d">{userCompanyStartDate}</td>
        </tr>
    );
};

UserTableRow.propTypes = {
    loading: PropTypes.string,
    userAvatarSrc: PropTypes.string,
    userCompanyStartDate: PropTypes.string,
    userCompanyDepartment: PropTypes.string,
    userCompanyName: PropTypes.string,
    userEmail: PropTypes.string,
    userFirsName: PropTypes.string,
    userLastName: PropTypes.string,
    userID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
  };

export default memo(UserTableRow);
