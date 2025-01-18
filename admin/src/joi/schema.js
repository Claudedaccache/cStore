import Joi from "joi";

export const addItemSchema = Joi.object({
  image: Joi.array()
    .items(Joi.any())
    .max(4)
    .required()
    .messages({
      "array.base": "Images must be an array",
      "array.max": "You can upload a maximum of 4 images",
      "array.empty": "At least one image is required",
    })
    .label("Image"),
  name: Joi.string().required().label("name").messages({
    "string.empty": "name is required",
  }),

  description: Joi.string().required().label("Description").messages({
    "string.empty": "Description is required",
  }),
  category: Joi.string().valid("Men", "Women", "Kids").required().messages({
    "any.only": "Category must be one of Men, Women, or Kids",
    "string.empty": "Category is required",
  }),
  subCategory: Joi.string()
    .valid("Bottomwear", "Topwear", "Winterwear")
    .required()
    .messages({
      "any.only":
        "Subcategory must be one of Bottomwear, Topwear, or Winterwear",
      "string.empty": "Subcategory is required",
    }),
  price: Joi.number().min(15).max(1000).required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 15",
    "number.max": "Price must be less than or equal to 1000",
  }),
  onSolde: Joi.boolean().default(false).messages({
    "boolean.base": "On Sale must be a boolean value",
  }),
  soldedPrice: Joi.number()
    .min(15)
    .max(1000)
    .optional()
    .when("onSolde", {
      is: true,
      then: Joi.number().required().less(Joi.ref("price")).messages({
        "number.base": "Sale price must be a number",
        "number.min": "Sale price must be at least 15",
        "number.max": "Sale price must be less than or equal to 1000",
        "number.less": "Sale price must be less than the regular price",
      }),
    }),
  sizes: Joi.array()
    .items(Joi.string().valid("S", "M", "L", "XL"))
    .min(1)
    .required()
    .messages({
      "array.base": "Sizes must be an array",
      "array.min": "At least one size must be selected",
      "any.only": "Sizes must be one of S, M, L, XL",
      "array.empty": "Please select at least one size",
    }),
  popular: Joi.boolean().label("Popular").messages({
    "boolean.base": "Popular must be a boolean value",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});
