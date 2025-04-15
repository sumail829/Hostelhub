"use client"
import React, { useState } from "react";
import axios from "axios";

const FacilityForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    details: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://hostelhub-kgof.onrender.com/api/facilities", form);
      alert("Facility added!");
      setForm({ title: "", description: "", icon: "", details: "" });
    } catch (error) {
      alert("Failed to add facility.");
      console.log(error);
    }
  };

  return (
   
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 mt-10">
    <div className="p-6 border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Facility</h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
  
          <input
            name="description"
            placeholder="Short Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
  
          <input
            name="icon"
            placeholder="Icon URL or name"
            value={form.icon}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 col-span-1 md:col-span-2"
          />
  
          <textarea
            name="details"
            placeholder="Details"
            value={form.details}
            onChange={handleChange}
           
            className="border border-gray-300 rounded px-3 py-2 col-span-1 md:col-span-2"
          ></textarea>
        </div>
  
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all duration-150"
        >
          Add Facility
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default FacilityForm;
