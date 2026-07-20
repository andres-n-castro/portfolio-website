"use client"

import {motion, useMotionValue, useSpring} from "motion/react"
import {useRef} from "react"

const GLITCH_RANGE = 6
const GLITCH_INTERVAL_MS = 120

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen gap-30">
            <HomeCard/>
            <Hero/>
        </div>
    )
}

function Hero() {
    const cardRef = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, {stiffness: 150, damping: 15, mass: 0.5})
    const springY = useSpring(y, {stiffness: 150, damping: 15, mass: 0.5})

    const backX = useMotionValue(0)
    const backY = useMotionValue(0)
    const backSpringX = useSpring(backX, {stiffness: 500, damping: 12, mass: 0.3})
    const backSpringY = useSpring(backY, {stiffness: 500, damping: 12, mass: 0.3})
    const glitchInterval = useRef<ReturnType<typeof setInterval> | null>(null)

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return

        const offsetX = e.clientX - rect.left - rect.width / 2
        const offsetY = e.clientY - rect.top - rect.height / 2

        x.set(offsetX / 4)
        y.set(offsetY / 4)
    }

    function handleMouseEnter() {
        if (glitchInterval.current) return

        glitchInterval.current = setInterval(() => {
            backX.set((Math.random() - 0.5) * GLITCH_RANGE)
            backY.set((Math.random() - 0.5) * GLITCH_RANGE)
        }, GLITCH_INTERVAL_MS)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)

        if (glitchInterval.current) {
            clearInterval(glitchInterval.current)
            glitchInterval.current = null
        }
        backX.set(0)
        backY.set(0)
    }

    return (
        <div className="relative min-w-110 min-h-140">
            {/*back card*/}
            <motion.div
            className="absolute inset-0 bg-white/50 rounded-[10px]"
            animate={{scale: 1}}
            initial={{scale: 0}}
            style={{x: backSpringX, y: backSpringY}}
            />

            {/*front card*/}
            <motion.div
            ref={cardRef}
            className="absolute inset-0 bg-white rounded-[10px]"
            initial={{scale: 0}}
            animate={{scale: 1}}
            style={{x: springX, y: springY}}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            transition={{scale: {duration: 0.4}}}
            />
        </div>
    )
}

function HomeCard() {
    return (
        <motion.div className="flex flex-col items-start min-w-150 min-h-150 gap-9">
            {/*sub-container-1*/}
            <div className="flex justify-center items-center border-3 border-white rounded-2xl min-h-10  min-w-25 gap-3 p-2">
                <motion.div
                className="rounded-4xl bg-red-600 min-h-3 min-w-3 glow-blood"
                animate={{scale: [1, 1.25, 1], opacity: [1, 0.65, 1]}}
                transition={{duration: 1.6, repeat: Infinity, ease: "easeInOut"}}
                />


                <span className="text-xl font-(family-name:--font-teko-regular)">
                    Open for new grad work
                </span>
            </div>

            {/*name-sub-container-2*/}
            <p className="text-8xl font-(family-name:--font-ethnocentric) text-white">
                Andres
                <br />
                Castro
            </p>

            {/* this is a statement that will eventually rotate statements*/}
            <p className="text-7xl font-(family-name:--font-teko-regular)">
                I'm an AI Engineer
            </p>

            {/*small paragraph*/}
            <p className="text-5xl font-(family-name:--font-teko-light)">
                I build AI-driven products and backend infrastructure that transform data
                <br />
                into intelligent experiences and meaningful solutions.
            </p>
        </motion.div>
    )
}
