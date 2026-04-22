import Link from "next/link";
import LoginForm from "./LoginForm";




export default function Login()
{
    return (
        <>
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 shadow bg-white rounded ">
                <div className="mb-6 w-full flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-bold text-center">Log in to your account</h2>
                    <span className="text-md text-gray-600 text-center">Don't have an account yet? <Link href="/register" className="text-blue-500 hover:underline">Register here</Link></span>
                </div>
                <LoginForm />
            </div>
        </div>
        </>
    );
}