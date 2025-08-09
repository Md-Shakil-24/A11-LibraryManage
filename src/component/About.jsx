import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Slide, Fade } from 'react-awesome-reveal';
import {
  BookOpenIcon,
  ClockIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/solid';

const iconStyles = 'w-7 h-7 text-indigo-500 bg-white rounded-full p-1 shadow-lg';

const AboutSection = () => {
  return (
    <div className='w-[99%]  mx-auto px-1 lg:px-5'>
    <section className=" px-5 py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden rounded-[15px] shadow-2xl mt-14">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Slide direction="left" triggerOnce>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <Typewriter
                  words={['LibraryManage', 'Smart Reading', 'Borrow With Ease']}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={90}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              Experience next-gen library access. Browse, borrow, and manage your reading list through an intuitive and beautifully crafted platform — all in real-time.
            </p>

            <ul className="space-y-5 text-base text-slate-200 max-w-md">
              <Fade cascade damping={0.2} triggerOnce>
                <li className="flex items-center gap-4">
                  <BookOpenIcon className={iconStyles} />
                  Vast collection of categorized books
                </li>
                <li className="flex items-center gap-4">
                  <ClockIcon className={iconStyles} />
                  Custom return dates with reminder system
                </li>
                <li className="flex items-center gap-4">
                  <AcademicCapIcon className={iconStyles} />
                  Designed for students, teachers, and readers
                </li>
              </Fade>
            </ul>

            <button
              onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
              className="mt-10 px-7 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-full shadow-xl hover:from-indigo-600 hover:to-pink-600 transition duration-300"
            >
              📖 Start Exploring
            </button>
          </div>
        </Slide>

        <Slide direction="right" triggerOnce>
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-52 h-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <BookOpenIcon className="w-20 h-20 text-white drop-shadow-xl" />
              <div className="absolute -bottom-4 bg-white/20 px-5 py-2 rounded-full text-xs text-white select-none">
                Read and Enjoy📚
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm max-w-sm">
              Our platform is built for passionate readers who want access without limits — anytime, anywhere.
            </p>
          </div>
        </Slide>
      </div>
    </section></div>
  );
};

export default AboutSection;
