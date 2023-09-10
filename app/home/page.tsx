"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        toast.error("User could not fetch");
        router.push("/");
      });
  }, [router]);

  return (
    <div className="flex p-12 flex-col ">
      <div className="h-1/3">
        <h1 className="h1">{`Welcome ${user?.name}`}</h1>
      </div>
      <div className="mr-12 mt-40 flex">
        <div className="flex-1">
          <h1 className="h1">Device Type</h1>
          <Image
            src={"/chart2.png"}
            alt={"Device Type"}
            width={256}
            height={256}
            className="mt-12"
          />
        </div>
        <div className="flex-1">
          <h1 className="h1">Daily Downloads</h1>
          <Image
            src={"/chart.png"}
            alt={"Chart"}
            width={512}
            height={408}
            className="mt-12"
          />
        </div>
      </div>
    </div>
  );
}
