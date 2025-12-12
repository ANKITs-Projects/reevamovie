import React from 'react'
import { mobileNav } from '../navigatinSetup/allNave'
import { NavLink } from "react-router-dom";


const MobileNavigation = () => {
    

  return (
    <section className="lg:hidden h-14 bg-black z-40 backdrop-blur-xl bg-opacity-70 fixed bottom-0 w-full">
        <div className="flex items-center justify-between h-full text-neutral-400">
            {
                mobileNav.map((nav,index)=>{
                    return (
                        <div key={index}>
                            <NavLink key={nav.label}
                                    to={nav.href}
                                    className={(({isActive})=>`px-3  flex h-full items-center flex-col justify-center
                                            ${isActive && 'text-neutral-50'}`)}   
                            >
                                <div className="text-2xl">
                                    {nav.icon}
                                </div>
                                <p className="text-sm">
                                    {nav.label}
                                </p>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default MobileNavigation