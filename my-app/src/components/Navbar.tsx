import Link from "next/link"
import { CiLinkedin } from "react-icons/ci";
import { VscGithub } from "react-icons/vsc";

export default function NavBar() {
    return (
        <div className="absolute flex border-4 items-start border-white min-w-screen min-h-20 justify-end gap-4 px-8">
            <Link className="flex bg-red-700 rounded" href="/projects">   
                ABOUT
            </Link> 

            <button>
                PROJECTS
            </button>

            <button>
                EXPERIENCE
            </button>

            <button>
                <VscGithub className="text-white text-[30px]"/>
            </button>

            <button>
                <CiLinkedin className="text-white text-[38px]"/>
            </button>   

        </div>
    )
}