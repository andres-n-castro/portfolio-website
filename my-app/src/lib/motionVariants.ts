import type { Variants } from "motion/react";

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const fadeUpItem: Variants = {
    hidden: {opacity: 0, y: 32},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.6, ease: "easeOut"},
    },
};
