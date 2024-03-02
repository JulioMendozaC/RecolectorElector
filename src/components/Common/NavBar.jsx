import {Link} from "react-router-dom";


function NavBar() {
  return (
    <nav className="bg-background  flex justify-between py-5 px-10">
    {/* <Link to={
      isAuthenticated ? '/tasks' : '/'
    }>
    </Link> */}
        <h1 className="text-2xl font-bold text-white">Captura de datos</h1>

      <>
        <ul className="flex gap-x-2">
          {/* <li>Welcome {user.username}</li> */}
          <li>
            {/* <Link to="/task/new">Create task</Link> */}
          </li>
          <li>
            {/* <Link
              className="bg-indigo-500 px-4 py-1 rounded-sm"
              to="/"
              onClick={() => {
                // logout();
              }}
            >
              Logout
            </Link> */}
          </li>
        </ul>
      </>
  
  </nav>


  );
}

export default NavBar;
