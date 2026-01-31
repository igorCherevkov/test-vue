import { promises as fs } from "fs";
import { resolve } from "path";
import type { Employee } from "~/types";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id)
    throw createError({ statusCode: 400, statusMessage: "id не указан" });

  const body = await readBody<Employee>(event);

  const filePath = resolve("./data/employees.json");
  const file = await fs.readFile(filePath, "utf-8");
  const employees: Employee[] = JSON.parse(file);

  const index = employees.findIndex((e) => e.id === id);

  if (index === -1)
    throw createError({
      statusCode: 404,
      statusMessage: "сотрудник не найден",
    });

  employees[index] = {
    ...employees[index],
    id,
    firstName: body.firstName,
    lastName: body.lastName,
    experience: body.experience,
    age: body.age,
    address: body.address,
  };

  await fs.writeFile(filePath, JSON.stringify(employees, null, 2), "utf-8");

  return employees[index];
});
