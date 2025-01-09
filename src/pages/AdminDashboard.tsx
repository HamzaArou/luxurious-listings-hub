import AdminLayout from "@/components/admin/AdminLayout";
import ProjectList from "@/components/admin/ProjectList";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProjectList />
    </AdminLayout>
  );
};

export default AdminDashboard;