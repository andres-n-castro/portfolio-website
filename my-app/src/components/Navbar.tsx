import Link from "next/link"
import {motion} from "motion/react"

export default function NavBar() {
    return (
        <div className="fixed top-6 z-50 flex border-4 bg-black border-white min-w-125 min-h-20 items-center justify-center gap-4 px-40 rounded-3xl left-1/2 -translate-x-1/2 font-(family-name:--font-teko-regular) text-3xl">
            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl" href="#home">   
                    HOME
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl" href="#about">   
                    ABOUT
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl" href="#career">
                    CAREER
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl" href="#projects">
                    PROJECTS
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl" href="#skills">
                    SKILLS
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-2xl" href="#contact">
                    CONTACT
                </Link>
            </motion.div> 

        </div>
    )
}