import React, { useState } from "react";

import Signin from "@/components/SignIn_SignOut/signin";
import Signup from "@/components/SignIn_SignOut/signup";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const access = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Tabs defaultValue="signin" className=" flex justify-center items-center gap-5">
          <TabsList className="w-full h-15 gap-x-5">
            <TabsTrigger value="signin" className="data-[state=active]:border-1 data-[state=active]:border-primary data-[state=active]:text-primary shadow-lg" >Sign in</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:border-1 data-[state=active]:border-primary data-[state=active]:text-primary shadow-lg">Sign up</TabsTrigger>
          </TabsList>
          {/* signin */}
          <TabsContent value="signin">
            <div>
              <Signin />
            </div>
          </TabsContent>
          {/* signup */}
          <TabsContent value="signup">
            <div>
              <Signup />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default access;

// const [accessBtn, setAccessBtn] = useState("signin");
//   console.log(accessBtn);

// {
// <div className="flex justify-center items-center h-screen">
//         <div>
//           {accessBtn === "signin" ? (
//             <div>
//               <Signin />
//             </div>
//           ) : (
//             <div>
//               <Signup />
//             </div>
//           )}
//           {/* <Signin /> */}
//           {/* <Signup /> */}
//           <div className="flex justify-center gap-x-3 m-3">
//             <Button
//               variant={accessBtn === "signin" ? "outline" : "default"}
//               className={`w-[100px] cursor-pointer ${
//                 accessBtn === "signin" ? "border-1 border-primary" : ""
//               }`}
//               onClick={() => setAccessBtn("signin")}
//             >
//               Sign in
//             </Button>
//             <Button
//               variant={accessBtn === "signup" ? "outline" : "default"}
//               className={`w-[100px] cursor-pointer ${
//                 accessBtn === "signup" ? "border-1 border-primary" : ""
//               }`}
//               onClick={() => setAccessBtn("signup")}
//             >
//               Sign up
//             </Button>
//           </div>
//         </div>
//       </div>
// }
