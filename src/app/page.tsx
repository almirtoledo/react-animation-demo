"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  HomeIcon,
  LayoutDashboardIcon,
  LogInIcon,
  Settings,
  User2Icon,
  X,
} from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const menuIcons = [
    { name: "Home", icon: HomeIcon },
    { name: "User", icon: User2Icon },
    { name: "Dash", icon: LayoutDashboardIcon },
    { name: "Login", icon: LogInIcon },
  ];

  const homeMenuRef = useRef<HTMLDivElement>(null);
  const [initialPositionSet, setInitialPositionSet] = useState(false);
  const [theme, setTheme] = useState("zinc");
  const [toggeModal, setToggleModal] = useState(false);
  const [spanPosition, setSpanPosition] = useState(0);
  const [currentMenu, setCurrentMenu] = useState(menuIcons[0].name);

  function handleMenuClick(event: MouseEvent<HTMLDivElement>, name: string) {
    setSpanPosition(event.currentTarget.offsetLeft - 80 / 4);
    setCurrentMenu(name);

    if (!initialPositionSet && name === "Home" && homeMenuRef.current) {
      setInitialPositionSet(true);
      setSpanPosition(homeMenuRef.current.offsetLeft - 80 / 4);
    }
  }

  function handleModel() {
    setToggleModal(!toggeModal ?? true);
  }
  useEffect(() => {
    // Set the initial position based on the Home menu's position
    if (!initialPositionSet && homeMenuRef.current) {
      setInitialPositionSet(true);
      setSpanPosition(homeMenuRef.current.offsetLeft - 80 / 4);
    }
  }, [initialPositionSet]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen w-screen select-none">
      <motion.div
        animate={{
          height: toggeModal ? "5rem" : "3rem",
          width: toggeModal ? 250 : 180,
          cursor: toggeModal ? "default" : "pointer",
        }}
        transition={{ duration: 0.3 }}
        onClick={handleModel}
        className={`rounded-3xl bg-white border border-zinc-800`}
      >
        <motion.div
          animate={{
            opacity: toggeModal ? 1 : 0,
            scale: toggeModal ? 1 : 0,
            display: toggeModal ? "flex" : "none",
          }}
          className="flex flex-col gap-2 items-center justify-center h-full"
        >
          <span className="text-zinc-600">Choose theme color:</span>

          <div className="flex gap-3">
            <div
              onClick={() => setTheme("blue")}
              className="h-8 w-8 rounded-full cursor-pointer bg-blue-600 flex items-center justify-center text-white"
            >
              {theme === "blue" && <X />}
            </div>
            <div
              onClick={() => setTheme("red")}
              className="h-8 w-8 rounded-full cursor-pointer bg-red-600 flex items-center justify-center text-white"
            >
              {theme === "red" && <X />}
            </div>
            <div
              onClick={() => setTheme("green")}
              className="h-8 w-8 rounded-full cursor-pointer bg-green-600 flex items-center justify-center text-white"
            >
              {theme === "green" && <X />}
            </div>
            <div
              onClick={() => setTheme("pink")}
              className="h-8 w-8 rounded-full cursor-pointer bg-pink-600 flex items-center justify-center text-white"
            >
              {theme === "pink" && <X />}
            </div>
            <div
              onClick={() => setTheme("zinc")}
              className="h-8 w-8 rounded-full cursor-pointer bg-zinc-600 flex items-center justify-center text-white"
            >
              {theme === "zinc" && <X />}
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{
            opacity: toggeModal ? 0 : 1,
            scale: toggeModal ? 0 : 1,
            display: toggeModal ? "none" : "flex",
          }}
          className="text-zinc-600 flex gap-3 justify-center items-center h-full"
        >
          <Settings />
          <span className="uppercase">
            <strong>Settings</strong>
          </span>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={spanPosition}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative w-11/12 h-80 rounded-3xl shadow-xl flex flex-col gap-6 items-center justify-center md:w-[40rem] bg-${theme}-600`}
        >
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-6xl text-white"
          >
            {currentMenu}
          </motion.h1>
          <motion.h5
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-white"
          >
            Example page
          </motion.h5>
        </motion.div>
      </AnimatePresence>

      <nav
        className={`relative w-11/12 h-20 rounded-3xl shadow-xl md:w-[40rem] bg-${theme}-600`}
      >
        <div className="relative flex items-center justify-center h-full gap-6">
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: spanPosition - 4 }}
            transition={{ duration: 0.3 }}
            className={`w-20 h-20 absolute rounded-full -top-4 bg-${theme}-600`}
          />
          <motion.div
            initial={{ left: 0 }}
            animate={{
              left: spanPosition + 4,
            }}
            transition={{ duration: 0.3 }}
            className={`w-16 h-16 absolute rounded-t-full -top-1 border-b-4 border-b-zinc-200 border-t-4 border-t-white/25 bg-black/25`}
          />
          {menuIcons.map(({ name, icon: Icon }) => (
            <motion.div
              ref={name === "Home" ? homeMenuRef : undefined}
              key={name}
              animate={{
                marginTop: currentMenu === name ? -20 : 0,
                scale: currentMenu === name ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center cursor-pointer h-full z-50"
              onClick={(e) => handleMenuClick(e, name)}
            >
              <Icon className="text-zinc-200 w-8 h-8" />
            </motion.div>
          ))}
        </div>
      </nav>
    </div>
  );
}
