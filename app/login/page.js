"use client";
import { login } from "./action";
import { useFormState } from "react-dom";

export default function Page() {
  const initState = {
    message: "",
  };
  const [state, formAction] = useFormState(login, initState);

  return (
    <form action={formAction}>
      <div>
        Email: <input type="text" name="email" className="text-[red]"></input>
      </div>
      <div>
        Password: <input type="password" name="password" className="text-[red]"></input>
      </div>
      <div>message: {state.message}</div>
      <button className="bg-blue-400">login</button>
    </form>
  );
}
