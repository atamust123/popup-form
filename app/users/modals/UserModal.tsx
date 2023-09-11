"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { addUserSchema } from "../../libs/schema";
import Form from "../../components/Form";
import { Consent } from "../../components/Consent";
/**
 *
 * @param mode  add|edit
 * @param defaultValues {name,password,isAdmin}
 * @param open modal is open
 * @param onHide close modal
 */
export const UserModal = ({ mode, defaultValues, open, onHide }) => {
  const [loading, setLoading] = useState(false);
  const formAttributes = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
      role: "",
      email: "",
      phone: "",
      consent: false,
    },
    resolver: yupResolver(addUserSchema),
    mode: "all",
  });

  useEffect(() => {
    if (defaultValues?.name) {
      formAttributes.setValue("name", defaultValues.name);
      formAttributes.setValue(
        "role",
        defaultValues.isAdmin ? "admin" : "member"
      );
    } else {
      formAttributes.setValue("name", "");
      formAttributes.setValue("password", "");
      formAttributes.setValue("role", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaultValues?.name]);

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    mode === "add" ? addUser(data) : editUser(data);
  };

  const addUser = (data: FieldValues) => {
    const { name, password, role } = data || {};
    axios
      .post("api/users", {
        name,
        password,
        isAdmin: role === "admin",
      })
      .then((res) => {
        toast.success("User inserted successfully with name:", name);
        onHide();
      })
      .catch((err) => {
        console.log("User insertion failed due to", err);
        toast.error("User insertion failed.");
      });
  };

  const editUser = (data: FieldValues) => {
    console.log("defaultValues", defaultValues);
    if (!defaultValues?.name) {
      return toast.error("Id is not presented");
    }
    const { name } = data || {};
    axios
      .put("api/users", { userId: defaultValues._id, newName: name })
      .then((res) => {
        toast.success("User inserted successfully with name:", name);
        onHide();
      })
      .catch((err) => {
        console.log("User update failed due to", err);
        toast.error("User update failed.");
      });
  };

  return (
    <dialog open={open}>
      <div className=" m-auto border bg-border-1 p-6 pt-4 rounded-lg">
        <button
          className="close-button opacity-70 ml-auto hover:opacity-100"
          onClick={onHide}
          type="button"
        >
          <Image src={"/x.svg"} alt="close" width={16} height={16} />
        </button>
        <h1 className="h1 mb-12 text-left">
          {mode === "edit" ? "Edit User" : "Add User"}
        </h1>
        <Form
          formAttributes={formAttributes}
          formProps={{ className: "text-left" }}
          id={"form"}
          onSubmit={formAttributes.handleSubmit(onSubmit)}
        >
          <Form.Input
            label={"Name"}
            name={"name"}
            inputProps={{
              placeholder: "Name",
              type: "text",
              id: "name",
            }}
          />
          <Form.Input
            label={"Email"}
            name={"email"}
            inputProps={{
              placeholder: "Email",
              type: "email",
              id: "email",
            }}
            disabled={mode === "edit"}
          />
          <Form.Input
            label={"Phone Number"}
            name={"phone"}
            inputProps={{
              placeholder: "Phone Number",
              type: "tel",
              id: "tel",
              maxLength: 10,
            }}
            disabled={mode === "edit"}
          />
          <Form.Input
            label="Password"
            name={"password"}
            inputProps={{
              placeholder: "Password",
              type: "password",
              id: "password",
            }}
            disabled={mode === "edit"}
          />
          <Form.RadioGroup
            name={"role"}
            options={[
              { id: "admin", label: "Admin" },
              { id: "member", label: "Member" },
            ]}
            label={"Role"}
            rest={{
              disabled: mode === "edit",
            }}
          />
          <Consent name="consent" />
          <button className="button-1 typo-1" type="submit" disabled={loading}>
            {mode === "add" ? "Add" : "Edit"}
          </button>
        </Form>
      </div>
    </dialog>
  );
};
