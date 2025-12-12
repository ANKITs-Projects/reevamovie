import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center bg-black text-neutral-300 py-3">
      <div className="flex items-center justify-center gap-4">
      <Link to="/">About</Link>
      <Link to="/">Contact</Link>
      </div>
      <p className="text-sm">Created By Ankit Gupta With <span className="text-red-700 text-xl">&#10084;</span></p>
    </footer>
  )
}

export default Footer