// Modules
import React from 'react';

// Components
import UserTable from '../../Components/UserTable';

// Styles
import './_style.scss';

const MainPage = () => {
    return (
        <div className="main">
             <h1 className="main__header1">Users Table</h1>
            <UserTable />
        </div>
    );
};

export default MainPage;
