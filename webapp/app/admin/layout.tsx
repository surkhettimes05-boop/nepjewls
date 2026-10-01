import AdminSidebar from "../../components/AdminSidebar";
import { isAdminAuthenticated } from "../../lib/admin-auth";

export const metadata = {
  title: 'NepJewls Ledger | Admin',
  description: 'Backend management for NepJewls',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-luxury-bg text-[#E5E0D8] selection:bg-luxury-gold/20">
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-8 md:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
