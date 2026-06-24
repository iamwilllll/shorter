import { motion } from 'motion/react';

type FooterProps = {
    className?: string;
};

export function Footer({ className }: FooterProps) {
    return (
        <footer className={`text-secondary-text flex items-end justify-between pb-5 ${className || ''}`}>
            <motion.p
                className="text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                © {new Date().getFullYear()} Shorter. All rights reserved.
            </motion.p>

            <motion.a
                href="https://github.com/iamwilllll/shorter"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <svg>
                    <use href="/assets/icons.svg#github-icon" />
                </svg>
            </motion.a>
        </footer>
    );
}
