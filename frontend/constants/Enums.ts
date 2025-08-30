/* eslint-disable @typescript-eslint/no-redeclare */
// dont use typescript enums, define as const

export const Category = {
  ELECTRONICS: "Electronics",
  FASHION: "Fashion",
  FOOD_AND_DRINKS: "Food & Drinks",
  FURNITURE: "Furniture",
  EDUCATION: "Education",
  OTHERS: "Others",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

// map category to colours
export const CategoryColour = {
  [Category.ELECTRONICS]: "#FF0000", //red
  [Category.FASHION]: "#0000FF", //blue
  [Category.FOOD_AND_DRINKS]: "#008000", //green
  [Category.FURNITURE]: "#FFA500", //orange
  [Category.EDUCATION]: "#800080", //purple
  [Category.OTHERS]: "#FFC0CB",//yellow
} as const;

export type CategoryColour =
  (typeof CategoryColour)[keyof typeof CategoryColour];

export const CategoryEmoji = {
  [Category.ELECTRONICS]: "💻", // laptops, gadgets
  [Category.FASHION]: "👗", // clothes, style
  [Category.FOOD_AND_DRINKS]: "🍔", // meals, beverages
  [Category.FURNITURE]: "🛋️", // sofa, furniture
  [Category.EDUCATION]: "📚", // books, learning
  [Category.OTHERS]: "🛍️", // general/other items
} as const;

export type CategoryEmoji = (typeof CategoryEmoji)[keyof typeof CategoryEmoji];

export const Condition = {
  NEW: "New",
  WELL_USED: "Well Used",
  HEAVY_USED: "Heavy Used",
} as const;

export type Condition = (typeof Condition)[keyof typeof Condition];
