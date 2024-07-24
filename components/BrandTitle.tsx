import React from "react"
import Image from "next/image"
import lightLogo from "@/public/grabbit-lm.svg"

export default function BrandTitle() {
  return (
    <div className="flex flex-row items-center">
      <Image src={lightLogo.src} alt="gRabbit" width="40" height="53" />
      <h4 className="font-title mx-1 text-2xl">
        <span className="text-primary">g</span>
        <span>rabbit</span>
      </h4>
    </div>
  )
}