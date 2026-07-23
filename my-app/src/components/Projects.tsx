import {motion, useMotionValue, useSpring} from "motion/react";
import {useRef} from "react";
import Link from "next/link"

const GLITCH_RANGE = 6
const GLITCH_INTERVAL_MS = 120
const MAX_TILT = 6


export default function Projects() {
    return (
        <div className="flex flex-col items-center min-h-screen gap-15 pt-32">
            <div className="flex flex-row items-center justify-center gap-7">
                <span className="border-t min-w-2xl min-h-1"></span>
                <span className="text-6xl font-(family-name:--font-ethnocentric) text-white text-glow-blood">
                    PROJECTS
                </span>
                <span className="border-t min-w-2xl min-h-1"></span>
            </div>

            <div className="grid grid-cols-2 gap-30">
                <ProjectCard
                title="PixelProof"
                keyWords={["keyword 1", "keyword 2", "keyword 3","keyword 4", "keyword 5","keyword 6"]}
                projectLink="https://github.com/andres-n-castro/PixelProof"
                projectImageLink="/PixelProofImage.png"
                projectDescription="AI-powered deepfake detection platform leveraging computer vision and deep learning to analyze videos, identify manipulated content, and deliver scalable, real-time inference through an asynchronous backend."
                />

                <ProjectCard
                title="ShiftHero"
                keyWords={["keyword 1", "keyword 2", "keyword 3","keyword 4", "keyword 5","keyword 6"]}
                projectLink="https://github.com/andres-n-castro/CareBridge-Hub"
                projectImageLink="/ShiftHeroImage.jfif"
                projectDescription="AI healthcare application that transforms nurse-patient conversations into structured SBAR handoff reports using speech recognition, Retrieval-Augmented Generation, and a scalable FastAPI backend."
                />

                <ProjectCard
                title="KnightBlocks"
                keyWords={["keyword 1", "keyword 2", "keyword 3","keyword 4", "keyword 5","keyword 6"]}
                projectLink="https://github.com/HareshP31/knight-blocks"
                projectImageLink="/KnightBlocksImage.png"
                projectDescription="Hands-free computer interaction system using real-time facial tracking, eye gestures, and computer vision to translate natural facial movements into precise cursor control and commands."
                />

                <ProjectCard
                title="Second Fate"
                keyWords={["keyword 1", "keyword 2", "keyword 3","keyword 4", "keyword 5","keyword 6"]}
                projectLink="https://github.com/andres-n-castro/Second-Fate"
                projectImageLink="/SecondFateImage.png"
                projectDescription="32-bit Norse-inspired Metroidvania featuring modular gameplay systems, dynamic boss encounters, and progression-driven exploration, developed while leading a five-person Agile game development team."
                />

                <ProjectCard
                title="OnPAR"
                keyWords={["keyword 1", "keyword 2", "keyword 3","keyword 4", "keyword 5","keyword 6"]}
                projectLink="https://github.com/ChrisTuck04/OnPAR"
                projectImageLink="/OnPARImage.png"
                projectDescription="Mood-based journaling platform where daily emotions dynamically transformed the interface, introducing users to an engaging, personalized reflection experience through a responsive React frontend."
                />

                <ProjectCard
                title="AutLaw"
                keyWords={["keyword 1", "keyword 2", "keyword 3","keyword 4", "keyword 5","keyword 6"]}
                projectLink="/"
                projectImageLink="/AutoLawImage.jpg"
                projectDescription="Multi-agent AI legal assistant leveraging LangGraph orchestration to coordinate specialized agents, helping lawyers and clients analyze cases through an intelligent, scalable web platform."
                />
            </div>
        </div>
    )
}

interface ProjectCardProps {
    title: string
    keyWords: string[]
    projectLink: string
    projectImageLink: string 
    projectDescription: string
}

function ProjectCard({title, keyWords, projectLink, projectImageLink, projectDescription} : ProjectCardProps){

    const cardRef = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, {stiffness: 150, damping: 15, mass: 0.5})
    const springY = useSpring(y, {stiffness: 150, damping: 15, mass: 0.5})

    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const springRotateX = useSpring(rotateX, {stiffness: 150, damping: 15, mass: 0.5})
    const springRotateY = useSpring(rotateY, {stiffness: 150, damping: 15, mass: 0.5})

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

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return

        const percentX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const percentY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

        rotateY.set(percentX * MAX_TILT)
        rotateX.set(-percentY * MAX_TILT)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
        rotateX.set(0)
        rotateY.set(0)

        if (glitchInterval.current) {
            clearInterval(glitchInterval.current)
            glitchInterval.current = null
        }
        backX.set(0)
        backY.set(0)
    }

    return (
        <div className="relative min-h-175 min-w-150" style={{perspective: 1200}}>
            {/*back card*/}
            <motion.div
            className="absolute inset-0 rounded-4xl"
            style={{x: backSpringX, y: backSpringY}}
            >

            </motion.div>

            {/*front card*/}
            <motion.div
            ref={cardRef}
            className="absolute inset-0 border border-black rounded-4xl flex flex-col rounded-b-3xl overflow-hidden"
            style={{x: springX, y: springY, rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1200}}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center justify-center w-full h-full rounded-t-4xl overflow-hidden">
                    <img className="w-full" src={projectImageLink} alt="image could not load" />
                </div>

                <div className="flex flex-col items-start bg-charcoal w-full h-full p-8 gap-3">
                    {/*title */}
                    <span className="font-(family-name:--font-ethnocentric) text-3xl">{title}</span>

                    {/*description */}
                    <p className="font-(family-name:--font-teko-regular) text-2xl text-[#8f8779]">{projectDescription}</p>

                    {/*key words*/}
                    <div className="flex flex-row flex-wrap gap-3">
                        {keyWords.map((keyword) => (
                            <KeywordComponent key={keyword} keyword={keyword}/>
                        ))}
                    </div>

                    {/*separator */}
                    <span className="min-w-full border-t"></span>

                    {/*link to github repo*/}
                    <Link
                    href={projectLink}
                    className="border border-white rounded-xl min-h-10  min-w-4 px-2 font-(family-name:--font-teko-regular) text-xl pt-1">
                        View Details
                    </Link>
                </div>

            </motion.div>
        </div>
    )
};

interface keywordComponentProps {
    keyword: string
}

function KeywordComponent({keyword} : keywordComponentProps) {
    return (
        <div className="flex items-center justify-center border border-white rounded-xl min-h-10  min-w-20 px-2">
            <span className="text-xl font-(family-name:--font-teko-regular) [word-spacing:0.3rem]">{keyword}</span>
        </div>
    )
}