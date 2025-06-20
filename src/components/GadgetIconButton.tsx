import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { motion, Transition, TargetAndTransition } from 'framer-motion';
import { Button, ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils'; // Assuming src/lib/utils.ts exists and exports cn

interface GadgetIconButtonProps {
  icon: React.ReactNode;
  label: string; // Mandatory for accessibility (aria-label and tooltip content)
  to?: LinkProps['to']; // For navigation using react-router-dom
  onClick?: (event: React.MouseEvent<HTMLElement>) => void; // For button-like actions
  className?: string; // Applied to the motion.div wrapper for layout
  buttonVariant?: ShadcnButtonProps['variant'];
  buttonSize?: ShadcnButtonProps['size'];
  gadgetName: string; // For identification, e.g., in logs or specific styling if needed
  
  // Framer Motion animation props (optional with defaults for "gentle bouncing")
  hoverAnimation?: TargetAndTransition;
  tapAnimation?: TargetAndTransition;
  transitionConfig?: Transition;
}

const GadgetIconButton: React.FC<GadgetIconButtonProps> = ({
  icon,
  label,
  to,
  onClick,
  className,
  buttonVariant = 'ghost', // A common default for icon buttons
  buttonSize = 'icon',    // Standard size for icon-only buttons
  gadgetName,
  hoverAnimation = { y: -3, scale: 1.1 },
  tapAnimation = { scale: 0.95 },
  transitionConfig = { type: 'spring', stiffness: 400, damping: 17 },
}) => {
  console.log(`GadgetIconButton '${gadgetName}' loaded. Label: ${label}, Path: ${to || 'N/A'}`);

  const buttonElement = to ? (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      aria-label={label} // The Button becomes the <a> tag, so label it
      asChild // Crucial for Button to render as the Link component
    >
      <Link to={to} onClick={onClick}>
        {icon}
      </Link>
    </Button>
  ) : (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </Button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* The motion.div handles the animation and acts as the trigger's child. */}
        {/* TooltipTrigger requires its child to correctly handle refs, which motion.div does. */}
        <motion.div
          className={cn('inline-block cursor-pointer', className)} // Wrapper class for positioning and layout
          whileHover={hoverAnimation}
          whileTap={tapAnimation}
          transition={transitionConfig}
        >
          {buttonElement}
        </motion.div>
      </TooltipTrigger>
      {/* Display the label as tooltip content */}
      {label && (
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default GadgetIconButton;