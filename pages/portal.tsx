import type { NextPage } from "next";
import Head from "next/head";
import { isLoadingState } from "../atoms/atoms";
import Header from "../components/Header";
import Login from "../components/Login";
import {useRecoilState} from "recoil"

const Portal: NextPage = () => {
  return (
    <div
      className="min-h-screen
bg-[#282828] text-[#fa7a00]">
      <Head>
        <title>10TPB / Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-Poppins  mx-auto  max-w-[1500px]  ">
        <Header />
        <Login />
      </main>
    </div>
  );
};

export default Portal;
