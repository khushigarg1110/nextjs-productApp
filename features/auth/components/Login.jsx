// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch } from "react-redux";
// import { login } from "@/features/auth/authSlice.js";
// import { loginSchema } from "@/features/auth/schemas/authSchema.js";
// import "./Auth.css";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";


// function Login() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   function onSubmit(data) {
//     console.log("Login Data:", data);

//     // Redux login
//     dispatch(login(data));
//     toast.success("Login Successful!");
//     router.push("/");
//   }

//   return (
//     <div className="form-container">
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="text" placeholder="Email" {...register("email")} />
//         {errors.email && <p className="error">{errors.email.message}</p>}

//         <input type="password" placeholder="Password" {...register("password")} />
//         {errors.password && <p className="error">{errors.password.message}</p>}

//         <button type="submit">Login</button>
//       </form>
//       <p style={{ textAlign: "center" }}>
//         Don't have an account?{" "}
//         <button onClick={()=>router.push("/signup")}>
//           Signup
//         </button>
//       </p>
//     </div>
//   );
// }

// export default Login;



"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas/authSchema.js";
import "./Auth.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // important for cookies
      });

      const result = await res.json();
      
      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return;
      }
      dispatch(login({ email: data.email }));


      toast.success("Login Successful!");
      router.push("/"); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>

      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <button onClick={() => router.push("/signup")}>
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;