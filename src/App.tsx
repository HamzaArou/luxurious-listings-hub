import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ProjectForm from "@/pages/ProjectForm";
import ProjectDetails from "@/pages/ProjectDetails";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/login/f3e7b891-4a25-4c82-a0d9-7b6f9d9f7ad5" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projects/new" element={<ProjectForm />} />
        <Route path="/admin/projects/:id/edit" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;