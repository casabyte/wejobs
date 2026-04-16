'use client'



import { time } from "console";
import React, {useState, useTransition} from "react";
import { loginAction } from "./actions";



export default function LoginForm(){

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();



    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            // await new Promise ((resolve) => setTimeout(resolve, 5000));
          const res =  await loginAction(null, formData);

          console.log(res);


          // if (res.error) {
          //   setError(res.error);
          //   setSuccess(null);
          // } else {
          //   setSuccess('Logged in!');
          //   setError(null);
          // }
        })
    }

   return (
    <form onSubmit={handleSubmit} className="flex"> {/* ← manual onSubmit handler */}
      <input name="email" type="email" />
      <input name="password" type="password" />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Logged in!</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}