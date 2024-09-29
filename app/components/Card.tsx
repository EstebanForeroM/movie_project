'use client'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  width: number,
  height: number,
  src: string
  alt: string
}
const Card = (props: Props) => {
  return (
      <Image 
        src={props.src}
        alt={props.alt}
        className={`rounded-2xl ${props.className}`}
        width={props.width}
        height={props.height}
      />
  )
}

export default Card 

