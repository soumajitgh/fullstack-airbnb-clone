import fullLogo from "../assets/logo/airbnb-full-logo.svg"

import {Outlet} from "react-router-dom";

export default function AuthLayout() {

  return (
    <main className={"bg-base-200 h-screen flex items-center justify-center"}>

      <div className={"grid grid-cols-2 p-10 bg-base-100 container h-4/5 xl:w-4/6 rounded-xl"}>

        <section className={"flex flex-col"}>
          <img src={fullLogo} className="max-w-36" alt="Vite logo"/>
        </section>

        <section id={"children"} className={"h-full col-span-1"}>
          <Outlet/>
        </section>
      </div>

    </main>
  )
}