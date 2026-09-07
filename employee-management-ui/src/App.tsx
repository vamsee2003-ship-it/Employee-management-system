import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeListPage from "./pages/EmployeeListPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/employees/add" element={<AddEmployeePage />} />
            <Route path="/employees/edit/:id" element={<EditEmployeePage />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;