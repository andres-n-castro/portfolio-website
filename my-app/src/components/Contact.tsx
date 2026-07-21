"use client";

import { useState } from "react";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import { AiOutlineLinkedin } from "react-icons/ai";

export default function Contact() {



    return (
        <div className="flex flex-col items-center min-h-screen gap-15 pt-32">
            <div className="flex flex-row items-center justify-center gap-7">
                <span className="bg-white min-w-2xl min-h-1"></span>
                <span className="text-6xl font-(family-name:--font-ethnocentric) text-white">
                    CONTACT
                </span>
                <span className="bg-white min-w-2xl min-h-1"></span>
            </div>

            <div className="flex flex-row gap-10">
                <ContactSmallCard icon={<AiOutlineLinkedin className="min-w-10 min-h-10 text-[#0A66C2]"/>} contactTitle="LinkedIn" buttonTitle="Connect" contactLink="https://www.linkedin.com/in/andresncastro/"/>
                <ContactSmallCard icon={<VscGithub className="min-w-10 min-h-10 text-white"/>} contactTitle="Github" buttonTitle="Commit" contactLink="https://github.com/andres-n-castro"/>
            </div>

            <ContactMajorCard/>
        </div>
    )
}

interface contactSmallCardProps {
    icon: React.ReactNode;
    contactTitle: string;
    buttonTitle: string;
    contactLink: string
}

function ContactSmallCard({icon, contactTitle, buttonTitle, contactLink}: contactSmallCardProps) {
    return (
        <div className="flex flex-col border min-w-60 min-h-50 rounded-3xl items-center justify-center pt-5">
            <div>
                {icon}
            </div>

            <div className="flex flex-col  min-w-60 min-h-25 rounded-3xl items-center justify-center">
                <span className="font-(family-name:--font-teko-regular) text-3xl">{contactTitle}</span>

                <Link href={contactLink} className="font-(family-name:--font-teko-regular) text-2xl">
                    {buttonTitle}
                </Link>
            </div>
        </div>
    )
};

type SubmitStatus = "idle" | "sending" | "sent" | "error"

function ContactMajorCard() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<SubmitStatus>("idle")

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus("sending")

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, message}),
            })

            if (!res.ok) throw new Error("Failed to send")

            setStatus("sent")
            setName("")
            setEmail("")
            setMessage("")
        } catch {
            setStatus("error")
        }
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-white rounded-3xl min-w-3xl gap-8 p-12"
        >
            <div className="flex flex-col items-center gap-2">
                <span className="font-(family-name:--font-ethnocentric) text-4xl text-glow-blood">
                    GET IN TOUCH
                </span>
                <span className="font-(family-name:--font-teko-light) text-2xl text-center">
                    Want to get in touch with me? Send me a message below.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-(family-name:--font-teko-regular) text-2xl">
                    Name
                </label>
                <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border border-white rounded-xl px-4 py-2 font-(family-name:--font-teko-light) text-xl focus:outline-none focus:border-red-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-(family-name:--font-teko-regular) text-2xl">
                    Email
                </label>
                <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-white rounded-xl px-4 py-2 font-(family-name:--font-teko-light) text-xl focus:outline-none focus:border-red-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-(family-name:--font-teko-regular) text-2xl">
                    Message
                </label>
                <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-transparent border border-white rounded-xl px-4 py-2 font-(family-name:--font-teko-light) text-xl resize-none focus:outline-none focus:border-red-500"
                />
            </div>

            <button
            type="submit"
            disabled={status === "sending"}
            className="self-center border border-white rounded-3xl px-10 py-3 font-(family-name:--font-teko-regular) text-2xl hover:glow-blood transition disabled:opacity-50"
            >
                {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
                <span className="self-center font-(family-name:--font-teko-light) text-xl text-glow-blood">
                    Message sent — thanks for reaching out!
                </span>
            )}

            {status === "error" && (
                <span className="self-center font-(family-name:--font-teko-light) text-xl text-red-500">
                    Something went wrong. Please try again.
                </span>
            )}
        </form>
    )
}