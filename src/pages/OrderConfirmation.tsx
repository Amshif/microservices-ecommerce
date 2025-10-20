import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  const lastOrder = useAppSelector(state => state.orders.lastOrder);

  if (!lastOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No order found</h2>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-success/10 p-6">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-mono font-semibold">{lastOrder.id}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Items Ordered</p>
                <div className="space-y-2">
                  {lastOrder.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Shipping Information</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{lastOrder.customerInfo.name}</p>
                  <p className="text-muted-foreground">{lastOrder.customerInfo.email}</p>
                  <p className="text-muted-foreground">{lastOrder.customerInfo.phone}</p>
                  <p className="text-muted-foreground">{lastOrder.customerInfo.address}</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold">Total Paid</span>
                <span className="font-bold text-primary text-xl">
                  ${lastOrder.total.toFixed(2)}
                </span>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to{' '}
                  <span className="font-medium text-foreground">
                    {lastOrder.customerInfo.email}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/products">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
