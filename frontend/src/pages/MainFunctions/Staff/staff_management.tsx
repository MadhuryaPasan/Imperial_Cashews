import Staff_department from './subpages/Staff_department'
import Staff_Employee from './subpages/Staff_Employee'
import Staff_payroll from './subpages/Staff_payroll'
import Staff_salary from './subpages/Staff_salary'


const staff_management = () => {
  return (
    <>
      <div>staff_management</div>
      <Staff_Employee/>
      <Staff_salary/>
      <Staff_department/>
      <Staff_payroll/>
    </>
  )
}

export default staff_management