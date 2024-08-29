import ShoppingCardButton from "@/components/ShoppingCardButton";
import { HeartIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface NavProps {
  onSelectCategory: (category: string) => void;
}

const Nav: React.FC<NavProps> = ({ onSelectCategory }) => {
  const categories = [
    "Collection",
    "watch",
    "speaker",
    "earphones",
    "headphones",
  ];

  return (
    <nav className="fixed top-0 z-50 h-[10vh] w-full bg-[#F8F9FA]">
      <div className="py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 md:py-2 whitespace-nowrap"
            >
              <img
                src="/assets/watch_4.webp"
                className="w-7 h-7 rounded-full"
                alt="logo"
              />
              <h2 className="font-bold text-3xl hover:text-yellow-500 text-gray-700">
                E-commerce
              </h2>
            </Link>
            <ul className="md:flex space-x-4 hidden">
              {categories.map((category) => (
                <li
                  key={category}
                  className="cursor-pointer hover:text-yellow-500 font-medium text-base text-gray-500"
                  onClick={() => onSelectCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-6 text-gray-800">
            {/* shoppingCardButton */}
            <ShoppingCardButton />
            <HeartIcon size={20} className="cursor-pointer" />
            {/* user button */}
            <UserIcon size={20} cursor={"pointer"} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
