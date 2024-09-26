'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  className?: string
}

const HomeSquares = (props: Props) => {
  return (
    <motion.div className={`w-36 h-36 bg-gradient-to-tr from-[#000000] from-30% to-pink-600
      animate-pulse absolute ${props.className}`}>
    </motion.div>
  )
}

export default HomeSquares
