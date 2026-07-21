import { useScramble } from "use-scramble"
import { useEffect } from "react";
import { clearInterval } from "timers";

export default function About() {
    return (
        <div className="flex flex-col items-center min-h-screen border-4 border-red-600 gap-15 pt-32">
            <div className="flex flex-row items-center justify-center gap-7">
                <span className="bg-white min-w-2xl min-h-1"></span>
                <span className="text-6xl font-(family-name:--font-ethnocentric) text-white">
                    ABOUT
                </span>
                <span className="bg-white min-w-2xl min-h-1"></span>
            </div>

            <div className="flex flex-1 flex-row items-center justify-center gap-30 w-full">
                <AboutCard/>

                <HighlightsCard/>
            </div>

        </div>
    )
}

function AboutCard() {

    const { ref, replay } = useScramble({
        text: "BUILDING INTELLIGENT SYSTEMS WITH PURPOSE",
        speed: 0.8,
        scramble: 6,
    });


    return (
        <div className="flex flex-col items-start min-w-7xl min-h-200 gap-10">
            <span
            className="items-start font-(family-name:--font-teko-regular) text-7xl  text-glow-blood"
            ref={ref}
            onMouseEnter={replay}
            >
            </span>

            <p className="font-(family-name:--font-teko-regular) text-4xl">
                I'm a Computer Science graduate focused on backend software engineering and artificial intelligence.
                <br />
                I enjoy designing systems that solve real problems, whether that's building scalable APIs, training deep
                <br />
                learning models, or creating applications that make complex workflows simpler and more reliable. For
                <br />
                me, software is most rewarding when it has a clear purpose and creates tangible value.

            </p>

            <p className="font-(family-name:--font-teko-regular) text-4xl">
                I'm driven by the belief that artificial intelligence should be both innovative and responsible. As
                <br />
                AI continues to grow, I want to contribute to building systems that are more efficient, environmentally
                <br />
                conscious, and accessible without sacrificing performance. My long-term goal is to develop technology
                <br />
                that not only advances what's possible but also considers its impact on the world and the people who use it.
            </p>

            <div className="flex justify-center items-center border-3 border-white rounded-xl min-h-10  min-w-25 gap-4 px-5 pt-1">
                <span className="text-3xl font-(family-name:--font-teko-regular) [word-spacing:0.3rem]">
                    EDUCATION
                </span>
            </div>

            <div className="flex flex-row items-center justify-center gap-6">
                <span className="font-(family-name:--font-teko-regular) text-3xl">University of Central Florida</span>

                <span className="bg-white min-w-8 min-h-1"></span>

                <span className="font-(family-name:--font-teko-regular) text-3xl">Graduated Summer 2026</span>
            </div>

        </div>
    )
}

function HighlightsCard() {
    return (
        <div className="flex bg border-4 border-white min-w-3xl min-h-100">
        </div>
    )
}