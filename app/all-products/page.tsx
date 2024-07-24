"use client";

import React, { useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { fetchProductsInPages, fetchFilteredProductsInPages } from './actions';
import { ProductCategoryFilter, ProductPriceFilter } from './types';
import { Button, Select, SelectItem, Input } from '@nextui-org/react';
import { TbFence } from 'react-icons/tb';

const screenWidth = window.innerWidth;

function getDefaultLimit() {
  if (screenWidth >= 1280) return 8;
  return 6;
}

export default function AllProductsPage({ }) {
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [pages, setPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showLimit, setShowLimit] = React.useState(getDefaultLimit());
  const [filter, setFilter] = React.useState('');

  const handlePriceFilterChange = (e) => {
    if (e.target.value != '') {
      setFilter(e.target.value);
    }
  }

  useEffect(() => {
    if (filter.length > 0) {
      fetchFilteredProductsInPages(currentPage, showLimit, filter).then((res) => {
        setProducts(res?.body);
        setTotal(res?.total);
        setPages(res?.pages);
      });
    } else {
      fetchProductsInPages(currentPage, showLimit).then((res) => {
        setProducts(res?.body);
        setTotal(res?.total);
        setPages(res?.pages);
      });
    }
  }, [currentPage, showLimit, filter]);

  return (
    <div>
      <div className="w-full flex flex-row justify-start gap-x-2 items-center mb-2">
        <Select label="Filter by Category" className="w-60"
            selectionMode="multiple"
          >
            {Object.values(ProductCategoryFilter).map((filter) => (
              <SelectItem key={filter} value={filter}>{filter}</SelectItem>
            ))}
        </Select>
        <TbFence className="text-2xl text-zinc-400 mx-1" />
        <Select label="Filter by Price" className="w-40"
          selectionMode="single"
          onChange={(e) => handlePriceFilterChange(e)}
        >
          {Object.values(ProductPriceFilter).map((filter) => (
            <SelectItem 
              key={filter}
              value={filter}
            >
              {filter}
            </SelectItem>
          ))}
        </Select>
        <TbFence className="text-2xl text-zinc-400 mx-1" />
        <Input type="number"
          className="w-fit"
          classNames={{ inputWrapper: 'hover:border-accent' }}
          variant="bordered"
          color="secondary"
          value={showLimit.toString()}
          min={1}
          max={total}
          onChange={(e) => setShowLimit(parseInt(e.target.value))}
        />
        <span className="text-xs line-clamp-2 w-min leading-snug text-left ml-1">Products per Page</span>
      </div>
      {/* Pagination buttons */}
        <div className="flex flex-row flex-wrap w-full gap-1 mb-3">
          {[...Array(pages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              size="md"
              variant="solid"
              className={`${i+1 === currentPage ? 'bg-secondary text-white font-bold ' : ''}`}
              isIconOnly
              disableRipple
            >
                {i + 1}
              </Button>
          ))}
        </div>
      {/* Content */}
      <div className="w-full border-t-1 pt-6 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products?.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>
    </div>
  )
}
