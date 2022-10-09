import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BsLockFill, BsPersonCircle } from "react-icons/bs";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { isLoggedInState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

const Login = () => {
  const [passwordInput, setPasswordInput] = useState<string>(" ");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [enteredCorrectPassword, setEnteredCorrectPassword] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleSubmit = async () => {
    setPasswordError(false);
    setEnteredCorrectPassword(false);
    setLoading(true);

    const passwordDocRef = doc(db, "password", "passwordDoc");

    const passwordDocSnap = await getDoc(passwordDocRef);

    const passwordData = passwordDocSnap.data();

    // @ts-ignore
    if (passwordData.passwordField == passwordInput) {
      setEnteredCorrectPassword(true);
      setIsLoggedIn(true);
      router.push("https://10tpb.vercel.app/home");
    } else {
      setPasswordError(true);
    }

    setLoading(false);
    setPasswordInput("");
  };

  return (
    <section className="mt-10 flex flex-col justify-center text-center  text-lg font-semibold ">
      <div className="space-y-2 flex flex-col items-center justify-center ">
        <div></div>
        <div>
          <h2 className="text-xl font-bold">Portal</h2>
        </div>
        <div>
          <h3 className="text-lg font-normal">Enter the 10TPB world</h3>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="mt-16">
        <label className="">
          <div
            className="border-2 border-[#fa7a00] flex items-center justify-center 
          
          space-x-3 w-[250px] mx-auto py-[8px] ">
            <div className=" flex items-center justify-center   -ml-[5px] px-2 space-x-2 text-gray-500">
              <HiLockClosed size={40} />

              <div className="h-[40px] w-0.5 bg-black -ml-[40px]" />
            </div>

            <div className="">
              <input
                className="pl-2 -ml-[15px]  bg-[#282828] outline-none  w-[170px] h-[35px] "
                placeholder="Password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
          </div>
        </label>
        <button
          disabled={loading}
          // @ts-ignore
          onClick={() => handleSubmit()}
          className="mt-10 py-3 px-5 transition duration-300 ease-in-out hover:scale-110 border rounded-xl 
         border-black">
          Login
        </button>
      </form>

      <div className="space-y-3 mt-4">
        {passwordError && (
          <div className="flex items-center justify-center  text-red-500 text-lg md:text-xl  ">
            <h2>Incorrect password. Please try again.</h2>
          </div>
        )}
        {enteredCorrectPassword && (
          <div className="flex items-center justify-center  text-green-500 text-lg md:text-xl  ">
            <h2>Correct password!!</h2>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center  text-yellow-500 text-lg md:text-xl  ">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
