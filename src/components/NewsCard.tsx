import { Clock, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  source: string;
  variant?: "default" | "featured";
}

export const NewsCard = ({
  title,
  excerpt,
  image,
  category,
  readTime,
  source,
  variant = "default",
}: NewsCardProps) => {
  if (variant === "featured") {
    return (
      <Card className="group relative overflow-hidden border-0 shadow-custom-xl transition-all duration-500 hover:shadow-glow animate-fade-in">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Badge className="mb-4 bg-accent text-accent-foreground">{category}</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
              {title}
            </h2>
            <p className="text-card-foreground/80 text-lg mb-4 line-clamp-2">
              {excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">{source}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border-border shadow-custom-md transition-all duration-300 hover:shadow-custom-lg hover:-translate-y-1 animate-fade-up">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
          {category}
        </Badge>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground/80">{source}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {readTime}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
