import React from 'react'
import { IoMusicalNote } from 'react-icons/io5'

export default function CollectionsPage() {
  return (
    <div>
      <h3 className="flex flex-row justify-center items-baseline">
        This will be <IoMusicalNote/>
        <span className="line-through mx-1 text-xs">an everlasting love</span>
        a Collections Page</h3>
    </div>
  )
}
