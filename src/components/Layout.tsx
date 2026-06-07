import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShaderBackground from './ShaderBackground'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatWidget from './ChatWidget'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease },
  },
}

export default function Layout() {
  const location = useLocation()

  return (
    <>
      <ShaderBackground />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />

      <div className="relative z-10 pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>

      <ChatWidget />
    </>
  )
}
