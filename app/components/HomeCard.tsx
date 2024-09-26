'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  className?: string
}
const HomeCard = (props: Props) => {
  return (
    <motion.div className={`w-32 h-72 relative ${props.className}`}
      whileHover={{ 
        scale: 1.2,
        rotateX: 20,
      }}
    >
      <Image 
        src={'https://utfs.io/f/6zXnrGgTXfUwwUSENe7pYaUzRtZOf8STnqWXbgmPickGK1yD'} alt="Home page image of the next movie comming soon"
        layout="fill"
      />
    </motion.div>
  )
}

export default HomeCard
