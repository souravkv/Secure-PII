'use client';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiSend } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);
  const [thinking, setThinking] = useState(false);

  // Random AI thoughts that appear in the background
  const aiThoughts = [
    "Processing neural patterns...",
    "Analyzing data structures...",
    "Detecting PII elements...",
    "Scanning document contents...",
    "Evaluating privacy metrics...",
  ];

  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % aiThoughts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setThinking(true);

    // Simulate AI response (replace with your actual AI integration)
    setTimeout(() => {
      const aiMessage = { 
        type: 'ai', 
        content: "I've analyzed your text for PII. Please be cautious about sharing sensitive information." 
      };
      setMessages(prev => [...prev, aiMessage]);
      setThinking(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex">
      {/* Background AI Thoughts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="fixed inset-0 pointer-events-none flex items-center justify-center"
      >
        <motion.p
          key={currentThought}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-indigo-500 text-xl font-mono"
        >
          {aiThoughts[currentThought]}
        </motion.p>
      </motion.div>

      {/* Left Side - File Upload */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-1/2 p-8 border-r border-gray-800"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Upload Document</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-indigo-500" : "border-gray-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <FiUpload className="text-4xl mb-4 text-gray-400" />
            <p className="text-lg mb-2">
              Drag and drop your file here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, DOC, DOCX
            </p>
          </label>
        </div>
        
        {file && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-gray-800 rounded-lg"
          >
            <p className="text-green-400">Selected file: {file.name}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg"
              onClick={() => {
                console.log('Processing file:', file);
              }}
            >
              Detect PII
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Right Side - Chat Interface */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-1/2 p-8 flex flex-col"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Chat Analysis</h2>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-white'
              }`}>
                {message.type === 'ai' && (
                  <RiRobot2Line className="inline-block mr-2" />
                )}
                {message.content}
              </div>
            </motion.div>
          ))}
          {thinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800 text-white p-4 rounded-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  ⚙️
                </motion.div>
                Analyzing...
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter your text for PII analysis..."
            className="w-full p-4 pr-12 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-500 hover:text-indigo-400 p-2"
          >
            <FiSend size={20} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}