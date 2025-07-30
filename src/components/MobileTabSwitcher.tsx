import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileTabSwitcherProps {
  activeTab: 'form' | 'preview';
  onTabChange: (tab: 'form' | 'preview') => void;
}

export function MobileTabSwitcher({ activeTab, onTabChange }: MobileTabSwitcherProps) {
  return (
    <div className="md:hidden flex bg-muted p-1 rounded-lg mb-4">
      <Button
        variant={activeTab === 'form' ? 'default' : 'ghost'}
        className="flex-1 relative"
        onClick={() => onTabChange('form')}
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit
        {activeTab === 'form' && (
          <motion.div
            className="absolute inset-0 bg-primary rounded-md -z-10"
            layoutId="activeTab"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Button>
      <Button
        variant={activeTab === 'preview' ? 'default' : 'ghost'}
        className="flex-1 relative"
        onClick={() => onTabChange('preview')}
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
        {activeTab === 'preview' && (
          <motion.div
            className="absolute inset-0 bg-primary rounded-md -z-10"
            layoutId="activeTab"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Button>
    </div>
  );
}