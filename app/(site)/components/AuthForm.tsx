"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Form from "../../components/Form";
import { loginSchema } from "../../libs/schema";

export default function AuthForm() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const formAttributes = useForm<FieldValues>({
    defaultValues: { name: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FieldValues) => {
    // setLoading(true);
    axios
      .post("api/users/login", data)
      .then((res) => {
        toast.success(`Login successful, ${res.data}`);
        router.push("/home");
      })
      .catch((err) => {
        console.error("Login failed with error:", err);
        toast.error(`Wrong username or passcode`);
      });
    // .finally(() => setLoading(false));
  };

  return (
    <div className="login-layout">
      <div className=" m-auto border bg-border-1 p-6 pt-12 rounded-lg">
        <h1 className="h1 mb-12" data-testid={"Login"}>
          Login
        </h1>
        <Form
          formAttributes={formAttributes}
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
            label="Password"
            name={"password"}
            inputProps={{
              placeholder: "Password",
              type: "password",
              id: "password",
            }}
          />
          <button className="button-1 typo-1" type="submit">
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
