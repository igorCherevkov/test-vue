import { promises as fs } from "fs";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import type { Employee } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<Employee>(event);

  const filePath = resolve("./data/employees.json");
  const file = await fs.readFile(filePath, "utf-8");
  const employees: Employee[] = JSON.parse(file);

  const newEmployee: Employee = {
    id: uuidv4(),
    firstName: body.firstName,
    lastName: body.lastName,
    experience: body.experience,
    age: body.age,
    address: body.address,
  };

  employees.push(newEmployee);
  await fs.writeFile(filePath, JSON.stringify(employees, null, 2), "utf-8");

  return newEmployee;
});
