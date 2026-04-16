import RegisterForm from "./RegisterForm";




export default function Register()
{
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 shadow bg-white rounded ">
                <div className="mb-6 w-full flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-bold text-center">Create account</h2>
                    <span className="text-md text-gray-600 text-center">Already have an account? Sign in</span>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}