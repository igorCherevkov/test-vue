export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  experience: number;
  age: number;
  address: string;
}

export interface EmployeeRequest {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}
