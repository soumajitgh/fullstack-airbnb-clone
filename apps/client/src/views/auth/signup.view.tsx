import {Link} from "react-router-dom";
import SignUpForm from "./components/forms/signup-form.component.tsx";


function SignUp() {

  return (
    <main className="flex flex-col items-center justify-between min-h-full">

      <div className={"w-full"}>
        <h3 className={"text-3xl font-bold mb-5"}>Register</h3>
        <SignUpForm/>
      </div>

      <span>
            already have an account?
            <Link className={"link link-secondary"} to={"/auth/login"}>login</Link>
      </span>
    </main>
  )
}

export default SignUp;