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
     <form onSubmit={handleSubmit} className=" border-red-200 flex flex-col gap-6"> {/* ← manual onSubmit handler */}
       {/* <label f */}

      {/* <div className="w-full flex flex-row gap-2 border-red-200 ">
         <div className="flex flex-1 flex-col gap-2 min-w-0">
           <label htmlFor="firstname" className="text-xs font-medium text-gray-600">First name *</label>
           <input className="border-gray-200 rounded-sm border p-2" name="firstname" type="name" />
         </div>
         <div className="flex flex-1 flex-col gap-2 min-w-0">
           <label htmlFor="lastname" className="text-xs font-medium text-gray-600">Last name *</label>
           <input className="border-gray-200 rounded-sm border p-2" name="lastname" type="name" />
         </div>
      </div> */}

       <div className="flex flex-col gap-2">
         <label htmlFor="email" className="text-xs font-medium text-gray-600">Email *</label>
         <input className="border-gray-200 rounded-sm border p-2" name="email" type="email" />
       </div>

       <div className="flex flex-col gap-2">
         <label htmlFor="password" className="text-xs font-medium text-gray-600">Password *</label>
         <input className="border-gray-200 rounded-sm border p-2" name="password" type="password" />
       </div>

       {error && <p className="text-red-500">{error}</p>}
       {success && <p className="text-green-500">Registered successfully!</p>}

       <button className="rounded-sm text-sm text-white font-semibold bg-[#DE14AF] p-3" type="submit" disabled={isPending}>
         {isPending ? 'Login in...' : 'Login'}
       </button>
     </form>
  );
}