"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface WorkEntry {
    title: string
    company: string
    dates: string
    summary: string
    description: string
    responsibilities: string[]
    techStack: string[]
}

const WORK_ENTRIES: WorkEntry[] = [
    {
        title: "Computer Vision Engineer & Project Manager",
        company: "QBxR",
        dates: "Jan 2026 - Aug 2026",
        summary: "Building AI-powered computer vision software for football analytics. Developed a synthetic data generation pipeline, trained real-time object detection models, and integrated AI predictions into Unity's 3D navigation system for automated play analysis.",
        description: "As a Computer Vision Engineer and Project Manager at QBxR, I develop AI-powered computer vision software for football analytics. My work includes building synthetic data generation pipelines, training and optimizing YOLO object detection models, integrating AI outputs into Unity's 3D navigation system, and leading Agile development to deliver production-ready solutions for project sponsors.",
        responsibilities: [
            "Built production-ready computer vision pipelines for football analytics",
            "Developed synthetic data pipelines and fine-tuned YOLO models for real-time player detection",
            "Integrated AI outputs into Unity's 3D simulation pipeline and coordinated Agile development"
        ],
        techStack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    },
    {
        title: "B.S.",
        company: "University of Central Florida",
        dates: "Aug 2022 - Aug 2026",
        summary: "UCF Student with coursework in Data Structures, Game Development, Applied AI, and discrete structures",
        description: "Currently pursuing a Bachelor of Science at the University of Central Florida.My academic journey has ben focused on building a strong foundation in computer science and AI. I have completed coursework in Data Structures and Algorithms, Discrete Structures, creating ML and DL models from scratch, and Game Development using Unity. These courses have provided me with practical skills that I apply in my projects and work.",
        responsibilities: [
            "Completed AI/ML and computer vision coursework",
            "Maintained Stron Academic Performance",
            "Member of UCF Computer Science community",
        ],
        techStack: ["PyTorch", "NumPy", "OpenCV", "Pandas"],
    },
]

export default function Work() {

    const rowRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    useEffect(() => {
        let ticking = false

        function updateActiveIndex() {
            const viewportCenter = window.innerHeight / 2

            let closestIndex = 0
            let closestDistance = Infinity

            rowRefs.current.forEach((row, index) => {
                if (!row) return
                const rect = row.getBoundingClientRect()
                const rowCenter = rect.top + rect.height / 2
                const distance = Math.abs(rowCenter - viewportCenter)

                if (distance < closestDistance) {
                    closestDistance = distance
                    closestIndex = index
                }
            })

            setActiveIndex(closestIndex)
            ticking = false
        }

        function handleScroll() {
            if (ticking) return
            ticking = true
            requestAnimationFrame(updateActiveIndex)
        }

        updateActiveIndex()
        window.addEventListener("scroll", handleScroll, {passive: true})
        window.addEventListener("resize", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleScroll)
        }
    }, [])

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpenIndex(null)
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <div className="flex flex-col items-center min-h-screen gap-15 pt-32">
            <div className="flex flex-row items-center justify-center gap-7">
                <span className="bg-white min-w-2xl min-h-1"></span>
                <span className="text-6xl font-(family-name:--font-ethnocentric) text-white">
                    Career
                </span>
                <span className="bg-white min-w-2xl min-h-1"></span>
            </div>

            <div className="flex flex-col gap-24 pb-32">
                {WORK_ENTRIES.map((entry, index) => (
                    <div
                    key={entry.title}
                    ref={(el) => {rowRefs.current[index] = el}}
                    className={`flex items-center gap-3 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    >
                        <WorkTitleCard
                        entry={entry}
                        isActive={index === activeIndex}
                        onClick={() => setOpenIndex(index)}
                        />

                        <WorkConnectorLine isActive={index === activeIndex}/>

                        <WorkPreviewCard entry={entry} isActive={index === activeIndex} companyName={entry.company} jobTitle={entry.title} date={entry.dates}/>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {openIndex !== null && (
                    <WorkInformationCard
                    entry={WORK_ENTRIES[openIndex]}
                    onClose={() => setOpenIndex(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

interface WorkTitleCardProps {
    entry: WorkEntry
    isActive: boolean
    onClick: () => void
}

function WorkTitleCard({entry, isActive, onClick}: WorkTitleCardProps) {
    return (
        <button
        type="button"
        onClick={onClick}
        className={`flex flex-col items-center justify-center border rounded-3xl min-w-150 max-w-150 min-h-80 gap-2 p-6 transition-all duration-500 cursor-pointer ${
            isActive
            ? "border-red-500 glow-blood bg-black scale-105"
            : "border-white/30 opacity-50"
        }`}
        >
            <span className="font-(family-name:--font-ethnocentric) text-3xl">{entry.company}</span>
        </button>
    )
}

function WorkConnectorLine({isActive}: {isActive: boolean}) {
    return (
        <div className="relative flex-1 h-[2px] min-w-16 bg-white/20 overflow-hidden rounded-full">
            <motion.div
            className="absolute inset-y-0 left-0 bg-red-500 glow-blood"
            initial={false}
            animate={{width: isActive ? "100%" : "0%"}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            />
        </div>
    )
}

interface WorkPreviewCardProps {
    entry: WorkEntry
    isActive: boolean
    companyName: string
    jobTitle: string
    date: string

}

function WorkPreviewCard({entry, isActive, companyName, jobTitle, date}: WorkPreviewCardProps) {
    return (
        <div
        className={`flex flex-col items-baseline border rounded-3xl w-150 max-150 max-h-100 h-100 p-6 gap-4 transition-all duration-500 ${
            isActive
            ? "border-red-500 glow-blood bg-black"
            : "border-white/30 opacity-50"
        }`}
        >
            {/*date component*/}
            <div className="border border-white p-1 px-3 rounded-xl">
                <span className="font-(family-name:--font-teko-light) text-xl">{date}</span>
            </div>

            {/*company name*/}
            <span className="font-(family-name:--font-teko-regular) text-3xl">{companyName}</span>

            {/*job title*/}
            <span className="font-(family-name:--font-teko-regular) text-3xl">{jobTitle}</span>

            {/*preview description*/}
            <p className="font-(family-name:--font-teko-regular) text-2xl">{entry.summary}</p>

            <div className="flex flex-row flex-wrap gap-3">
                    {entry.techStack.map((tech) => (
                        <span
                        key={tech}
                        className="border border-white/40 rounded-xl px-4 py-1 font-(family-name:--font-teko-regular) text-lg"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
        </div>
    )
}

interface WorkInformationCardProps {
    entry: WorkEntry
    onClose: () => void
}

function WorkInformationCard({entry, onClose}: WorkInformationCardProps) {
    return (
        <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-8"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        onClick={onClose}
        >
            <motion.div
            className="relative flex flex-col gap-6 border border-red-500 glow-blood bg-black rounded-3xl max-w-2xl w-full p-10"
            initial={{opacity: 0, scale: 0.95, y: 10}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.95, y: 10}}
            transition={{duration: 0.25}}
            onClick={(e) => e.stopPropagation()}
            >
                <button
                type="button"
                onClick={onClose}
                className="absolute top-6 right-6 font-(family-name:--font-teko-regular) text-2xl text-white/60 hover:text-white"
                >
                    ✕
                </button>

                <div className="flex flex-col gap-1">
                    <span className="font-(family-name:--font-ethnocentric) text-3xl">{entry.title}</span>
                    <span className="font-(family-name:--font-teko-regular) text-2xl text-white/70">{entry.company}</span>
                    <span className="font-(family-name:--font-teko-light) text-lg text-white/50">{entry.dates}</span>
                </div>

                <p className="font-(family-name:--font-teko-light) text-xl">{entry.description}</p>

                <div className="flex flex-col gap-2">
                    <span className="font-(family-name:--font-teko-regular) text-xl">Responsibilities</span>
                    <ul className="flex flex-col gap-1 list-disc list-inside">
                        {entry.responsibilities.map((item) => (
                            <li key={item} className="font-(family-name:--font-teko-light) text-lg">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-row flex-wrap gap-3">
                    {entry.techStack.map((tech) => (
                        <span
                        key={tech}
                        className="border border-white/40 rounded-xl px-4 py-1 font-(family-name:--font-teko-regular) text-lg"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
