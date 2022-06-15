import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectRoute = ({component: Component, ...props}) => {
    return (
        <Route>
            {
                () => props.autorized === true ? <Component {...props}/> : <Redirect to="/signin" />
            }
        </Route>
    );
}

export default ProtectRoute;