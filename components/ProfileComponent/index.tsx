import { ChatIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import Username from "../Username";

const ProileComponent: NextPage = () => {
  const [user] = useAuthState(auth);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    // @ts-ignore
    const query = collection(db, "users", user.uid, "badges");
    const unsubscribe = onSnapshot(query, (snapshot) => {
      setUserBadges(
        // @ts-ignore
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <section className="mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center  text-lg font-semibold space-x-3">
        <div className="flex flex-col md:flex-row items-center justify-center space-x-3">
         <div className="flex items-center space-x-1">
      <div>
        {auth.currentUser ? (
          <div className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#00cc00] text-[#00CC00]" />
        ) : (
          <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
        )}
      </div>

      <div
        className="text-sm 
          md:text-md xl:text-xl">
        <h2>{user?.displayName}</h2>
      </div>
    </div>
          <div>
            <h2
              className="text-sm 
          md:text-md xl:text-xl">
               ({user?.email})
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-center mx-auto">
          {userBadges.map((badge: any) => {
            return (
              <div className="flex items-center justify-center ">
                <img
                  className="h-24 w-24"
                  src={`/badges/${badge.name}.png`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center text-center text-sm md:text-md  flex-col font-normal justify-center ">
        <h2>42</h2>
        <h2>Forum posts</h2>
      </div>

      <div className="flex justify-center items-center mt-4 ">
        <div className="transition cursor-pointer p-1 border border-1 border-black">
          <ThumbUpIcon className="h-7" />
        </div>

        <div
          className="transition  cursor-pointer
        p-1 border border-1 border-black
        ">
          <ChatIcon className="h-7" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mx-4 md:mx-20">
          <div>
            <h2 className="text-sm md:text-lg font-semibold mt-10  ">
              Recent forum posts
            </h2>
          </div>
          <div></div>
        </div>

        <div className="mt-4 flex items-center justify-between md:mx-20 mx-4 space-x-2 text-sm md:text-lg md:font-semibold border border-1 border-black p-3">
          <div className="flex flex-col justify-center">
            <div className="text-[#3a6aff]">
              <h2>Off-Topic Discussion - ice creams are the best (#1)</h2>
            </div>
            <div>
              <h2>nah strawberry ice-cream solos fr</h2>
            </div>
          </div>

          <div className="">
            <div>
              <h2>2 months ago</h2>
            </div>
            <div className="text-[#3a6aff]">
              <Username />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProileComponent;
