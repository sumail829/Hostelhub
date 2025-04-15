"use client"
import React, { useState } from "react";
import axios from "axios";

const MealForm = () => {
    const [form, setForm] = useState({
        type: "veg",
        day: "sunday",
        breakfast: "",
        lunch: "",
        dinner: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("https://hostelhub-kgof.onrender.com/api/meals", form);
            alert("Meal added!");
            setForm({ type: "veg", day: "sunday", breakfast: "", lunch: "", dinner: "" });
        } catch (error) {
            alert("Failed to add meal.");
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 mt-10">
  <div className="p-6 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Meals</h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="veg">Veg</option>
          <option value="nonVeg">Non-Veg</option>
        </select>

        <select
          name="day"
          value={form.day}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <input
          name="breakfast"
          placeholder="Breakfast"
          value={form.breakfast}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          name="lunch"
          placeholder="Lunch"
          value={form.lunch}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          name="dinner"
          placeholder="Dinner"
          value={form.dinner}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-150"
        >
          Add Meal
        </button>
      </div>
    </form>
  </div>
</div>



    );
};

export default MealForm;
