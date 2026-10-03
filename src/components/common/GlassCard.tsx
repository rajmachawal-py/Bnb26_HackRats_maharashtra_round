import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'cyan' | 'none';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  className = '',
  glow = 'none',
  onClick,
  style,
}: GlassCardProps) {
  const glowClass = 
    glow === 'purple' ? 'glass-glow' : 
    glow === 'cyan' ? 'glass-cyan-glow' : '';

  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass-card p-6 ${glowClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
}
