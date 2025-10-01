'use client'

import { useState } from 'react';
import {
    Users,
    Presentation,
    MessageSquare,
    BarChart3,
    Settings,
    Bell,
    Search,
    CalendarDays,
    Grid3X3,
    LogOut,
    ChevronDown,
    PieChart,
    LineChart,
    Activity,
    Clock
} from 'lucide-react';

export default function AdminDashboard() {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    // Mock data for charts and stats
    const recentPresentations = [
        { id: 1, title: "Q1 Financial Review", presenter: "John Doe", attendees: 45, date: "Apr 18, 2025" },
        { id: 2, title: "New Product Launch", presenter: "Jane Smith", attendees: 87, date: "Apr 15, 2025" },
        { id: 3, title: "Team Training Session", presenter: "Alex Johnson", attendees: 23, date: "Apr 10, 2025" },
        { id: 4, title: "Annual Company Meeting", presenter: "Sarah Lee", attendees: 102, date: "Apr 8, 2025" },
        { id: 5, title: "Marketing Strategy Overview", presenter: "Michael Brown", attendees: 67, date: "Apr 5, 2025" },
        { id: 6, title: "Product Roadmap for 2025", presenter: "Emily Davis", attendees: 55, date: "Mar 30, 2025" },

    ];


    const engagementData = [
        { name: 'Jan', value: 65 },
        { name: 'Feb', value: 59 },
        { name: 'Mar', value: 80 },
        { name: 'Apr', value: 81 }
    ];

    const userStats = {
        total: 1245,
        active: 876,
        newToday: 23
    };

    const presentationStats = {
        total: 389,
        activeNow: 5,
        avgDuration: "32 mins"
    };

    const questionsStats = {
        total: 2156,
        answered: 1987,
        avgPerSession: 12
    };

    const pollStats = {
        total: 645,
        participation: "78%"
    };

    // Helper components
    const SidebarItem = ({ icon, label, active, onClick }) => {
        return (
            <li
                onClick={onClick}
                className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out 
          ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-500'} 
          transform hover:scale-[1.02]`}
            >
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </li>
        );
    };
    const StatCard = ({ icon, title, value, subtext, color }) => (
        <div className="bg-white p-5 rounded-xl shadow-sm antialiased transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
                    <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
                    {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-sm">
                <div className="p-4">
                    <h1 className="text-xl font-bold text-blue-600">QuickCast</h1>
                    <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>

                <div className="px-4 mt-8">
                    <ul>
                        <SidebarItem
                            icon={<Grid3X3 size={20} />}
                            label="Dashboard"
                            active={activeMenu === 'dashboard'}
                            onClick={() => setActiveMenu('dashboard')}
                        />
                        <SidebarItem
                            icon={<Users size={20} />}
                            label="Users"
                            active={activeMenu === 'users'}
                            onClick={() => setActiveMenu('users')}
                        />
                        <SidebarItem
                            icon={<Presentation size={20} />}
                            label="Presentations"
                            active={activeMenu === 'presentations'}
                            onClick={() => setActiveMenu('presentations')}
                        />
                        <SidebarItem
                            icon={<MessageSquare size={20} />}
                            label="Q&A Management"
                            active={activeMenu === 'qa'}
                            onClick={() => setActiveMenu('qa')}
                        />
                        <SidebarItem
                            icon={<BarChart3 size={20} />}
                            label="Polls & Feedback"
                            active={activeMenu === 'polls'}
                            onClick={() => setActiveMenu('polls')}
                        />
                        <SidebarItem
                            icon={<Settings size={20} />}
                            label="Settings"
                            active={activeMenu === 'settings'}
                            onClick={() => setActiveMenu('settings')}
                        />
                    </ul>
                </div>

                <div className="mt-auto p-4 border-t">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                            A
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium antialiased">Admin User</p>
                            <p className="text-xs text-gray-500 antialiased">admin@quickcast.com</p>
                        </div>
                        <span className="ml-auto text-gray-400"> </span>
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Nav */}
                <div className="bg-white p-4 shadow-sm flex items-center justify-between text-sm font-sans">
                    <div className="relative">
                        <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-64 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-900 font-medium antialiased"
                        />
                    </div>


                    <div className="flex items-center">
                        <button className="relative p-2 rounded-full hover:bg-gray-100 mr-2 focus:outline-none transition-all duration-200">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 mr-2 focus:outline-none transition-all duration-200">
                            <CalendarDays size={20} />
                        </button>
                        <div className="flex items-center ml-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                                A
                            </div>
                            <div className="ml-2 mr-2">
                                <p className="text-sm font-medium leading-tight text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                        <p className="text-gray-500">Welcome to QuickCast admin panel</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <StatCard
                            icon={<Users size={20} className="text-white" />}
                            title="Total Users"
                            value={userStats.total}
                            subtext={`${userStats.newToday} new today`}
                            color="bg-blue-500"
                        />
                        <StatCard
                            icon={<Presentation size={20} className="text-white" />}
                            title="Presentations"
                            value={presentationStats.total}
                            subtext={`${presentationStats.activeNow} active now`}
                            color="bg-purple-500"
                        />
                        <StatCard
                            icon={<MessageSquare size={20} className="text-white" />}
                            title="Q&A Received"
                            value={questionsStats.total}
                            subtext={`${questionsStats.answered} answered`}
                            color="bg-green-500"
                        />
                        <StatCard
                            icon={<BarChart3 size={20} className="text-white" />}
                            title="Polls Created"
                            value={pollStats.total}
                            subtext={`${pollStats.participation} avg. participation`}
                            color="bg-amber-500"
                        />
                    </div>
                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-lg antialiased font-sans text-gray-900 leading-tight">User Engagement</h2>
                                <div className="flex items-center text-sm antialiased font-sans">
                                    <span className="text-gray-500">Last 4 months</span>
                                    <ChevronDown size={16} className="ml-1 transition-transform transform hover:rotate-180" />
                                </div>
                            </div>
                            <div className="h-64 flex items-center justify-center">
                                <LineChart className="h-full w-full text-blue-500 transition-all duration-300 hover:opacity-80" />
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-lg antialiased font-sans text-gray-900 leading-tight">Participation Distribution</h2>
                                <div className="flex items-center text-sm antialiased font-sans">
                                    <span className="text-gray-500">Last 30 days</span>
                                    <ChevronDown size={16} className="ml-1 transition-transform transform hover:rotate-180" />
                                </div>
                            </div>
                            <div className="h-64 flex items-center justify-center">
                                <PieChart className="h-full w-full text-purple-500 transition-all duration-300 hover:opacity-80" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Presentations */}
                        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-lg text-gray-800">Recent Presentations</h2>
                                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-gray-500 text-sm border-b">
                                            <th className="pb-3 font-medium text-gray-700">Title</th>
                                            <th className="pb-3 font-medium text-gray-700">Presenter</th>
                                            <th className="pb-3 font-medium text-gray-700">Attendees</th>
                                            <th className="pb-3 font-medium text-gray-700">Date</th>
                                            <th className="pb-3 font-medium text-gray-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentPresentations.map(item => (
                                            <tr key={item.id} className="border-b border-gray-100">
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                            <Presentation size={16} />
                                                        </div>
                                                        <span className="font-medium text-gray-800">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-gray-600">{item.presenter}</td>
                                                <td className="py-3 text-gray-600">{item.attendees}</td>
                                                <td className="py-3 text-gray-600">{item.date}</td>
                                                <td className="py-3">
                                                    <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100">View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-lg text-gray-800">System Status</h2>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">All systems go</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                                            <Activity size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Server Load</p>
                                            <p className="text-xs text-gray-500">Normal activity</p>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-medium">32%</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Uptime</p>
                                            <p className="text-xs text-gray-500">Last 30 days</p>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-medium">99.9%</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Active Users</p>
                                            <p className="text-xs text-gray-500">Currently online</p>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-medium">126</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center text-green-600 mr-3">
                                            <Presentation size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Active Presentations</p>
                                            <p className="text-xs text-gray-500">Live sessions</p>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-medium">5</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
                                View Detailed Report
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}