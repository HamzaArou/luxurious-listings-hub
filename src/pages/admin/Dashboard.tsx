import AdminLayout from "@/components/admin/AdminLayout";
import ProjectList from "@/components/admin/dashboard/ProjectList";

export default function Dashboard() {
  return (
    <AdminLayout>
      <ProjectList />
    </AdminLayout>
  );
}