export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "LVDEV";
export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["user", "admin"];

export const signInDefaultValue = {
  email: "admin@exemple.com",
  password: "admin1234",
};

export const signUpDefaultValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const categoryFormDefaultValues = {
  label: "",
};

export const projectDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  description: "",
  link_url: "",
  isFeatured: false,
};
