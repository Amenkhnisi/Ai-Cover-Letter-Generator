import { useState } from "react";
import { Menu, X, Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to={"/"} >
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ResumeAI
                            </span>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
                        <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
                        <Link to={"/JobDescriptionForm"} >
                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
                        <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
                        <a href="#pricing" className="block text-gray-700 hover:text-blue-600">Pricing</a>
                        <Link to={"/JobDescriptionForm"} >
                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
                                Get Started
                            </button>
                        </Link>

                    </div>
                )}
            </div>
        </nav>
    );
};
