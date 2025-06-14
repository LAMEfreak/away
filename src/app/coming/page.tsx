"use client";

import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Thank You for Your Interest! 🎉
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl space-y-4"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-300"
        >
          We&apos;re thrilled to have you join our journey! Your travel preferences
          have been saved, and we&apos;re working hard to bring your dream mystery
          adventure to life.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-300"
        >
          While we&apos;re putting the finishing touches on our service, we&apos;ll keep
          you updated on our progress. You&apos;ll be among the first to know when we
          launch!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
