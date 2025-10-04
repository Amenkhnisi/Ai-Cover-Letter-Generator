import { useState } from 'react';
import { Sparkles, FileText, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Home() {
    const [email, setEmail] = useState('');

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Generate tailored content in seconds, not hours. Our AI understands job requirements instantly."
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "ATS-Optimized",
            description: "Beat applicant tracking systems with keyword-optimized content that gets you noticed."
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Smart Customization",
            description: "AI analyzes job descriptions and crafts perfectly matched cover letters and resume bullets."
        }
    ];

    const benefits = [
        "Save 10+ hours per job application",
        "Increase interview callbacks by 3x",
        "Match keywords automatically",
        "Professional writing every time"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className="text-center space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4 fill-current" />
                            <span>Trusted by 50,000+ job seekers</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-pulse">
                            Create Tailored
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Cover Letters & resume bullets
                            </span>
                            <span className="block">In Seconds Using AI</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Stop spending hours customizing applications. Let AI craft perfectly tailored cover letters and resume bullets that match any job description.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full sm:w-80 px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-lg"
                            />
                            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <span>Start Free Trial</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500">No credit card required • 3 free applications</p>
                    </div>

                    {/* Floating Card Demo */}
                    <div className="mt-16 relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white animate-pulse" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="pl-15 space-y-2">
                                    <div className="h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded w-full"></div>
                                    <div className="h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded w-5/6"></div>
                                    <div className="h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded w-4/5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Why Job Seekers Love ResumeAI
                                </h2>
                                <div className="space-y-4">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                            <span className="text-lg text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link to={"/JobDescriptionForm"} ><button className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    See It In Action
                                </button>
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <FileText className="w-6 h-6 text-blue-600" />
                                            <span className="font-semibold text-gray-900">Cover Letter Generated</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-gray-200 rounded"></div>
                                            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                            <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Match Score</span>
                                                <span className="font-bold text-green-600">98%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                How It Works
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Three simple steps to create your perfect application
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* Step 1 */}
                            <div className="relative">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                                    <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                        1
                                    </div>
                                    <div className="mt-4 mb-6">
                                        <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                                            <FileText className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            Add Your Resume
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Paste your resume text or upload a .txt file. Our AI will analyze your experience and skills.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                                        <p className="text-sm text-gray-500 text-center">Drop .txt file or paste text</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                                    <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                        2
                                    </div>
                                    <div className="mt-4 mb-6">
                                        <div className="bg-purple-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                                            <FileText className="w-8 h-8 text-purple-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            Paste Job Description
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Copy the job posting and paste it. AI will identify key requirements and match them to your experience.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                                        <p className="text-sm text-gray-500 text-center">Paste job description here</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                                    <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                        3
                                    </div>
                                    <div className="mt-4 mb-6">
                                        <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                                            <Sparkles className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            Generate & Download
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Click generate and get your tailored cover letter and optimized resume bullets instantly.
                                        </p>
                                    </div>
                                    <Link to={"/JobDescriptionForm"} >
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                            Generate
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Powerful Features for Your Job Search
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Everything you need to stand out from the competition
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Land Your Dream Job?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of professionals who've accelerated their job search with AI
                        </p>
                        <Link to={"/JobDescriptionForm"} >

                            <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Get Started Free
                            </button>

                        </Link>

                    </div>
                </section>
            </div>
        </div>
    );
};