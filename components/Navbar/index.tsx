import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsBell } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { auth } from "../../utils/firebase";
import BigLogo from "../BigLogo";

const Navbar = () => {
  const [user] = useAuthState(auth)
  const links = ["Profile", "Resources", "Donate", "Badges"];
  return (
    <header>
      <div className="flex items-center  justify-between mx-20 px-3 py-4 border-1 border border-black rounded-2xl">
        <div className="flex items-center space-x-7 text-lg justify-start">
          <div>
            <BigLogo />
          </div>

          {links.map((link: string) => {
            return (
              <div key={link}>
                <h3 className="cursor-pointer transition duration-300 ease-in-out hover:scale-110">
                  {link}
                </h3>
              </div>
            );
          })}

          <>
            <h3 className="cursor-pointer transition duration-300 ease-in-out hover:scale-110 text-white">
              Forums
            </h3>
          </>
        </div>

        <div className="space-x-4 cursor-pointer flex items-center justify-end">
          <div className="cursor-pointer">
            <HiSearch size={30} />
          </div>
          <div className="cursor-pointer">
            <BsBell size={30} />
          </div>

          <div className="text-lg font-semibold ">Login</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
