"use client";

import Input from "@/components/input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { logIn } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  //   const onClick = async () => {
  //     const response = await fetch("/www/users", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: "nico",
  //         password: "1234",
  //       }),
  //     });
  //     console.log(await response.json());
  //   };

  const [state, dispatch] = useFormState(logIn, null);
  console.log("state", state);
  //   const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton text="Log in" />
      </form>
      {/* <span onClick={onClick}>aa</span> */}
      <SocialLogin />
    </div>
  );
}
