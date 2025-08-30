/* eslint-disable @typescript-eslint/no-redeclare */
// dont use typescript enums, define as const

export const Category = {
  ELECTRONICS : "Electronics",
  FASHION : "Fashion",
  FOOD_AND_DRINKS : "Food & Drinks",
  FURNITURE : "Furniture",
  EDUCATION : "Education",
  OTHERS : "Others",
} as const

export type Category = (typeof Category)[keyof typeof Category]

// map category to colours
export const CategoryColour = {
  [Category.ELECTRONICS] : "red",
  [Category.FASHION] : "blue",
  [Category.FOOD_AND_DRINKS] : "green",
  [Category.FURNITURE] : "orange",
  [Category.EDUCATION] : "purple",
  [Category.OTHERS] : "yellow",
} as const

export type CategoryColour = (typeof CategoryColour)[keyof typeof CategoryColour]



export const Condition = {
  NEW : "New",
  WELL_USED : "Well Used",
  HEAVY_USED : "Heavy Used",
} as const

export type Condition = (typeof Condition)[keyof typeof Condition]
