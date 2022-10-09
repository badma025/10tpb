import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import Login from "../components/Login";

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("https://10tpb.vercel.app/portal");
  }, []);

  return (
    <div
      className="
bg-[#282828] flex items-center justify-center h-screen text-yellow-500 text-lg md:text-xl font-semibold ">
      <div className=" ">
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default Home;
