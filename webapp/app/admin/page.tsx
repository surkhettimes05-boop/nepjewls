import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch metrics
  const productsCount = await prisma.product.count();
  
  // Calculate Revenue (Only PAID or SHIPPED)
  const completedOrders = await prisma.order.findMany({
    where: {
      status: {
        in: ['PAID', 'SHIPPED']
      }
    }
  });
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Active Orders (PENDING or PAID)
  const activeOrdersCount = await prisma.order.count({
    where: {
      status: {
        in: ['PENDING', 'PAID']
      }
    }
  });

  // Recent Acquisitions
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-4xl text-white mb-2">The Ledger Overview</h1>
        <p className="text-[#8C857B] font-light">Real-time insights into your acquisitions and inventory.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#1A1614] border border-white/10 p-8 flex flex-col">
          <span className="text-[#8C857B] text-[10px] uppercase tracking-widest mb-4">Total Revenue</span>
          <span className="font-serif text-4xl text-[#D4AF37]">Rs. {totalRevenue.toLocaleString()}</span>
        </div>
        
        <div className="bg-[#1A1614] border border-white/10 p-8 flex flex-col">
          <span className="text-[#8C857B] text-[10px] uppercase tracking-widest mb-4">Active Orders</span>
          <span className="font-serif text-4xl text-white">{activeOrdersCount}</span>
        </div>
        
        <div className="bg-[#1A1614] border border-white/10 p-8 flex flex-col">
          <span className="text-[#8C857B] text-[10px] uppercase tracking-widest mb-4">Masterpieces in Vault</span>
          <span className="font-serif text-4xl text-white">{productsCount}</span>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#1A1614] border border-white/10">
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-serif text-2xl text-white">Recent Acquisitions</h2>
          <Link href="/admin/orders" className="text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors">
            View All &rarr;
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-[#8C857B]">
                <th className="p-6 font-normal">Order ID</th>
                <th className="p-6 font-normal">Client</th>
                <th className="p-6 font-normal">Amount</th>
                <th className="p-6 font-normal">Status</th>
                <th className="p-6 font-normal">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#8C857B]">No acquisitions yet.</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-[#8C857B]">{order.id.split('-')[0]}...</td>
                    <td className="p-6">{order.user?.name || 'Guest'}</td>
                    <td className="p-6">Rs. {order.totalAmount.toLocaleString()}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border 
                        ${order.status === 'PAID' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 
                          order.status === 'SHIPPED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          'bg-white/5 text-[#8C857B] border-white/10'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6 text-[#8C857B]">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
