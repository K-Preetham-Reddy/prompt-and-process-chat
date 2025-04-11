
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, History, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "History",
      icon: <History className="w-5 h-5 mr-2" />,
      path: "/history",
    },
    {
      name: "Important",
      icon: <Star className="w-5 h-5 mr-2" />,
      path: "/important",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Link to="/" className="text-xl font-semibold text-blue-600">
        DocChat
      </Link>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start mb-1"
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;
