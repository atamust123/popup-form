"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useUsers(setDeleteModal, setAddEditModal) {
  const [currentUser, setCurrentUser] = useState();
  const [actionUser, setActionUser] = useState(null);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => setCurrentUser(res.data.data))
      .catch((err) => {
        toast.error("Unable to fetch current user");
        router.push("/");
      });
  }, [router]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios
      .get("api/users")
      .then((res) => setUsers(res.data.data))
      .catch("Unable to fetch user list");
  };

  const handleAddUserButton = () => {
    if (currentUser?.isAdmin) {
      setAddEditModal(true);
      setActionUser(null);
      return;
    }
    return toast.error("You do not have permission to create user.");
  };

  const handleUpdateButton = (user) => {
    if (currentUser?.isAdmin) {
      setAddEditModal(true);
      setActionUser(user);
      return;
    }
    return toast.error("You do not have permission to edit user.");
  };
  const handleDeleteButton = (user) => {
    if (currentUser?.isAdmin) {
      setDeleteModal(true);
      setActionUser(user);
      return;
    }
    return toast.error("You do not have permission to delete user.");
  };

  const deleteUser = () => {
    actionUser &&
      axios
        .delete("api/users", { data: { userId: actionUser } })
        .then((res) => {
          toast.success("User deleted successully", res.data);
          setDeleteModal(false);
          setActionUser(null);
          getUserList();
        })
        .catch((err) => toast.error("User could not be deleted"));
  };

  const footer = (
    <div className="flex rounded-b-xl">
      <button
        onClick={deleteUser}
        type="button"
        className="flex h-12 p-4 flex-col justify-center flex-1 typo-2 text-[#FF3B30] hover:bg-[#e3e3eccc] rounded-bl-xl items-center"
      >
        Delete
      </button>
      <button
        onClick={() => setDeleteModal(false)}
        type="button"
        className="flex h-12 p-4 flex-col justify-center flex-1 typo-2 hover:bg-[#e3e3eccc] rounded-br-xl items-center"
      >
        Cancel
      </button>
    </div>
  );

  return {
    currentUser,
    users,
    footer,
    handleDeleteButton,
    handleUpdateButton,
    handleAddUserButton,
    getUserList,
    actionUser,
  };
}
