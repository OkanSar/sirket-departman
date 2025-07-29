export interface User {
  Id: number
  NameSurname: string
  DepartmentId: number
  department?: {
    Id: number
    Name: string
  }
}
