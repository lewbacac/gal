// Modules
import React, {memo, useState, useEffect, useCallback} from 'react';
import axios from 'axios';

// Api
import {API} from '../../Api/Endpoints';

// Components
import Button from '../Button';
import UserTableRow from '../UserTableRow';
import Pagination from '../Pagination';
import Search from '../Search/Search';
import Select from '../Select';

// Styles
import './_style.scss';

const UserTable = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(3);
    const [value, setValue] = useState('');

    const lastUserIndex = currentPage * userPerPage;
    const firstUserIndex = lastUserIndex - userPerPage;
    const filteredUsers = filterUsers();
    const currentUsers = findCurrentUsersBasedOnFilteredUsers();
    const nPages = Math.ceil(filteredUsers.length / userPerPage);

    const optionsList = [
        {value: "1", label: '--- 1 ---'},
        {value: "3", label: '--- 3 ---',},
        {value: "5", label: '--- 5 ---'},
        {value: users.length, label: '--- All ---'},
    ];

    useEffect(() => {
        (async () => {
          setLoading(true);
          await axios.get(API.users)
            .then((resp) => {
                const allUsers = resp.data;
                setUsers(allUsers);
                setLoading(false);
            })
            .catch(() => {
                alert('There was an error while retrieving the data');
            });
        })();
    }, [setUsers]);

    function filterUsers() {
        if (value.length === 0) {
            return users;
        }
        return users.filter((user) => {
           return user.firstName.toLowerCase().includes(value.toLowerCase());
       });
    }

    function findCurrentUsersBasedOnFilteredUsers() {
        if (value.length === 0) {
            return filteredUsers.slice(firstUserIndex, lastUserIndex);
        }
        var localCurrentUsers = filteredUsers.filter((user) => {
            return user.firstName.toLowerCase().includes(value.toLowerCase());
        });
        return localCurrentUsers.slice(firstUserIndex, lastUserIndex);
    }

    const filtredSearchUsers = findCurrentUsersBasedOnFilteredUsers();

    const recalculateCurrentPage = () => {
        if(nPages < currentPage && value.length != 0) {
            setCurrentPage(1);
        }
    }

    const handlePagination = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        recalculateCurrentPage();
    }, []);

    const handleNextPage = () => {
        if(currentPage !== nPages){
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
        }
    };

    const handleChange = useCallback((event) => {
        setUserPerPage(event.value);
    }, []);

    return (
        <div className="user__container">
            <form className="user__panel">
                <Search id="search" value={value} id="search" onChange={(e) => {setValue(e.target.value)}}/>
                <div className="user__pagination">
                    <Pagination userPerPage={userPerPage} totalUsers={filteredUsers.length} handlePagination={handlePagination}/>
                    <div className="user__button">
                        <Button children="&#5176;" onClick={handlePrevPage} disabled={!!(currentPage == 1)}/>
                        <Button children="&#5171;" onClick={handleNextPage} disabled={!!(currentPage == nPages)}/>
                    </div>
                </div>
                <div className="user__select__container">
                  <Select onChange={handleChange} name="count" id="count-page" defaultValue="3" isSelected="3" className="user__select" optionsList={optionsList}
                  />
                </div>
            </form>
            <div className="user__table__container">
                <table className="user__table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Department</th>
                            <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtredSearchUsers?.map(user => {
                            return(
                                <UserTableRow
                                    users={currentUsers}
                                    key={`key-${user.id}`}
                                    userAvatarSrc={`http://apis.chromeye.com:9191${user.avatar.url}`}
                                    userID={user.id}
                                    userFirsName={user.firstName}
                                    userLastName={user.lastName}
                                    userEmail={user.email}
                                    userCompanyName={user.company.name}
                                    userCompanyDepartment={user.company.department}
                                    userCompanyStartDate={user.company.startDate}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default memo(UserTable);
