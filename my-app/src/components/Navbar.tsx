import Link from "next/link"
import {motion} from "motion/react"

export default function NavBar() {
    return (
        <div className="fixed top-6 z-50 flex bg-white/10 backdrop-blur-md border border-white/15 shadow-inner shadow-white/10 min-w-125 min-h-15 items-center justify-center gap-4 px-40 rounded-3xl left-1/2 -translate-x-1/2 font-(family-name:--font-teko-regular) text-xl">
            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl hover:text-glow-blood transition-all duration-300" href="#home">
                    HOME
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl hover:text-glow-blood transition-all duration-300" href="#about">
                    ABOUT
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl hover:text-glow-blood transition-all duration-300" href="#career">
                    CAREER
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl hover:text-glow-blood transition-all duration-300" href="#projects">
                    PROJECTS
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-4xl hover:text-glow-blood transition-all duration-300" href="#skills">
                    SKILLS
                </Link>
            </motion.div>

            <motion.div whileHover={{scale: 1.1}}>
                <Link className="rounded-2xl hover:text-glow-blood transition-all duration-300" href="#contact">
                    CONTACT
                </Link>
            </motion.div>

        </div>
    )
}
