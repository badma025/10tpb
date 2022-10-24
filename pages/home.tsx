import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const router = useRouter()
 

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("https://10tpb.vercel.app/portal");
    }
  }, []);


  return (
    <div
      className="min-h-screen
bg-[#282828] text-[#fa7a00]">
      <Head>
        <title>10TPB / Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-Poppins  mx-auto  max-w-[1500px]  ">
        <Header />
        <div className="flex justify-center mt-10 text-lg">
          The Latest From 10 Throwley
        </div>

      </main>
    </div>
  );
};

export default HomePage;
