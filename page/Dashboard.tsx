import {Outlet} from "react-router";

const Dashboard = () => {
    return (
        <div>
            this is dashboard component
            <Outlet/>
        </div>
    );
};

export default Dashboard;