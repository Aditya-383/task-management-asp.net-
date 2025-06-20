import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import myImage from "../assets/loginImage.jpg";


let initialValues={
  password: localStorage.getItem("password") || "",
  email: localStorage.getItem("email") || "",
  role: localStorage.getItem("role") || "",
}
const LoginForm = ({setRole}) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const courses=[
    {
      name:"Select course",
    },
    {
      name:"web Development",
    },
    {
      name:"Data Science",
    },
    {
      name:"Ai/Ml"
    },
    {
      name:"Android Development"
    }
  ]


  
  const formik = useFormik({
    initialValues:initialValues,
    onSubmit: async(values, action) => {
      console.log("Submitted values:", values);

      setSubmitted(true);
      try{
      const response = await axios.post(`https://localhost:7100/api/auth/login`, values);
      console.log("response",response);


      action.resetForm();

       alert("login successful")
      

         if(response.data.user.role === "User"){
          localStorage.setItem('role',response.data.user.role)
          setRole(response.data.user.role)
          navigate(`/userHome`);
         }
         else{
          localStorage.setItem('role',response.data.user.role)
          setRole(response.data.user.role)
          navigate(`/home`);
         }
      console.log("response",response.data);
         localStorage.setItem('token',response.data.token)
    }
    catch(err)
    {
          console.log("error:",err.message)
          alert("Invalid email or password or role");
    }
    },
  });

  console.log("formik values:", formik.values);

   const handleClick= ()=>{
      navigate('/signup');
   }


  return (
    <div
    className="flex items-center justify-center bg-cover min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto"
    style={{ backgroundImage: `url(${myImage})` }}
  >
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-[25px] shadow-md">
     
      <div className="bg-white rounded-t-[25px]">
        <img
          src={myImage}
          alt=""
          className="rounded-t-[25px] w-full object-cover max-h-[180px] sm:max-h-[200px]"
        />
      </div>
  
      
      <div className="grid items-center px-4 sm:px-6 pb-10">
        <h2 className="text-[22px] sm:text-[30px] font-bold text-center text-blue-600 pt-4">
          USER LOGIN
        </h2>
  
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pt-4">
         
          <div>
            <label htmlFor="email" className="block font-medium text-blue-600 mb-1">
              Email
            </label>
            <input type="text" name="email" value={formik.values.email}  onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="border p-2 w-full rounded"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
  
        
          <div>
            <label htmlFor="password" className="block font-medium text-blue-600 mb-1">
              Password
            </label>
            <input type="password" name="password"value={formik.values.password} onChange={formik.handleChange}onBlur={formik.handleBlur}
              className="border p-2 w-full rounded"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>
  
         
          <div>
            <label htmlFor="role" className="block font-medium text-blue-600 mb-1">
              Role
            </label>
            <select name="role" value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="border p-2 w-full rounded"
            >
              <option value="">Select role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
            )}
          </div>
  
          
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 cursor-pointer rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
  
       
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 pt-5 text-center sm:text-left">
          <span className="text-blue-500 text-sm sm:text-base">Don't have an account?</span>
          <button
            onClick={handleClick}
            className="text-blue-500 underline   cursor-pointer hover:text-blue-700 text-sm "
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default LoginForm;

