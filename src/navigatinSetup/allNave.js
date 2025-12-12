import { FaHome } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { MdMovieCreation } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";


export const navigation = [
    {
        id:1,
        label: "Web Seriec",
        href: 'tv',
        icon: <MdLiveTv />
    },
    {
        id:2,
        label: "Movies",
        href: 'movie',
        icon: <MdMovieCreation/>
    }
]


export const mobileNav=[
    {
        id:3,
        label: "Home",
        href: '/',
        icon: <FaHome />
    },
    ...navigation,
    {
        id:4,
        label: "Search",
        href: '/search',
        icon: <IoSearchOutline/>
    }
]