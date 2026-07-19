import Image from "next/image";

export default function NavBar() {
    return (
        <div className="absolute flex border-4 border-white min-w-screen min-h-20 justify-end gap-4 px-8">
            <button>
                ABOUT
            </button> 

            <button>
                PROJECTS
            </button>

            <button>
                EXPERIENCE
            </button>

            <button>
                <Image
                    src="/icons/Github_Icon.png"
                    alt="Github"
                    width={50}
                    height={50}
                />
            </button>

            <button>
                button 5
            </button>   

        </div>
    )
}