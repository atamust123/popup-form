"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "../components/Modal";
import useUsers from "../hooks/useUsers";
import { UserModal } from "./modals/UserModal";

export default function UsersHome() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addEditModal, setAddEditModal] = useState(false);
  const {
    users,
    handleAddUserButton,
    handleDeleteButton,
    handleUpdateButton,
    actionUser,
    footer,
    getUserList,
  } = useUsers(setDeleteModal, setAddEditModal);

  return (
    <div className="pt-24 px-12">
      <Modal
        title={"Confirm Deletion"}
        body={"User will be permanently deleted"}
        open={deleteModal}
        footer={footer}
        opacity="60"
      />
      {addEditModal && (
        <UserModal
          open={addEditModal}
          onHide={() => {
            setAddEditModal(false);
            getUserList();
          }}
          mode={addEditModal && actionUser ? "edit" : "add"}
          defaultValues={addEditModal && actionUser}
        />
      )}
      <div className="flex gap-6 mb-6">
        <h1 className="h1">Users</h1>
        <button onClick={handleAddUserButton}>
          <Image
            src={"/plus.svg"}
            alt="plus"
            width={32}
            height={32}
            className="button-2"
          />
        </button>
      </div>
      <table className="table w-full">
        <thead>
          <tr className="thead-row" key="thead-row">
            <th className="typo-table-header">Name</th>
            <th className="typo-table-header">Role</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.name} className="tbody-row">
              <td className="typo-table-body">{user.name}</td>
              <td className="typo-table-body">
                {user.isAdmin ? "Admin" : "Member"}
              </td>
              <td className="">
                {
                  <div className="flex justify-end gap-4 pr-4">
                    <button
                      className="button-3 table-action-bg"
                      type="button"
                      key={"trash"}
                      onClick={() => handleDeleteButton(user)}
                    >
                      <Image
                        width={16}
                        height={16}
                        src={"/trash.svg"}
                        alt={"trash"}
                      />
                    </button>
                    <button
                      className="button-2"
                      type="button"
                      key={"edit"}
                      onClick={() => handleUpdateButton(user)}
                    >
                      <Image
                        width={16}
                        height={16}
                        src={"/pen.svg"}
                        alt={"edit"}
                      />
                    </button>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
