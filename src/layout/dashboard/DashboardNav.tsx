import { useState } from 'react';
import { AppIcon, UserMenu } from '@/components';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

type DashboardNavProps = {
    className?: string;
};

type NavLinkProp = {
    label: string;
    to: string;
    icon?: string;
};

const navLinks: NavLinkProp[] = [
    { label: 'Home', to: '/dashboard', icon: 'home-icon' },
    { label: 'My links', to: '/links', icon: 'link-icon' },
    { label: 'Analytics', to: '/analytics', icon: 'analytics-icon' },
    { label: 'QR Code', to: '/qr', icon: 'qr-icon' },
    { label: 'Settings', to: '/settings', icon: 'settings-icon' },
];

const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 64 },
};

export function DashboardNav({ className }: DashboardNavProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    return (
        <motion.nav
            layout
            initial={false}
            variants={sidebarVariants}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className={`border-default-border bg-background flex h-full flex-col overflow-hidden border-r pr-5 ${className || ''}`}
        >
            <div className="mb-5 flex h-15 items-center justify-between p-3">
                <AnimatePresence mode="wait">
                    {isExpanded && (
                        <motion.div
                            key="logo"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                        >
                            <AppIcon />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded((p) => !p)}
                    className="hover:text-brand text-white transition"
                >
                    <svg className={`h-6 w-6 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        <use href={`/assets/icons.svg#${isExpanded ? 'arrow-icon' : 'menu-icon'}`} />
                    </svg>
                </motion.button>
            </div>

            <ul className="flex flex-1 flex-col gap-2">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;

                    return (
                        <li key={link.to}>
                            <Link to={link.to}>
                                <motion.div
                                    layout
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group flex items-center gap-3 rounded-lg p-2.5 transition-colors ${
                                        isActive ? 'bg-secondary-surface text-brand' : 'hover:bg-secondary-surface/60 text-white'
                                    }`}
                                >
                                    {link.icon && (
                                        <motion.svg
                                            className="size-5 shrink-0"
                                            whileHover={{ rotate: 8 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <use href={`/assets/icons.svg#${link.icon}`} />
                                        </motion.svg>
                                    )}

                                    <AnimatePresence mode="wait">
                                        {isExpanded && (
                                            <motion.p
                                                key="label"
                                                initial={{ opacity: 0, x: -6 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -6 }}
                                                transition={{ duration: 0.12 }}
                                                className="text-sm whitespace-nowrap"
                                            >
                                                {link.label}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <motion.div layout className="mt-auto">
                <UserMenu isCompact={!isExpanded} />
            </motion.div>
        </motion.nav>
    );
}
