import { useAppSelector } from "@/store/hooks";


export const useDashboardData = () => {

  const products = useAppSelector((state) => state.products.items);
  const orders = useAppSelector((state) => state.orders.orders);

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 20).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

   const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: "package",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "shoppingCart",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: "trendingUp",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Low Stock Alerts",
      value: lowStockProducts,
      icon: "alertTriangle",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const recentOrders = orders.slice(0, 5);
  const lowStockItems = products.filter((p) => p.stock < 20).slice(0, 5);

  return { stats, recentOrders, lowStockItems };
 
}
