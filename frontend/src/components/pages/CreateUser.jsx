import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../adminSideBar";

const CreateUser = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    password: "",
    email: "",
    role: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      console.log("Submitted values:", values);
      setSubmitted(true);
      try {
        const response = await axios.post(`https://localhost:7100/api/Auth/register`, values);
        console.log("response", response);
        action.resetForm();
        alert("Registration successful");
      } catch (err) {
        console.log("error:", err.message);
        alert(err.message);
      }
    },
  });

  return (
    <div className="flex flex-col bg-[#FFF8EF] lg:flex-row h-screen">

      <div className="w-full lg:w-auto">
        <Sidebar />
      </div>

    
      <div className="flex items-center justify-center w-full bg-cover bg-center bg-no-repeat px-4 py-10 lg:py-0">
        <div className="w-full max-w-2xl lg:w-[50%] bg-white rounded-[15px] shadow-lg shadow-blue-900 p-6 sm:p-10">
          <h2 className="text-[22px] sm:text-[27px] font-[500] mb-5 text-center text-blue-600">
            Create User
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="flex items-start font-[500] text-blue-600 mb-1">
                Name
              </label>
              <input type="text"   name="name"      value={formik.values.name}       required   onChange={formik.handleChange}     onBlur={formik.handleBlur}    className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="flex items-start font-[500] text-blue-600 mb-1">
                Email
              </label>
              <input type="email" name="email"
                value={formik.values.email}  required onChange={formik.handleChange}  onBlur={formik.handleBlur} className="border p-2 w-full rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="flex items-start font-[500] text-blue-600 mb-1">
                Password
              </label>
              <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur}
                className="rounded border p-2 w-full "
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            <div>
              <label htmlFor="role" className="flex items-start font-[500] text-blue-600 mb-1">
                Role
              </label>
              <select
                className="border p-2 w-full rounded" name="role" value={formik.values.role}  onChange={formik.handleChange}onBlur={formik.handleBlur}
              >
                <option value="">Select role</option>
                <option value="User">User</option>
              </select>
              {formik.touched.role && formik.errors.role && (  <div className="text-red-500 text-sm">{formik.errors.role}</div>
              )}
            </div>

            <button  type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
