import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constant";
import {
  BadgeCentIcon,
  EarIcon,
  HeadphonesIcon,
  SpeakerIcon,
  UserIcon,
  WatchIcon,
} from "lucide-react";

interface SideNavProps {
  onSelectCategory: (category: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ onSelectCategory }) => {
  const pathname = usePathname();
  const categories = [
    "Collection",
    "watch",
    "speaker",
    "earphones",
    "headphones",
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-[#F8F9FA]">
      <div className="h-full px-3 pb-2 overflow-y-auto">
        <div className="h-full flex flex-col justify-between">
          <ul className="font-medium mt-10">
            {navLinks.slice(0, 6).map((link, i) => {
              const isActive = link.route === pathname;

              return (
                <li
                  className={`flex justify-center items-center w-full whitespace-nowrap cursor-pointer hover:text-yellow-500 font-medium text-base ${
                    isActive
                      ? "font-bold text-[#3B82F6] text-2xl"
                      : "text-gray-800"
                  }`}
                  key={i}
                >
                  <Link
                    className={`flex size-full gap-4 p-3 text-base ${
                      isActive && "font-bold"
                    }`}
                    href={link.route}
                  >
                    <div className={`${isActive && "scale-110"}`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col items-start -mt-5">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer hover:text-yellow-500 font-medium text-base flex justify-center items-center w-full`}
                onClick={() => onSelectCategory(category)}
              >
                <span className="flex size-full gap-4 p-3 text-base">
                  {category === "watch" ? (
                    <WatchIcon className="h-5 w-5 scale-110" />
                  ) : category === "speaker" ? (
                    <SpeakerIcon className="h-5 w-5 scale-110" />
                  ) : category === "earphones" ? (
                    <EarIcon className="h-5 w-5 scale-110" />
                  ) : category === "headphones" ? (
                    <HeadphonesIcon className="h-5 w-5 scale-110" />
                  ) : (
                    category === "Collection" && (
                      <BadgeCentIcon className="h-5 w-5 scale-110" />
                    )
                  )}
                  {category}
                </span>
              </li>
            ))}
          </ul>

          <div className="px-3 flex items-center gap-3 cursor-pointer hover:text-yellow-500 font-medium text-base text-gray-500">
            <UserIcon className="w-10 h-10" />
            <span className="flex flex-col text-sm">
              <p>abusiyam</p>
              <p>abdulrg01@gmail.com</p>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
