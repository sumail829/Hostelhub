import Facility from "../models/Facility.js";
import Meal from "../models/Meal.js";

//Post Meal
export const createMeal = async (req, res) => {
  try {
    const { type, day, breakfast, lunch, dinner } = req.body;
    const createdMeal=await new Meal({type,day,breakfast,lunch,dinner}).save();

    return res.status(200).json({
      message: "Meal data fetched successfully",
      createdMeal
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({ message: "Failed to fetch services" });
  }
};

// Get all meals
export const getMeals = async (req, res) => {
    try {
      const meals = await Meal.find();
      return res.status(200).json({ meals });
    } catch (error) {
      console.error("Error fetching meals:", error);
      return res.status(500).json({ message: "Failed to fetch meals" });
    }
  };
  
  // Update a meal
  export const updateMeal = async (req, res) => {
    try {
      const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMeal) return res.status(404).json({ message: "Meal not found" });
  
      return res.status(200).json({ message: "Meal updated", meal: updatedMeal });
    } catch (error) {
      console.error("Error updating meal:", error);
      return res.status(500).json({ message: "Failed to update meal" });
    }
  };
  
  // Delete a meal
  export const deleteMeal = async (req, res) => {
    try {
      const deleted = await Meal.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Meal not found" });
  
      return res.status(200).json({ message: "Meal deleted successfully" });
    } catch (error) {
      console.error("Error deleting meal:", error);
      return res.status(500).json({ message: "Failed to delete meal" });
    }
  };

  //Post all Facility
export const createFacility=async(req,res)=>{
    try {
        const { title, description, icon, details } = req.body;
        const createdFacility=await new Facility({title,description,icon,details}).save();
        return res.status(200).json({
            message:"facility added successfully",
            createdFacility
        })
    } catch (error) {
        console.error("Error fetching services:", error);
    return res.status(500).json({ message: "Failed to fetch services" });
        
    }
}
// Get all facilities
export const getFacilities = async (req, res) => {
    try {
      const facilities = await Facility.find();
      return res.status(200).json({ facilities });
    } catch (error) {
      console.error("Error fetching facilities:", error);
      return res.status(500).json({ message: "Failed to fetch facilities" });
    }
  };
  
  // Update a facility
  export const updateFacility = async (req, res) => {
    try {
      const updated = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Facility not found" });
  
      return res.status(200).json({ message: "Facility updated", facility: updated });
    } catch (error) {
      console.error("Error updating facility:", error);
      return res.status(500).json({ message: "Failed to update facility" });
    }
  };
  
  // Delete a facility
  export const deleteFacility = async (req, res) => {
    try {
      const deleted = await Facility.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Facility not found" });
  
      return res.status(200).json({ message: "Facility deleted successfully" });
    } catch (error) {
      console.error("Error deleting facility:", error);
      return res.status(500).json({ message: "Failed to delete facility" });
    }
  };

