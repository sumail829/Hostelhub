// validators/studentValidator.js
import Joi from "joi";

export const studentSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  password: Joi.string().min(6).required(),
  roomNumber: Joi.string().optional(),
  profilePic: Joi.string().uri().optional(),
  admissionDate: Joi.date().optional()
});

export const updateStudentSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).max(15).optional(),
  roomNumber: Joi.string().optional(),
  profilePic: Joi.string().uri().optional(),
  admissionDate: Joi.date().optional()
});
