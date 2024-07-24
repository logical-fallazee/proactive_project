import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import React from "react"
import Link from "next/link"
import NavLink from "@/components/navbar/NavLink"
import BrandTitle from "@/components/BrandTitle"
import { PiShoppingCart } from "react-icons/pi"
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

export default function AppNav() {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-background shadow-lg mb-7"
      classNames={{
        item: [
          'text-black', 
          'hover:text-contrast', 
          'text-lg', 
          'font-body', 
          'cursor-pointer', 
          'border-b-3',
          'border-transparent',
          'data-[active=true]:text-primary',
          'data-[active=true]:border-primary',
          'data-[active=true]:font-medium',
        ],
      }}
    >
      <NavbarBrand>
        <a href="/">
          <BrandTitle />
        </a>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/all-products" label="All Products" />
        <NavLink href="/collections" label="Collections" />
        <NavbarItem>
          <HiMagnifyingGlassCircle size="30" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem as={Link} href="/cart">
          <span className="flex flex-row gap-2 items-center">
            <PiShoppingCart size={30}/>
          </span>
      </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
