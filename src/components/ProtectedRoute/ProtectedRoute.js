import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectRoute = ({component: Component, ...props}) => {
    return (
        <Route>
            {
                () => props.loggedIn === true ? <Component {...props}/> : <Redirect to="./singin" />
            }
        </Route>
    );
}

export default ProtectRoute;