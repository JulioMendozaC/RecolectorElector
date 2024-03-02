import {Navigate, Outlet} from "react-router";

import {useAuth} from "./context/authContext";

function ProtectedRoute() {
  const {isloading, isAutenticated} = useAuth();


  if (isloading) return <h2>Loading....</h2>;
  
  if (!isloading && !isAutenticated) return <Navigate to="/Login" remplace />;

  return (
   <>
    <Outlet />
   </>
  )
}

export default ProtectedRoute;
