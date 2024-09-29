'use client'
import { motion } from 'framer-motion'
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
    <motion.div
      whileHover={{
        scale: 1.4
      }}
      drag='x'
      dragConstraints={{ left: -10, right: 10 }}
      dragSnapToOrigin={true}
    >
      <Image 
        src={props.src}
        alt={props.alt}
        className={`rounded-2xl ${props.className}`}
        width={props.width}
        height={props.height}
      />
    </motion.div>
  )
}

export default Card 

