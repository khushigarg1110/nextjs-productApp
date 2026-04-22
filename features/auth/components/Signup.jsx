// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch } from "react-redux";
// import { signup } from "@/features/auth/authSlice.js";
// import { signupSchema } from "@/features/auth/schemas/authSchema.js";
// import "./Auth.css";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// function Signup() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signupSchema),
//   });

//   function onSubmit(data) {
//     console.log("Signup Data:", data);

//     // Auto-login after signup
//     dispatch(login(data));
//     toast.success("User Registration Successful!");
//     router.push("/")
//   }

//   return (
//     <div className="form-container">
//       <h2>Signup</h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Name */}
//         <input type="text" placeholder="Name" {...register("name")} />
//         {errors.name && <p className="error">{errors.name.message}</p>}

//         {/* Email */}
//         <input type="text" placeholder="Email" {...register("email")} />
//         {errors.email && <p className="error">{errors.email.message}</p>}

//         {/* Password */}
//         <input type="password" placeholder="Password" {...register("password")} />
//         {errors.password && <p className="error">{errors.password.message}</p>}

//         <button type="submit">Signup</button>
//       </form>
//       <p style={{ textAlign: "center" }}>
//         Already have an account?{" "}
//         <button onClick={() => router.push("/login")}>
//           Login
//         </button>
//       </p>
//         </div>
//   );
// }

// export default Signup;





"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/features/auth/schemas/authSchema.js";
import "./Auth.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data) {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Signup failed");
        return;
      }

      toast.success("User Registration Successful!");
      router.push("/login"); // go to login after signup
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="form-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
        <input type="text" placeholder="Email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Password */}
        <input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Signup</button>
      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <button onClick={() => router.push("/login")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;


