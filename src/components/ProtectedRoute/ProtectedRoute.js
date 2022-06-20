import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = ({ component: Component, ...props }) => {
  React.useEffect(() => { }, [props.autorized])
  return (
    <Route>
      {
        () => props.autorized == true ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
  );
}

export default ProtectRoute;
