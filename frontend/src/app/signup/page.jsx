// "use client";
// import React, { useState } from 'react';

// const RoleBasedSignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'Admin' // Default role
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   // Set dynamic background color for role dropdown
//   const getRoleColor = () => {
//     switch (formData.role) {
//       case 'Admin':
//         return 'bg-red-100 text-red-700';
//       case 'Presentor':
//         return 'bg-green-100 text-green-700';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
//       style={{ backgroundImage: "url('/img/signupBG.jpg')" }} // 🖼️ Background Image
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>

//       {/* Form container */}
//       <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//               minLength={8}
//             />
//             <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
//           </div>

//           {/* Role Dropdown */}
//           <div className="mb-6">
//             <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-2">Select Role</label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getRoleColor()}`}
//               required
//             >
//               <option value="Admin">Admin</option>
//               <option value="Presentor">Presentor</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RoleBasedSignupPage;

'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Validation Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'Lowercase letter required')
    .matches(/[A-Z]/, 'Uppercase letter required')
    .matches(/[0-9]/, 'Number required')
    .matches(/\W/, 'Special character required')
    .min(8, 'Password must be at least 8 characters long'),
  role: Yup.string().required('Role is required'),
});

const RoleBasedSignupPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'Admin',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values);
        toast.success('User Registered Successfully!');
        router.push('/login');
        resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Signup failed');
        setSubmitting(false);
      }
    },
  });

  const getRoleColor = () => {
    switch (formik.values.role) {
      case 'Admin':
        return 'bg-red-100 text-red-700';
      case 'Presentor':
        return 'bg-green-100 text-green-700';
      default:
        return '';
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/img/signupBG.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
          </div>

          {/* Role Dropdown */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-2">Select Role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getRoleColor()}`}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Presentor">Presentor</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.role}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleBasedSignupPage;
