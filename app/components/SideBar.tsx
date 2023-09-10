"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SideBar({ children }) {
  const router = useRouter();

  const onLogOut = () => {
    axios
      .get("api/users/logout")
      .then((res) => {
        console.log("Logout successful", res);
        toast.success("Logout successful");
        router.push("/");
      })
      .catch((err) => {
        console.log("An error occured with error:", err);
        toast.error("An error occured");
      });
  };

  return (
    <div className="h-full">
      <div className="sidebar">
        <div>
          <Image
            src={"/logo.jpg"}
            width={48}
            height={48}
            className="rounded-lg"
            alt={"appNation"}
          />
        </div>
        <div
          className="cursor-pointer  hover:list-item"
          onClick={() => router.push("/home")}
        >
          <Image src={"/house.svg"} width={32} height={32} alt="house" />
        </div>
        <div
          className="cursor-pointer  hover:list-item"
          onClick={() => router.push("/users")}
        >
          <Image src={"/user.svg"} width={32} height={32} alt="user" />
        </div>
        <div
          className="cursor-pointer  hover:list-item signout"
          onClick={onLogOut}
        >
          <Image src={"/signout.svg"} width={48} height={48} alt="signout" />
        </div>
      </div>
      <main className="pl-20 h-screen">{children}</main>
    </div>
  );
}
