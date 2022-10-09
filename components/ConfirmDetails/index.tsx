import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BsCheck,
  BsCheck2,
  BsFileEarmarkLock,
  BsFileLock,
  BsLock,
  BsPerson,
} from "react-icons/bs";
import { auth, db } from "../../utils/firebase";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HiLockClosed } from "react-icons/hi";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { updatePassword, updateProfile } from "firebase/auth";

const ConfirmDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentDatabaseId, setDocumentDatabaseId] = useState(" ");

  const [user] = useAuthState(auth);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("No username provided."),
      password: Yup.string()
        .required("No password provided.")
        .min(
          8,
          "Password is too short - should be at least 8 characters minimum."
        ),
      confirmPassword: Yup.string()
        .required("No confirmed password provided.")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    async onSubmit(data, formikHelpers) {
      setIsSubmitting(true);

      // @ts-ignore
      const docRef = await setDoc(doc(db, "users", user?.uid), {
        dateCreated: serverTimestamp(),
        initialLogin: true,
        email: user?.email,
        displayName: data.username,
        uid: user?.uid,
      });
      //  @ts-ignore
      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });
      formikHelpers.resetForm();
       
      // @ts-ignore
      updatePassword(auth?.currentUser, data.password)

      router.push(`http://localhost:3000/profile/${data.username}`)
      setIsSubmitting(false);
    },
  });

  return (
    <section className="flex flex-col items-center justify-center mt-10 text-lg ">
      <div className="flex flex-col justify-center items-center text-center mx-10 space-y-2">
        <h2 className="font-semibold">Confirm your details</h2>
        <h3 className="text-sm ">
          You cannot change these later, so make sure they are accurate.
        </h3>
      </div>

      <form
        className="flex flex-col items-center justify-center mt-10"
        onSubmit={formik.handleSubmit}>
        <label className="">
          <div
            className="border-2 border-[#fa7a00] flex items-center justify-center 
          mb-4
          space-x-3 w-[250px] mx-auto py-[8px] ">
            <div className=" flex items-center justify-center   -ml-[5px] px-2 space-x-2 text-gray-500">
              <BsPerson size={40} />

              <div className="h-[40px] w-0.5 bg-black -ml-[40px]" />
            </div>

            <div className="">
              <input
                className="pl-2 -ml-[15px]  bg-[#282828] outline-none  w-[170px] h-[35px] "
                placeholder="Username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                id="username"
              />
            </div>
          </div>
        </label>

        <label className="">
          <div
            className="border-2 border-[#fa7a00] flex items-center justify-center 
          mb-4
          space-x-3 w-[250px] mx-auto py-[8px] ">
            <div className=" flex items-center justify-center   -ml-[5px] px-2 space-x-2 text-gray-500">
              <HiLockClosed size={40} />

              <div className="h-[40px] w-0.5 bg-black -ml-[40px]" />
            </div>

            <div className="">
              <input
                className="pl-2 -ml-[15px]  bg-[#282828] outline-none  w-[170px] h-[35px] "
                placeholder="New Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                //@ts-ignore
              />
            </div>
          </div>
        </label>

        <label className="">
          <div
            className="border-2 border-[#fa7a00] flex items-center justify-center 
          mb-4
          space-x-3 w-[250px] mx-auto py-[8px] ">
            <div className=" flex items-center justify-center   -ml-[5px] px-2 space-x-2 text-gray-500">
              <BsCheck size={40} />

              <div className="h-[40px] w-0.5 bg-black -ml-[40px]" />
            </div>

            <div className="">
              <input
                className="pl-2 -ml-[15px]  bg-[#282828] outline-none  w-[170px] h-[35px] "
                placeholder="Confirm Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                id="confirmPassword"
                //@ts-ignore
              />
            </div>
          </div>
        </label>

        <button
          disabled={isSubmitting}
          type="submit"
          className="mt-4 px-5 py-3 border-1 border-black rounded-xl border transition duration-300 hover:scale-110 ease-in-out">
          Submit
        </button>
      </form>

      <section className="mt-6 space-y-3 text-md sm:text-lg text-center">
        {formik.errors.username && formik.touched.username && (
          <div>
            <h2 className="text-red-500">{formik.errors.username}</h2>
          </div>
        )}

        {formik.errors.password && formik.touched.password && (
          <div className="mx-20">
            <h2 className="text-red-500">{formik.errors.password}</h2>
          </div>
        )}

        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <div>
            <h2 className="text-red-500">{formik.errors.confirmPassword}</h2>
          </div>
        )}
      </section>
    </section>
  );
};

export default ConfirmDetails;
