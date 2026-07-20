

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen border-4 border-red-600 gap-15">
            <div className="flex flex-row items-center justify-center gap-7 border-4 border-white">
                <span className="bg-white min-w-2xl min-h-1"></span>
                <span className="text-6xl font-(family-name:--font-ethnocentric) text-white">
                    ABOUT
                </span>
                <span className="bg-white min-w-2xl min-h-1"></span>
            </div>

            <div className="flex flex-row gap-30">
                <AboutCard/>

                <HighlightsCard/>
            </div>

        </div>
    )
}

function AboutCard() {
    return (
        <div className="flex bg border-4 border-white min-w-7xl min-h-120">

        </div>
    )
}

function HighlightsCard() {
    return (
        <div className="flex bg border-4 border-white min-w-3xl min-h-100">
        </div>
    )
}