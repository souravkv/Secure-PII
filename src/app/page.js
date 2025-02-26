'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = 'Secure PI!';
  const [showSubtext, setShowSubtext] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setShowSubtext(true);
    }
  }, [text]);

  // Animated background shapes
  const shapes = Array(5).fill(null);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background shapes */}
      {shapes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 200, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, #6366f1 ${i * 20}%, #a855f7)`,
            width: '300px',
            height: '300px',
            borderRadius: '40%',
            filter: 'blur(100px)',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Glowing effect container */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-indigo-500 opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Main title with typewriter effect */}
            <h1 className="relative text-7xl md:text-9xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-8">
              {text}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </h1>
          </div>

          {/* Animated subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showSubtext ? 1 : 0, y: showSubtext ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-gray-400 text-xl mb-12 relative">
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Secure Document Analysis for PII Detection
              </motion.span>
            </p>

            {/* Animated button */}
            <Link href="/upload">
              <motion.button
                className="relative group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold overflow-hidden transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button content */}
                <motion.span className="relative z-10 flex items-center justify-center gap-2">
                  Start Detection
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Array(20).fill(null).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 bg-indigo-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
}