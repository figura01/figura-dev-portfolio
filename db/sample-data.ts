import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John",
      email: "admin@exemple.com",
      role: "admin",
      password: hashSync("admin1234", 10),
    },
    {
      name: "Math",
      email: "user@exemple.com",
      role: "user",
      password: hashSync("user1234", 10),
    },
  ],
  categories: [
    {
      label: "Frontend",
    },
    {
      label: "Fullstack",
    },
    {
      label: "Mobile",
    },
    {
      label: "Design",
    },
  ],
};

export default sampleData;
