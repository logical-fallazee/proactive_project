import React from 'react'

function getColor (category: string) {
  switch (category) {
    case 'toys':
      return '#d7e3fc'
    case 'beauty':
      return '#fec89a'
    case 'home goods':
      return '#fec5bb'
    case 'clothing':
      return '#e9edc9'
    case 'electronics':
      return '#faedcb'
    default:
      return '#d2d2cf'
  }
}

export default function CategoryBadge({category}: {category: string}) {
  return (
    <span style={{ backgroundColor: `${getColor(category)}` }} className="text-xs px-3 py-1 rounded-full text-slate-800 flex place-items-center">{category}</span>
  )
}