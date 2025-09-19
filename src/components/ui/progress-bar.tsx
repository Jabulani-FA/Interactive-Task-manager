import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const ProgressBar = ({ value, className, variant = 'default' }: ProgressBarProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-progress-high';
      case 'warning':
        return 'bg-progress-medium';
      case 'danger':
        return 'bg-progress-low';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={cn("h-2 bg-muted rounded-full overflow-hidden", className)}>
      <div 
        className={cn("h-full transition-all duration-500 ease-out", getVariantClasses())}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};