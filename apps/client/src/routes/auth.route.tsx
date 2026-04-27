import {RouteObject} from "react-router-dom";

import SignUp from "../views/auth/signup.view.tsx";
import SignIn from "../views/auth/signin.view.tsx";

const authRoutes: RouteObject[] = [
  {path: "register", element: <SignUp/>},
  {path: "login", element: <SignIn/>}
]
export default authRoutes