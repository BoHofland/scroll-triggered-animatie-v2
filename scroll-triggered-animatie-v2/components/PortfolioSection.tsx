"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  items: PortfolioItem[];
}

export default function PortfolioSection({ items }: Props) {
  return (
    <div className="space-y-32">
      {items.map((item, index) => (
        <PortfolioItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

function PortfolioItem({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
        <p className="text-lg text-muted-foreground">{item.description}</p>
      </motion.div>
      
      <motion.div
        className="relative w-full md:w-[400px] h-[600px]"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
          <img
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}