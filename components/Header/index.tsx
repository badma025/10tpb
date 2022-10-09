import { NextPage } from "next";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Header: NextPage = () => {
  return (
    <section className="pt-6">
      <nav className="lg:hidden">
        <Sidebar />
      </nav>

      <nav className="hidden lg:block">
        <Navbar />
      </nav>
    </section>
  );
};

export default Header;
