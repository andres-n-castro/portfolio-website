"use client";

import {motion, useMotionValue, useSpring} from "motion/react";
import {useRef} from "react";

const GLITCH_RANGE = 6
const GLITCH_INTERVAL_MS = 120

export default function Skills() {
    return (
        <div className="flex flex-col items-center min-h-screen gap-15 pt-32">
            <div className="flex flex-row items-center justify-center gap-7">
                <span className="bg-white min-w-2xl min-h-1"></span>
                <span className="text-6xl font-(family-name:--font-ethnocentric) text-white">
                    TECHNICAL SKILLS
                </span>
                <span className="bg-white min-w-2xl min-h-1"></span>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-16 place-content-center">
                <SkillCard
                title="Languages"
                skills={[
                    "Java", 
                    "Python", 
                    "C", 
                    "HTML/CSS", 
                    "JavaScript", 
                    "TypeScript", 
                    "SQL", 
                    "C#"
                ]}
                />
                <SkillCard
                title="Frameworks"
                skills={[
                    "React", 
                    "Tailwind CSS", 
                    "Node.js", 
                    "Next.js", 
                    "FastAPI", 
                    "LangGraph", 
                    "OpenCV", 
                    "MediaPipe", 
                    "SQLAlchemy", 
                    "Uvicorn", 
                    "Tkinter"
                ]}
                />
                <SkillCard
                title="AI & ML"
                skills={[
                    "Scikit-Learn", 
                    "PyTorch", 
                    "Pandas", 
                    "NumPy", 
                    "Matplotlib", 
                    "In-Context Learning", 
                    "Multi-Agent Orchestration", 
                    "Deep Learning", 
                    "YOLO11n", 
                    "ResNet", 
                    "LSTM"
                ]}
                />
                <SkillCard
                title="Tools"
                skills={[
                    "Docker", 
                    "Git",
                    "Pydantic", 
                    "KaggleAPI", 
                    "Jira Spaces", 
                    "PostgreSQL", 
                    "MySQL", 
                    "Redis", 
                    "Celery", 
                    "Unity"
                ]}
                />
            </div>
        </div>
    )
}

interface SkillCardProps {
    title: string
    skills: string[]
}

function SkillCard({title, skills}: SkillCardProps) {

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, {stiffness: 150, damping: 15, mass: 0.5})
    const springY = useSpring(y, {stiffness: 150, damping: 15, mass: 0.5})

    const backX = useMotionValue(0)
    const backY = useMotionValue(0)
    const backSpringX = useSpring(backX, {stiffness: 500, damping: 12, mass: 0.3})
    const backSpringY = useSpring(backY, {stiffness: 500, damping: 12, mass: 0.3})
    const glitchInterval = useRef<ReturnType<typeof setInterval> | null>(null)

    function handleMouseEnter() {
        x.set(20)
        y.set(-20)

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
        <div className="relative min-h-110 min-w-5xl">
            {/*back card*/}
            <motion.div
            className="absolute inset-0 bg-amber-100 rounded-4xl"
            style={{x: backSpringX, y: backSpringY}}
            />

            {/*front card*/}
            <motion.div
            className="absolute inset-0 bg-white rounded-4xl flex flex-col gap-6 p-10"
            style={{x: springX, y: springY}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                <span className="text-4xl font-(family-name:--font-ethnocentric) text-black">
                    {title}
                </span>

                <ul className="flex-1 min-h-0 flex flex-col flex-wrap content-start gap-x-10 gap-y-3 list-disc list-inside">
                    {skills.map((skill) => (
                        <li key={skill} className="text-4xl font-(family-name:--font-teko-light) text-black">
                            {skill}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    )
}