import { signOut } from "next-auth/react";
import Link from "next/link";

import { INavbar } from "../interface/interface";

const Navbar = ({ currentUserId }: INavbar) => {
  return (
    <div className="navbar bg-base-300 fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={`/dashboard/profile/${currentUserId}`}>
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/dashboard/home">
          <a className="btn btn-ghost normal-case text-xl">NAME</a>
        </Link>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-primary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
