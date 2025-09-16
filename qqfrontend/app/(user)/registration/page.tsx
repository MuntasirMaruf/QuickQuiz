'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: 'Male',
    address: '',
    password: '',
    file: null as File | null,
  });

  const [error, setError] = useState(''); // single error message
  const [success, setSuccess] = useState(''); // success message

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // clear error on change
    setSuccess('');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
  // Username: required, letters, numbers, underscores, max 100
  if (!formData.username.trim()) {
    setError('Username is required');
    return false;
  }
  if (!/^[a-zA-Z0-9_]{1,100}$/.test(formData.username)) {
    setError('Username can only contain letters, numbers, underscores and max 100 chars');
    return false;
  }

  // Full Name: optional, letters, numbers, spaces only
  if (formData.fullname && !/^[A-Za-z0-9 ]*$/.test(formData.fullname)) {
    setError('Full Name can only contain letters, numbers and spaces');
    return false;
  }

  // Email: optional, max 200, valid format
  if (formData.email) {
    if (formData.email.length > 200) {
      setError('Email must not exceed 200 characters');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
  }

  // Phone Number: required, Bangladesh format 01xxxxxxxxx
  if (!/^01\d{9}$/.test(formData.phone_number)) {
    setError('Phone Number must start with 01 and have 11 digits');
    return false;
  }

  // Date of Birth: required
  if (!formData.date_of_birth) {
    setError('Date of Birth is required');
    return false;
  }

  // Gender: required, Male/Female/Others
  if (!['Male', 'Female', 'Others'].includes(formData.gender)) {
    setError('Gender must be Male, Female, or Others');
    return false;
  }

  // Password: required, min 6 chars, at least 1 lowercase
  if (!formData.password) {
    setError('Password is required');
    return false;
  }
  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters long');
    return false;
  }
  if (!/[a-z]/.test(formData.password)) {
    setError('Password must contain at least one lowercase letter');
    return false;
  }

  // Address: optional, max 300
  if (formData.address && formData.address.length > 300) {
    setError('Address must not exceed 300 characters');
    return false;
  }

  return true; // All validations passed
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return; // stop if validation fails

    const data = new FormData();
    data.append('username', formData.username);
    data.append('fullname', formData.fullname);
    data.append('email', formData.email);
    data.append('phone_number', formData.phone_number);
    data.append('date_of_birth', formData.date_of_birth);
    data.append('gender', formData.gender);
    data.append('address', formData.address);
    data.append('password', formData.password);
    if (formData.file) data.append('file', formData.file);

    try {
      const res = await axios.post(
        'http://localhost:3000/admin/addAdminnew',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSuccess('Admin registered successfully!');
      setFormData({
        username: '',
        fullname: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: 'Male',
        address: '',
        password: '',
        file: null,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error registering admin');
    }
  };

  return (
    <div>
      <h1>Admin Registration</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Full Name:</label>
          <input name="fullname" value={formData.fullname} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Display Picture:</label>
          <input name="file" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegistration;



// import React from 'react'

// const page = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default page
