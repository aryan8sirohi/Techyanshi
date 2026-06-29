import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-navy-950 flex flex-col items-center justify-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <img
            src="/logo.jpg"
            alt="TechYanshi Logo"
            className="w-16 h-16 rounded-2xl object-cover shadow-glow"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl border border-accent-400/30"
          />
        </div>

        <div className="text-center">
          <p className="font-display font-bold text-2xl text-white mb-1">
            Tech<span className="gradient-text-blue">Yanshi</span>
          </p>
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-navy-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full loading-bar rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
