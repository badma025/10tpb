import Image from "next/image";
import React, { useState } from "react";
import SmallLogo from "../SmallLogo";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const links: string[] = ["Profile", "Login", "Resources", "Donate", "Badges"];
  return (
    <nav className="flex items-center justify-between px-0.5 py-0.5 mx-5 rounded-2xl border border-1 border-black">
      <div className="">
        <SmallLogo />
      </div>

      {showSidebar ? (
        <HiX
          className="fixed right-10 top-6 z-50 flex h-14 cursor-pointer items-center text-4xl  active:-rotate-45"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      ) : (
        <HiMenu
          onClick={() => setShowSidebar(!showSidebar)}
          size={45}
          className="mt-5 mr-6 mb-2 transition duration-300 active:rotate-45"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-60  h-full w-full bg-[#282828] pt-5 pl-10  duration-300 ease-in-out  ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}>
        <Link href={`/suggestions`}>
          <section>
            <h3
              className={`mt-4 inline-block cursor-pointer text-lg font-semibold transition duration-300 ease-in-out hover:scale-110`}>
              Suggestions
            </h3>
          </section>
        </Link>

        <Link href="/">
          <section>
            <h3
              className={`mt-4 inline-block cursor-pointer text-lg font-semibold transition duration-300 ease-in-out hover:scale-110`}>
              Login
            </h3>
          </section>
        </Link>

        <Link href="/">
          <section>
            <h3
              className={`mt-4 inline-block cursor-pointer text-lg font-semibold transition duration-300 ease-in-out hover:scale-110`}>
              Profile
            </h3>
          </section>
        </Link>

        <Link href="/">
          <section>
            <h3
              className={`mt-4 inline-block cursor-pointer text-lg font-semibold transition duration-300 ease-in-out hover:scale-110`}>
              Donate
            </h3>
          </section>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
