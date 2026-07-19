import Link from "next/link"

export default function NavBar() {
    return (
        <div className="fixed flex border-4 border-white min-w-125 min-h-20 items-center justify-center gap-4 px-40 rounded-3xl left-1/2 -translate-x-1/2">
            <Link className="rounded-4xl" href="#home">   
                HOME
            </Link>

            <Link className="rounded-4xl" href="#about">   
                ABOUT
            </Link> 

            <Link className="rounded-4xl" href="#work">
                WORK
            </Link>

            <Link className="rounded-4xl" href="#projects">
                PROJECTS
            </Link>

            <Link className="rounded-4xl" href="#skills">
                SKILLS
            </Link>

            <Link className="rounded-2xl" href="#contact">
                CONTACT
            </Link>   

        </div>
    )
}