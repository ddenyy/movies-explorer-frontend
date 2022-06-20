import React from "react";
import {Route, Redirect} from "react-router-dom";

const AuthRoute = ({component: Component, ...props}) => {
    return (
        <Route>
            {
                () => props.autorized === true ?  <Redirect to="/movies" /> : <Component {...props}/>
            }
        </Route>
    );
}

export default AuthRoute;