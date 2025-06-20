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
const RegistrationForm = () => {
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
      const response = await axios.post(`https://localhost:7100/api/auth/register`, values);
      console.log("response",response);


      action.resetForm();

      alert("Registration successful and click on login page")
    }
    catch(err)
    {
      alert("invalid")
          console.log("error:",err.message)
          alert(err.message);
    }
    },
  });

  console.log("formik values:", formik.values);

  const handleClick= ()=>{
    navigate('/signin');
 }


  return (
    <div
  className="flex items-center justify-center bg-cover bg-center min-h-screen w-full px-4 sm:px-6"
  style={{ backgroundImage: `url(${myImage})` }}
>
  <div className="w-full max-w-lg bg-white rounded-[15px] p-6 sm:p-10 gap-10 shadow-md">
    <h2 className="text-[22px] sm:text-[27px] font-[500] mb-5 text-center text-blue-600">
      USER Registration
    </h2>

    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
   
      <div>
        <label htmlFor="name" className="block font-[500] text-blue-600 mb-1">
          Name
        </label>
        <input  type="text"name="name" value={formik.values.name}  required  onChange={formik.handleChange}onBlur={formik.handleBlur}className="border p-2 w-full rounded"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>

      
      <div>
        <label htmlFor="email" className="block font-[500] text-blue-600 mb-1">
          Email
        </label>
        <input  type="text" name="email" value={formik.values.email} required onChange={formik.handleChange} onBlur={formik.handleBlur}
          className="border p-2 w-full rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>

     
      <div>
        <label htmlFor="password" className="block font-[500] text-blue-600 mb-1">
          Password
        </label>
        <input type="password" name="password" value={formik.values.password}
          onChange={formik.handleChange} onBlur={formik.handleBlur}  className="border p-2 w-full rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>


      <div>
        <label htmlFor="role" className="block font-[500] text-blue-600 mb-1">
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
        className="bg-blue-500 cursor-pointer text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>


    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center pt-5 text-center sm:text-left">
      <span className="text-blue-500">Already have an account?</span>
      <button
        onClick={handleClick}
        className="text-blue-500 cursor-pointer underline hover:text-blue-700"
      >
      login
      </button>
    </div>
  </div>
</div>


  )
}

export default RegistrationForm;

