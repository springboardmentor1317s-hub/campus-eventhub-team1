import React, { useState, useEffect, useRef } from 'react';

// A necessary compromise for the fill animation keyframes, as they cannot be
// defined in Tailwind without a config file.
const AnimationStyles = () => (
    <style>{`
        @keyframes fill-animation {
            0% { background-position: 100% 0; }
            100% { background-position: 0 0; }
        }
    `}</style>
);

// Component for the interactive particle background
const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        const handleMouseMove = (event) => { mouse.x = event.clientX; mouse.y = event.clientY; };
        const handleMouseOut = () => { mouse.x = null; mouse.y = null; };
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);

        class Particle {
            constructor(x, y, dX, dY, size, color) {
                this.x = x; this.y = y; this.baseX = x; this.baseY = y;
                this.directionX = dX; this.directionY = dY; this.size = size; this.color = color;
                this.density = (Math.random() * 30) + 1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > height || this.y < 0) this.directionY = -this.directionY;
                let dx = mouse.x - this.x, dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x -= (dx / distance) * force * this.density;
                    this.y -= (dy / distance) * force * this.density;
                } else {
                    if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
                    if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            let numParticles = (width * height) / 9000;
            for (let i = 0; i < numParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * (width - size * 2) + size * 2);
                let y = (Math.random() * (height - size * 2) + size * 2);
                let dX = (Math.random() * 0.4) - 0.2;
                let dY = (Math.random() * 0.4) - 0.2;
                particles.push(new Particle(x, y, dX, dY, size, `rgba(0, 169, 255, ${Math.random() * 0.5 + 0.1})`));
            }
        }
        
        function connect() { /* ... Connection logic from original script ... */ }
        
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => p.update());
            connect();
        };

        init();
        animate();

        return () => { // Cleanup
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="interactive-bg" className="fixed top-0 left-0 w-full h-full z-[-1] bg-[#0a0a14]" />;
};

// Component for a single form input with a floating label
const FormInput = ({ id, label, value, onChange, ...props }) => (
    <div className="relative group after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#00A9FF] after:transition-all after:duration-300 focus-within:after:w-full">
        <input
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder=" "
            required
            {...props}
            className="peer mt-1 block w-full rounded-lg shadow-sm pt-6 p-4 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] backdrop-blur-lg caret-[#00A9FF] placeholder-transparent focus:outline-none focus:border-[rgba(0,169,255,0.7)] focus:shadow-[0_0_20px_5px_rgba(0,169,255,0.2),inset_0_0_5px_rgba(0,169,255,0.1)] focus:bg-[rgba(255,255,255,0.1)] valid:border-[rgba(0,169,255,0.3)] valid:bg-gradient-to-r valid:from-[rgba(0,169,255,0.05)] valid:to-transparent animate-[fill-animation_0.5s_ease-in-out_forwards]"
        />
        <label htmlFor={id} className="absolute left-4 top-4 text-[#a9a9a9] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] peer-focus:top-1 peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#00A9FF] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#00A9FF]">
            {label}
        </label>
    </div>
);

// Main Register Component
export const ARegister = () => {
    const [formData, setFormData] = useState({
        adminId: '', fullName: '', email: '', mobile: '',
        password: '', collegeName: '', collegeCode: '', designation: ''
    });
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration submitted:", formData);
        alert(`Creating account for: ${formData.fullName}`);
    };
    
    useEffect(() => {
        const filledCount = Object.values(formData).filter(v => v !== '').length;
        setProgress((filledCount / Object.keys(formData).length) * 100);
    }, [formData]);

    return (
        <div className="bg-[#0a0a14] text-white font-['Work_Sans',_sans-serif] overflow-hidden">
            <AnimationStyles />
            <InteractiveBackground />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl z-10">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-3">
                            <svg className="h-10 w-10 text-[#00A9FF]" fill="none" viewBox="0 0 48 48"><path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path></svg>
                            <h1 className="text-4xl font-bold text-white">CampusEventHub</h1>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-white">Admin Registration</h2>
                        <p className="mt-2 text-md text-[#a9a9a9]">Unlock powerful event management tools for your institution.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                        <div className="mb-6">
                            <div className="h-2 w-full rounded-full bg-gray-700/50">
                                <div className="h-2 rounded-full bg-[#00A9FF] transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="mt-2 text-right text-sm text-[#a9a9a9]">Step 1 of 2</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                <FormInput id="adminId" label="Admin ID/Employee ID" type="text" value={formData.adminId} onChange={handleChange} />
                                <FormInput id="fullName" label="Full Name" type="text" value={formData.fullName} onChange={handleChange} />
                            </div>
                            <FormInput id="email" label="Official Email ID (College Domain)" type="email" value={formData.email} onChange={handleChange} />
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                <FormInput id="mobile" label="Mobile Number" type="tel" value={formData.mobile} onChange={handleChange} />
                                <FormInput id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
                            </div>
                             <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                <FormInput id="collegeName" label="College Name" type="text" value={formData.collegeName} onChange={handleChange} />
                                <FormInput id="collegeCode" label="College Unique Code" type="text" value={formData.collegeCode} onChange={handleChange} />
                            </div>
                            <FormInput id="designation" label="Designation/Role" type="text" value={formData.designation} onChange={handleChange} />
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-lg border border-transparent bg-[#00A9FF] px-4 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:bg-opacity-80 hover:shadow-xl hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-[#00A9FF] focus:ring-offset-2 focus:ring-offset-[#0a0a14]">
                                    Create Account
                                </button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-[#a9a9a9]">
                            Already have an account? <a href="#" className="font-medium text-[#00A9FF] transition hover:text-[#F8D49F] hover:underline">Log In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
