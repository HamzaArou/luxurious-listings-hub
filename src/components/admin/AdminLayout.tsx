import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/admin/login/f3e7b891-4a25-4c82-a0d9-7b6f9d9f7ad5');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role !== 'admin') {
      navigate('/admin/login/f3e7b891-4a25-4c82-a0d9-7b6f9d9f7ad5');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-deepBlue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/admin/login/f3e7b891-4a25-4c82-a0d9-7b6f9d9f7ad5');
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            تسجيل الخروج
          </button>
        </div>
      </nav>
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
