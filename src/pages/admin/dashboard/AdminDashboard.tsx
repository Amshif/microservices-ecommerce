import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import RecentOrder from "./RecentOrder";
import LowStock from "./LowStock";
import DashboardStats from "./DashboardStats";
import { useDashboardData } from "@/hooks/useDashboardData";

const AdminDashboard = () => {
  const { stats, recentOrders, lowStockItems } = useDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your store overview.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Recent Orders & Low Stock */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <RecentOrder recentOrders={recentOrders} />

        {/* Low Stock Alerts */}
        <LowStock lowStockItems={lowStockItems} />
      </div>
    </div>
  );
};

export default AdminDashboard;
