import { PrismaClient } from '@prisma/client';
import OrderStatusSelect from '../../../components/OrderStatusSelect';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
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
        <h1 className="font-serif text-4xl text-white mb-2">Acquisitions Ledger</h1>
        <p className="text-[#8C857B] font-light">Manage and track all client orders.</p>
      </div>

      <div className="bg-[#1A1614] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-[#8C857B] bg-white/[0.02]">
                <th className="p-6 font-normal">Order Details</th>
                <th className="p-6 font-normal">Client Info</th>
                <th className="p-6 font-normal">Items</th>
                <th className="p-6 font-normal">Amount & Payment</th>
                <th className="p-6 font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#8C857B]">The ledger is currently empty.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    
                    {/* Order Details */}
                    <td className="p-6 align-top">
                      <div className="text-[#8C857B] text-xs mb-1 font-mono">{order.id}</div>
                      <div className="text-white text-xs">{new Date(order.createdAt).toLocaleString()}</div>
                    </td>
                    
                    {/* Client Info */}
                    <td className="p-6 align-top">
                      <div className="text-white mb-1">{order.user?.name || 'Guest'}</div>
                      <div className="text-[#8C857B] text-xs mb-1">{order.user?.email || 'N/A'}</div>
                      <div className="text-[#8C857B] text-xs">{order.user?.phone || 'N/A'}</div>
                    </td>
                    
                    {/* Items */}
                    <td className="p-6 align-top">
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-10 h-12 bg-black overflow-hidden flex-shrink-0 border border-white/10">
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="text-white text-xs">{item.product.name}</span>
                              <span className="text-[#8C857B] text-[10px]">Qty: {item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    
                    {/* Amount & Payment */}
                    <td className="p-6 align-top">
                      <div className="text-white mb-1">Rs. {order.totalAmount.toLocaleString()}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8C857B]">Via {order.paymentMethod}</div>
                    </td>
                    
                    {/* Status Dropdown */}
                    <td className="p-6 align-top text-right">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </td>
                    
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
