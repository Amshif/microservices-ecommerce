import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart!', {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {product.stock < 20 && (
              <Badge className="absolute top-2 right-2" variant="destructive">
                Low Stock
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-gradient-primary">
                Featured
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.stock} in stock)</span>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
