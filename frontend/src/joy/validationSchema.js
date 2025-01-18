import Joi from "joi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});

export const deliveryFormSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .required()
    .label("Phone Number"),
  address: Joi.string().min(5).max(100).required().label("Address"),
  city: Joi.string().min(2).max(50).required().label("City"),
  postalCode: Joi.string()
    .pattern(new RegExp("^[0-9]{5}$"))
    .required()
    .label("Postal Code"),
  country: Joi.string().min(2).max(50).required().label("Country"),
  paymentMethod: Joi.string()
    .valid("Stripe", "Cash on delivery")
    .required()
    .messages({
      "any.only":
        "Payment method must be either 'Stripe' or 'Cash on delivery'",
      "string.empty": "Payment method is required",
    }),
});

export const myProfileFormSchema = Joi.object({
  name: Joi.string().min(2).required().label("Name"),
  lastname: Joi.string().min(2).required().label("Last Name"),
  email: Joi.string().pattern(emailRegex).required().label("Email"),
  aboutMe: Joi.string().label("About Me").default(""),
  profileImage: Joi.any().optional().label("Profile Image"),
});

export const contactusFormSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 30 characters long",
  }),
  familyName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Family Name is required",
    "string.min": "Family Name must be at least 3 characters long",
    "string.max": "Family Name must be less than 30 characters long",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),
  number: Joi.string()
    .pattern(/^[0-9]+$/)
    .allow("")
    .messages({
      "string.pattern.base": "Phone number must contain only digits",
    }),
  message: Joi.string().min(10).required().messages({
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters long",
  }),
});
