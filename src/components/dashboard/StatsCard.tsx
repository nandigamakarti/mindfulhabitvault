import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, ListChecks } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  animate?: boolean;
}

const iconMap = {
  'Completion rate': <CheckCircle className="h-5 w-5 text-green-500" />,
  'Current streak': <Zap className="h-5 w-5 text-yellow-500" />,
  'Active habits': <ListChecks className="h-5 w-5 text-primary" />,
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  trend,
  trendValue,
  className,
  animate = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay animation to create a staggered effect when there are multiple cards
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const numberValue = typeof value === 'number' ? value : parseFloat(value);
  const isNumber = !isNaN(numberValue);

  return (
    <motion.div 
      className={cn('bg-card rounded-xl border p-6 flex flex-col items-center transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5', className)}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate && isVisible ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.3 }}
    >
      <span className="text-4xl font-bold text-primary mb-1">{isNumber ? <CountAnimation value={numberValue} /> : value}</span>
      <div className="flex items-center gap-2 text-muted-foreground mt-1">
        {iconMap[title]}
        <span className="text-base">{title}</span>
      </div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </motion.div>
  );
};

// Component for animating count
const CountAnimation = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Animate from 0 to the target value
    const duration = 1000; // 1 second
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = value / totalFrames;
    
    let currentFrame = 0;
    
    const counter = setInterval(() => {
      currentFrame++;
      const currentCount = Math.min(currentFrame * increment, value);
      setCount(currentCount);
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [value]);
  
  // Format number based on its value
  const formattedValue = () => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    
    if (Number.isInteger(value)) {
      return Math.round(count).toString();
    }
    
    return count.toFixed(1);
  };
  
  return (
    <div className="text-2xl font-semibold">{formattedValue()}</div>
  );
};

export default StatsCard;
