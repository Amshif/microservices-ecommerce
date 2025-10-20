import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateOrderStatus, Order } from '@/store/slices/ordersSlice';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.orders);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerInfo.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    toast.success('Order status updated');
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', className: string }> = {
      pending: { variant: 'outline', className: 'text-yellow-500 border-yellow-500' },
      processing: { variant: 'outline', className: 'text-blue-500 border-blue-500' },
      shipped: { variant: 'outline', className: 'text-purple-500 border-purple-500' },
      delivered: { variant: 'outline', className: 'text-green-500 border-green-500' },
    };
    
    return (
      <Badge variant={variants[status].variant} className={variants[status].className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and shipments</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            {filteredOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerInfo.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customerInfo.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {/* Customer Info */}
                              <div>
                                <h3 className="font-semibold mb-2">Customer Information</h3>
                                <div className="space-y-1 text-sm">
                                  <p><span className="text-muted-foreground">Name:</span> {order.customerInfo.name}</p>
                                  <p><span className="text-muted-foreground">Email:</span> {order.customerInfo.email}</p>
                                  <p><span className="text-muted-foreground">Phone:</span> {order.customerInfo.phone}</p>
                                  <p><span className="text-muted-foreground">Address:</span> {order.customerInfo.address}</p>
                                </div>
                              </div>

                              <Separator />

                              {/* Order Items */}
                              <div>
                                <h3 className="font-semibold mb-2">Order Items</h3>
                                <div className="space-y-2">
                                  {order.items.map(item => (
                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                      <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded overflow-hidden bg-muted">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                      </div>
                                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <Separator />

                              {/* Order Status */}
                              <div>
                                <h3 className="font-semibold mb-2">Update Status</h3>
                                <Select
                                  value={order.status}
                                  onValueChange={(value) =>
                                    handleStatusChange(order.id, value as Order['status'])
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Separator />

                              {/* Total */}
                              <div className="flex justify-between items-center">
                                <span className="font-semibold">Total</span>
                                <span className="text-2xl font-bold text-primary">
                                  ${order.total.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg font-medium mb-2">No orders found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'Try a different search term' : 'Orders will appear here once customers make purchases'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default AdminOrders;
