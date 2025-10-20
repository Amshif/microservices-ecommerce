import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSelectedCategory, setPriceRange } from '@/store/slices/productsSlice';
import { categories } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useAppDispatch();
  
  const { items, searchQuery, selectedCategory, priceRange } = useAppSelector(
    state => state.products
  );

  // Filter products
  const filteredProducts = items.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handlePriceChange = (value: number[]) => {
    dispatch(setPriceRange([value[0], value[1]]));
  };

  const clearFilters = () => {
    dispatch(setSelectedCategory('All'));
    dispatch(setPriceRange([0, 500]));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {items.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-6 lg:block"
                >
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-sm"
                      >
                        Clear All
                      </Button>
                    </div>

                    {/* Categories */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-medium">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <Badge
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => handleCategoryChange(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Price Range</h4>
                        <span className="text-sm text-muted-foreground">
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={500}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="py-4"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <X className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
