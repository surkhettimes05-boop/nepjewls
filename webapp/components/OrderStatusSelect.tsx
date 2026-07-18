'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      router.refresh(); // Refresh the page to update server components
    } catch (error) {
      console.error(error);
      alert('Failed to update order status.');
      setStatus(currentStatus); // Revert on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={loading}
      className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border outline-none appearance-none cursor-pointer text-center
        ${status === 'PAID' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 
          status === 'SHIPPED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
          status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
          'bg-white/5 text-[#8C857B] border-white/10'}
        ${loading ? 'opacity-50 cursor-wait' : ''}
      `}
    >
      <option value="PENDING" className="bg-[#1A1614] text-white">PENDING</option>
      <option value="PAID" className="bg-[#1A1614] text-[#D4AF37]">PAID</option>
      <option value="SHIPPED" className="bg-[#1A1614] text-green-400">SHIPPED</option>
      <option value="CANCELLED" className="bg-[#1A1614] text-red-400">CANCELLED</option>
    </select>
  );
}
