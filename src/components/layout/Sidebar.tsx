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
import { useAuth } from '../../features/auth/AuthContext';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['student', 'worker', 'admin'] },
    { to: '/dormitories', icon: Building2, label: 'Dormitories', roles: ['worker', 'admin'] },
    { to: '/students', icon: Users, label: 'Students', roles: ['worker', 'admin'] },
    { to: '/residents', icon: UserCheck, label: 'Residents', roles: ['worker', 'admin'] },
    { to: '/workers', icon: Briefcase, label: 'Workers', roles: ['worker', 'admin'] },
    { to: '/search', icon: Search, label: 'Search', roles: ['worker', 'admin'] },
    { to: '/reports/occupancy', icon: FileBarChart, label: 'Reports', roles: ['worker', 'admin'] },
];

export const Sidebar: React.FC = () => {
    const { user } = useAuth();

    const visibleNavItems = navItems.filter(item =>
        item.roles.includes(user?.role || 'student')
    );

    return (
        <aside className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 pt-16 overflow-y-auto">
            <nav className="p-4 space-y-2">
                {visibleNavItems.map((item) => (
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
