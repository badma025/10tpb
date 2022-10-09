import { useRouter } from "next/router";
import { useEffect } from "react";

const Loading = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("http://localhost:3000/portal");
  }, []);

  return (
    <div className="bg-[#282828] flex items-center justify-center h-screen text-yellow-500 text-lg md:text-xl font-semibold ">
      <div className=" ">
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default Loading
