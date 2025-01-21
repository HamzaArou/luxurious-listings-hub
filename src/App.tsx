import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import ProjectDetails from "@/pages/ProjectDetails";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ProjectForm from "@/pages/ProjectForm";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/components/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <FloatingContact />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project">
          <Route index element={<Navigate to="/" replace />} />
          <Route path=":id" element={<ProjectDetails />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/project/new" element={<ProjectForm />} />
        <Route path="/admin/project/:id" element={<ProjectForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;