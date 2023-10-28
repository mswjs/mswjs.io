import { useState, useEffect } from "react";
import { MoonIcon } from "./icons/moon";
import { SunIcon } from "./icons/sun";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("theme");
    return localTheme ? localTheme : "light";
  });

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={handleClick}
      className="  px-3 inline-flex py-1 h-[36px] w-[36px] justify-center items-center space-x-1 border rounded-md border-orange text-orange hover:bg-orange hover:text-black dark:bg-orange dark:text-black"
    >
      <span>
        {theme === "light" ? (
          <MoonIcon className="w-5 h-5" />
        ) : (
          <SunIcon className="w-5 h-5" />
        )}
      </span>
    </button>
  );
}
