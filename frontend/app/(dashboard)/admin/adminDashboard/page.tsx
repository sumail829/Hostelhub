import FacilityForm from '@/components/facilityForm'
import Hero from '@/components/Hero'
import MealForm from '@/components/mealForm'
import RoomAdd from '@/components/roomAdd'
import React from 'react'

export default function AdminDashboard() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

                <Hero></Hero>
                <RoomAdd></RoomAdd>
                <FacilityForm></FacilityForm>
                <MealForm></MealForm>
            </div>
        </div>
    )
}
