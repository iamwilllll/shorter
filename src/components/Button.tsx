import { motion } from 'motion/react';

type ButtonProps = {
    className?: string;
    label?: string;
    children?: React.ReactNode;
    fn?: () => void;
};

export function Button({ className, label, children, fn, ...props }: ButtonProps) {
    return (
        <motion.button
            className={`bg-brand first:border-default-border hover:bg-brand/90 rounded-sm px-4 py-2 text-sm font-medium text-white transition-colors ${className}`}
            onClick={fn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {label}

            {children}
        </motion.button>
    );
}
