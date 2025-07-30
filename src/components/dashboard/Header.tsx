'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, Bell, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cardAnimation } from '@/lib/animations';

interface HeaderProps {
  title: string;
  withModeToggle?: boolean;
}

export default function Header({ title, withModeToggle = true }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header 
      className="border-b border-white/10 bg-black/20 backdrop-blur-lg"
      initial={cardAnimation.initial}
      animate={cardAnimation.animate}
      transition={cardAnimation.transition}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-saffron to-lotus rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="text-xs text-white/60">Digital Marketing Analytics</p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center space-x-3">
          <motion.div 
            className="hidden md:flex items-center space-x-2 bg-black/20 rounded-full px-3 py-1"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-emerald rounded-full animate-pulse"></div>
            <span className="text-xs text-white/80">Live Dashboard</span>
          </motion.div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
          </Button>

          {withModeToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <User className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white/70 hover:text-white hover:bg-white/10"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}