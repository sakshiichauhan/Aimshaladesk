import React, { type ReactNode } from 'react';

interface CustomTooltipProps {
  children: ReactNode;
  tooltipText: string;
  className?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  tooltipText,
  className = "group-hover:text-[var(--brand-color)] hidden group-hover:inline-flex items-center gap-1 text-[15px] relative",
}) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tooltip = e.currentTarget.querySelector('.custom-tooltip');
    if (tooltip) tooltip.classList.remove('hidden');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tooltip = e.currentTarget.querySelector('.custom-tooltip');
    if (tooltip) tooltip.classList.add('hidden');
  };

  return (
    <button
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children as React.ReactElement)}
      <div className="custom-tooltip hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-black text-white rounded-md shadow-lg whitespace-nowrap z-50">
        {tooltipText}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
      </div>
    </button>
  );
};
