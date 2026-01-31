import { promises as fs } from "fs";
import { resolve } from "path";
import type { Employee, EmployeeRequest } from "~/types";

export default defineEventHandler(async (event): Promise<EmployeeRequest> => {
  const query = getQuery(event);

  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  const filePath = resolve("./data/employees.json");
  const file = await fs.readFile(filePath, "utf-8");

  const employees: Employee[] = JSON.parse(file);

  const start = (page - 1) * limit;
  const paginatedEmployees = employees.slice(start, start + limit);

  return {
    data: paginatedEmployees,
    total: employees.length,
    page,
    limit,
  };
});
