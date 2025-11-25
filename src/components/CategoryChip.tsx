import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryChipProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryChip = ({ label, icon: Icon, active, onClick }: CategoryChipProps) => {
  return (
    <Button
      variant={active ? "default" : "secondary"}
      className={`gap-2 transition-all duration-300 ${
        active 
          ? "bg-gradient-accent shadow-glow" 
          : "hover:bg-secondary/80"
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="font-medium">{label}</span>
    </Button>
  );
};
