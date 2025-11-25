import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TrendingCardProps {
  rank: number;
  title: string;
  category: string;
  views: string;
}

export const TrendingCard = ({ rank, title, category, views }: TrendingCardProps) => {
  return (
    <Card className="group p-4 border-border shadow-custom-sm transition-all duration-300 hover:shadow-custom-md hover:bg-accent/5 cursor-pointer">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent font-display text-lg font-bold text-accent-foreground shadow-glow">
            {rank}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{category}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {views}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
