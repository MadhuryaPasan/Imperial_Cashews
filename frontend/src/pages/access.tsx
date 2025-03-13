import React, { useState } from "react";

import Signin from "@/components/SignIn_SignOut/signin";
import Signup from "@/components/SignIn_SignOut/signup";
import { Button } from "@/components/ui/button";

const access = () => {
  const [accessBtn, setAccessBtn] = useState("signin");
  console.log(accessBtn);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        
        <div>
        {accessBtn === "signin" ? (
          <div>
            <Signin />
          </div>
        ) : (
          <div>
            <Signup />
          </div>
        )}
          {/* <Signin /> */}
          {/* <Signup /> */}
          <div className="flex justify-center gap-x-3 m-3">
            <Button
            variant={accessBtn === "signin" ? "outline" : "default"}
              className={`w-[100px] cursor-pointer ${accessBtn === "signin" ? "border-1 border-primary" : ""}`}
              onClick={() => setAccessBtn("signin")}
            >
              Sign in
            </Button>
            <Button
            variant={accessBtn === "signup" ? "outline" : "default"}
            className={`w-[100px] cursor-pointer ${accessBtn === "signup" ? "border-1 border-primary" : ""}`}
              onClick={() => setAccessBtn("signup")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default access;
