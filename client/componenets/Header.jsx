// import React, { useContext } from "react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "./Usercontext";

// const Header = () => {
//  const {setUserInfo, userInfo} = useContext(UserContext)

//   useEffect(() => {
//     fetch("http://localhost:8080/profile", {
//       credentials: "include",
//     }).then((response) => response.json().then((userInfo) => {setUserInfo(userInfo);}));
//   }, []);

//   const logout = () => {
//     fetch("http://localhost:8080/logout", {
//       credentials: "include",
//       method:"POST",
//     })
//     setUserInfo(null);
//   };


//   const username = userInfo?.username;
  
//   return (
//     <div>
//       <header>
//         <Link to="/" className="logo">
//           BlogApp
//         </Link>
//         <nav>
//           {username && (
//             <>
//               <Link to="/create">Create new post</Link>
//               <a onClick={logout}>Logout</a>
//             </>
//           )}
//           {!username && (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Header;
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Usercontext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch profile");
        }
      })
      .then((userInfo) => setUserInfo(userInfo))
      .catch((error) => console.error(error));
  }, []);

  const logout = () => {
    fetch("http://localhost:8080/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          setUserInfo(null);
        } else {
          throw new Error("Failed to logout");
        }
      })
      .catch((error) => console.error(error));
  };

  const username = userInfo?.username;

  return (
    <div>
      <header>
        <Link to="/" className="logo">
          BlogApp
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;