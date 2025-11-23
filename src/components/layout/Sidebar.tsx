import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    Users,
    UserCheck,
    Briefcase,
    Search,
    FileBarChart
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dormitories', icon: Building2, label: 'Dormitories' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/residents', icon: UserCheck, label: 'Residents' },
    { to: '/workers', icon: Briefcase, label: 'Workers' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/reports/occupancy', icon: FileBarChart, label: 'Reports' },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 pt-16 overflow-y-auto">
            <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
