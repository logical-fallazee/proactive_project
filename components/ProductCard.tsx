'use client';

import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input } from '@nextui-org/react'
import CategoryBadge from '@/components/CategoryBadge'
import { GiCarrot } from 'react-icons/gi';
import { useCartStore } from '@/app/cart/zustandStore';

export default function ProductCard({product}) {
  const cartStore = useCartStore();
  const cartItem = cartStore.items_in_cart.find((item) => item.id === product.product_id);
  const [stockQuantity, setStockQuantity] = React.useState(cartItem ? cartItem.stock : product.quantity_in_stock);
  const [itemQuantity, setItemQuantity] = React.useState(cartItem ? cartItem.quantity : 0);
  const [cartQuantity, setCartQuantity] = React.useState(cartItem ? cartItem.quantity : 0);

  function handleInitialClick(e) {
    e.preventDefault();
    setItemQuantity(1);
  }

  function handleInputItemQuantity(e) {
    if (e.target.value > stockQuantity) {
      setItemQuantity(stockQuantity);
    } else {
      setItemQuantity(e.target.value);
    }
  }

  function handleAddToCart(e) {
    e.preventDefault();

    let newCartQuantity = itemQuantity;

    if (newCartQuantity < cartQuantity) {
      let newStockQuantity = stockQuantity + (cartQuantity - newCartQuantity);
      setStockQuantity(newStockQuantity);
      setCartQuantity(parseInt(newCartQuantity));
    } else {
      let newStockQuantity = stockQuantity - (newCartQuantity - cartQuantity);
      setStockQuantity(newStockQuantity);
      setCartQuantity(parseInt(newCartQuantity));
    }
  }

  function updateCart() {
    cartStore.updateCart(product.product_id, cartQuantity, stockQuantity);
  }

  function cartCheck() {
    return itemQuantity != cartQuantity;
  }

  useEffect(() => {
    updateCart();
  }, [cartQuantity, stockQuantity]);
  
  return (
    <Card className="w-full min-w-56 max-w-[80%] md:max-w-full" shadow="sm">
      <CardHeader className="flex flex-col items-start">
        <div className="flex flex-row justify-between w-full">
          <h3 className="font-semibold font-body text-lg">{product.brand}</h3>
          <CategoryBadge category={product.category} />
        </div>
        <h4 className="text-sm">${product.price}</h4>
      </CardHeader>
      <Divider />
      <CardBody className="w-full bg-white items-center">
        <Image src={product.image_url} alt={product.brand}
          className="object-scale-down h-48"
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row justify-between">
        <p className="text-xs">
          <span className="mr-1">{stockQuantity > 0 ? `${stockQuantity} in stock` : 'Out of stock'}</span>
        </p>
        {itemQuantity < 1 ? (
          <Button color="primary" variant="ghost" fullWidth onClick={handleInitialClick} disabled={stockQuantity===0}>
            <span className="flex flex-row items-center justify-center text-lg font-title">
              <GiCarrot className="-ml-8 mr-1 size-8" />
              Grab It!
            </span>
          </Button>
        ) : (
          <form onSubmit={handleAddToCart} className="w-full flex flex-row justify-center">
            <Input type="number"
              min="0"
              value={itemQuantity}
              max={stockQuantity} 
              onChange={handleInputItemQuantity}
              variant="bordered"
              className="mx-5 w-[50%]"
            />
            <Button type="submit" color={cartCheck() ? 'success' : 'default' } variant={cartCheck() ? 'solid' : 'flat'} className={`${cartCheck() ? 'text-white' : 'text-zinc-500'} font-body w-min`} disabled={!cartCheck()}>
              <span className="text-sm">
                Update Cart
              </span>
            </Button>          
          </form>
        )}
      </CardFooter>
    </Card>
  )
}
