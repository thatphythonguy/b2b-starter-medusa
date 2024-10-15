import { Container } from "@medusajs/ui"
import { QueryCompany } from "@starter/types"
import EmployeeWrapper from "./employee-wrapper"
import { getCustomer } from "@lib/data/customer"

const EmployeesCard = async ({ company }: { company: QueryCompany }) => {
  const { employees } = company
  const customer = await getCustomer()

  return (
    <Container className="p-0 overflow-hidden">
      <div className="flex flex-col">
        {employees
          .sort((a) => (a.customer.email === customer?.email ? -1 : 1))
          .map((employee) => (
            <EmployeeWrapper
              key={employee.id}
              employee={employee}
              company={company}
            />
          ))}
      </div>
    </Container>
  )
}

export default EmployeesCard