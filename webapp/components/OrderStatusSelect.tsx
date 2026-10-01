"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
}

const allowedTransitions: Record<string, string[]> = {
  PENDING: ["PENDING", "CANCELLED"],
  PAID: ["PAID", "SHIPPED"],
  SHIPPED: ["SHIPPED"],
  CANCELLED: ["CANCELLED"],
};

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const options = allowedTransitions[currentStatus] || [currentStatus];

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    if (newStatus === currentStatus) return;

    setStatus(newStatus);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/orders/" + orderId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to update order status.");
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={loading || options.length === 1}
      className={"px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border outline-none appearance-none text-center " +
        (loading || options.length === 1 ? "opacity-60 cursor-default" : "cursor-pointer")}
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-[#1A1614] text-white">
          {option}
        </option>
      ))}
    </select>
  );
}
