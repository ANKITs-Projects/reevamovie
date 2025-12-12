import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import userIcon from '../assets/user.png'
import {Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../navigatinSetup/allNave';




const Header = () => {
    const location =useLocation()
    const removeSpace=location?.search?.slice(3)?.split("%20")?.join(" ")
    let [searchInput, setSearchInput]=useState(removeSpace)
    let navigate = useNavigate()

    useEffect(()=>{
       if(searchInput){
        navigate(`/search?q=${searchInput}`)
       }
            
    },[searchInput])

    const handelSubmit =(search)=>{
        search.preventDefault()
    }

    return (
        <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-50 z-40">
            <div className="container mx-auto px-3 flex items-center h-full">
                <Link to={'/'}>
                    <img src={logo}
                        alt="logo"
                        width={120}
                    />
                </Link>
                <nav className="hidden  lg:flex items-center gap-1 ml-5">
                    {
                        navigation.map((nav, index) => {
                            return (
                                <div key={nav.id}>
                                    <NavLink key={nav.label} to={nav.href} 
                                    className={({ isActive }) => `px-2 hover:text-neutral-50 ${isActive && "text-neutral-50"}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>
                <div className="ml-auto flex items-center gap-5">
                    <form className="flex items-center gap-2" onSubmit={handelSubmit}>
                        <input type="text" placeholder='Search'
                            className="bg-transparent px-4 py-1 border-none outline-none hidden lg:block"
                            onChange={(search)=>setSearchInput(search.target.value)}
                            value={searchInput}
                        />
                        <button className="text-2xl text-white">
                        <IoSearchOutline />
                        </button>
                    </form>
                    <div className="w-7 h-7 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
                        <img src={userIcon} alt="" width=' w-full h-full '/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header