// "use client";

// import { useDispatch } from "react-redux";
// import { logout } from "@/features/auth/authSlice";
// import { useRouter } from "next/navigation";
// import "./navbar.css";

// function Navbar({ onCartClick }) {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/login");
//   };

//   return (
//     <div className="navbar">
//       <h1>My Store</h1>
//       <div className="navbar-buttons">
//         <button  aria-label="Open cart" onClick={()=> router.push("/cart")}>Cart</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;









"use client";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import "./navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  //  check if user is logged in
  //const isLoggedIn =
  //  typeof document !== "undefined" &&
    //document.cookie.includes("token");

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    // clear cookie via API
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="navbar">
      <h1 onClick={() => router.push("/")}>My Store</h1>

      <div className="navbar-buttons">
        {isLoggedIn ? (
          <>
            <button onClick={() => router.push("/cart")}>Cart</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/login")}>Login</button>
            <button onClick={() => router.push("/signup")}>Signup</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;






