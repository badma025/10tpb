import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";

const Suggestions: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [suggestionInput, setSuggestionInput] = useState("");
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsCollectionRef = collection(db, "suggestions");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getSuggestions = async () => {
      const data = await getDocs(suggestionsCollectionRef);
      // @ts-ignore
      setSuggestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSuggestions();
  }, []);

  useEffect(() => {
    const query = collection(db, "suggestions");
    const unsubscribe = onSnapshot(query, (snapshot) => {
      setSuggestions(
        // @ts-ignore
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("https://10tpb.vercel.app/portal");
    }
  }, []);

  const handleSubmit = async () => {
    // Add a new document with a generated id.
    await addDoc(collection(db, "suggestions"), {
      suggestion: suggestionInput,
      likeCount: 0,
      dislikeCount: 0,
    });
    setSuggestionInput("");
  };

  return (
    <div
      className="min-h-screen
bg-[#282828] text-[#fa7a00]">
      <Head>
        <title>10TPB / Suggestions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-Poppins  mx-auto  max-w-[1500px]  ">
        <Header />
        <div>
          <div className="flex mt-10 text-lg xl:text-xl justify-center text-center font-semibold">
            <h2>Suggestions</h2>
          </div>
          <div className="text-center  flex justify-center mt-2 mx-auto text-sm ml-10 mr-10">
            <h2>
              Enter your suggestions below for this website (what should be on
              this page, what other pages should be created and what should be
              on them, links, etc.)
            </h2>
          </div>
        </div>

        <div className="mt-10">
          <label className="">
            <div
              className="border-2 border-[#fa7a00] flex items-center justify-center 
          
          space-x-3 max-w-[250px] mx-auto py-[8px] ">
              <div className="">
                <input
                  className=" bg-[#282828] outline-none  max-w-[250px] h-[35px] "
                  placeholder="Enter a suggestion..."
                  type="text"
                  value={suggestionInput}
                  onChange={(e) => setSuggestionInput(e.target.value)}
                />
              </div>
            </div>
          </label>
          <button
            disabled={!suggestionInput}
            // @ts-ignore
            onClick={() => handleSubmit()}
            className=" flex items-center justify-center mx-auto mt-6 py-3 px-5 transition duration-300 ease-in-out hover:scale-110 border rounded-xl 
         border-black">
            Add Suggestion
          </button>
        </div>

        <div className="mt-10 flex flex-col justify-center">
          <h2 className="text-lg font-semibold flex justify-center">
            Responses
          </h2>
          <div className="mt-4">
            {suggestions.map((suggestion: any) => {
              return (
                <section className="flex items-center flex-col my-6 space-y-2">
                  <div className="flex items-center text-xs md:text-lg justify-center ml-10 mr-10 max-w-2xl text-center text-[#3a6aff]">
                    <h2>{suggestion.suggestion}</h2>
                  </div>
                  <div className="flex items-center space-x-3 justify-center ml-10 mr-10">
                    <div className="flex items-center justify-center space-x-3">
                      <ThumbUpIcon
                        onClick={async () => {
                          await updateDoc(
                            doc(db, "suggestions", suggestion.id),
                            {
                              likeCount: suggestion.likeCount++,
                            }
                          );
                        }}
                        className="h-4 md:h-8 text-green-500 cursor-pointer "
                      />
                      <h4 className="text-sm">{suggestion.likeCount}</h4>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-sm">
                      <ThumbDownIcon
                        className="h-4 md:h-8 text-red-500 cursor-pointer"
                        onClick={async () => {
                          await updateDoc(
                            doc(db, "suggestions", suggestion.id),
                            {
                              dislikeCount: suggestion.dislikeCount++,
                            }
                          );
                        }}
                      />
                      <h4>{suggestion.dislikeCount}</h4>
                    </div>
                    <div>
                      <h2 className="ml-4 mr-4 max-w-2xl text-xs md:text-lg">
                        {suggestion.comment}
                      </h2>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Suggestions;
