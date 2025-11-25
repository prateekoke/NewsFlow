import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { NewsCard } from "@/components/NewsCard";
import { CategoryChip } from "@/components/CategoryChip";
import { TrendingCard } from "@/components/TrendingCard";
import { Newspaper, Laptop, TrendingUp, Gamepad2, Film, Globe } from "lucide-react";

import heroImage from "@/assets/hero-news.jpg";
import techImage from "@/assets/tech-news.jpg";
import businessImage from "@/assets/business-news.jpg";
import sportsImage from "@/assets/sports-news.jpg";
import entertainmentImage from "@/assets/entertainment-news.jpg";

const categories = [
  { id: "all", label: "All News", icon: Globe },
  { id: "tech", label: "Technology", icon: Laptop },
  { id: "business", label: "Business", icon: TrendingUp },
  { id: "sports", label: "Sports", icon: Gamepad2 },
  { id: "entertainment", label: "Entertainment", icon: Film },
];

const featuredNews = {
  title: "Breaking: Major Developments in Global Technology Sector",
  excerpt: "Industry leaders announce groundbreaking collaboration that could reshape the future of innovation and digital transformation worldwide.",
  image: heroImage,
  category: "Technology",
  readTime: "8 min read",
  source: "NewsFlow Exclusive",
};

const newsArticles = [
  {
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    excerpt: "Artificial intelligence continues to reshape business operations and consumer experiences across multiple sectors.",
    image: techImage,
    category: "Technology",
    readTime: "5 min read",
    source: "Tech Today",
  },
  {
    title: "Global Markets React to Economic Policy Shifts",
    excerpt: "Financial analysts discuss the implications of recent policy changes on international trade and investment.",
    image: businessImage,
    category: "Business",
    readTime: "6 min read",
    source: "Business Wire",
  },
  {
    title: "Championship Finals Draw Record-Breaking Viewership",
    excerpt: "Sports fans worldwide tune in for the most-watched championship game in recent history.",
    image: sportsImage,
    category: "Sports",
    readTime: "4 min read",
    source: "Sports Daily",
  },
  {
    title: "New Entertainment Platforms Revolutionize Content Streaming",
    excerpt: "Innovative streaming services introduce features that enhance user experience and content discovery.",
    image: entertainmentImage,
    category: "Entertainment",
    readTime: "5 min read",
    source: "Entertainment Weekly",
  },
  {
    title: "Sustainable Technology Solutions Gain Momentum",
    excerpt: "Green tech initiatives show promising results in reducing carbon footprint across tech industry.",
    image: techImage,
    category: "Technology",
    readTime: "7 min read",
    source: "Eco Tech",
  },
  {
    title: "Startup Funding Reaches New Heights This Quarter",
    excerpt: "Venture capital investments surge as investors show confidence in emerging markets and innovative startups.",
    image: businessImage,
    category: "Business",
    readTime: "5 min read",
    source: "Startup News",
  },
];

const trendingStories = [
  { rank: 1, title: "Tech Giant Announces Revolutionary Product Line", category: "Technology", views: "2.5M views" },
  { rank: 2, title: "Global Summit Addresses Climate Action", category: "World", views: "1.8M views" },
  { rank: 3, title: "Breakthrough in Medical Research Announced", category: "Health", views: "1.5M views" },
  { rank: 4, title: "Cultural Festival Celebrates International Unity", category: "Culture", views: "1.2M views" },
  { rank: 5, title: "Space Exploration Reaches New Milestone", category: "Science", views: "950K views" },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 animate-fade-in">
          <NewsCard {...featuredNews} variant="featured" />
        </section>

        {/* Categories */}
        <section className="mb-8 animate-slide-in">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.label}
                icon={category.icon}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="h-6 w-6 text-accent" />
              <h2 className="font-display text-2xl font-bold">Latest Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsArticles.map((article, index) => (
                <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                  <NewsCard {...article} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Trending */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-accent" />
                <h2 className="font-display text-2xl font-bold">Trending Now</h2>
              </div>
              
              <div className="space-y-4">
                {trendingStories.map((story, index) => (
                  <div key={story.rank} style={{ animationDelay: `${index * 100}ms` }}>
                    <TrendingCard {...story} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                NewsFlow
              </h3>
              <p className="text-sm text-muted-foreground">
                Your personalized news experience, delivering stories that matter to you.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Business</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Sports</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Entertainment</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Advertise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 NewsFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
