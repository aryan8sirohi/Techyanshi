import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | TechYanshi</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10rem] lg:text-[14rem] font-display font-bold leading-none gradient-text-blue opacity-20 select-none mb-0">
              404
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="-mt-8 lg:-mt-16"
          >
            <h1 className="text-display-md font-display font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-neutral-400 max-w-md mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved. Let us get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="btn-primary">
                <Home size={16} />
                Back to Home
              </Link>
              <button onClick={() => window.history.back()} className="btn-secondary">
                <ArrowLeft size={16} />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
