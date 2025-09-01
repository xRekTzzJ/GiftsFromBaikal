"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function TypingBlock() {
  // TODO: Получать материалы из БД для того, чтобы можно было вручную менять материалы
  const materials = useMemo(
    () => ["КАМНЯ", "ДЕРЕВА", "МИНЕРАЛОВ", "НАТУРАЛЬНОЙ КОЖИ", "МЕХА"],
    []
  );

  const [currentMaterial, setCurrentMaterial] = useState(materials[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    if (displayedText.length < currentMaterial.length) {
      typingInterval = setInterval(() => {
        setDisplayedText((prev) => currentMaterial.slice(0, prev.length + 1));
      }, 100);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex((prevIndex) => (prevIndex + 1) % materials.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(typingInterval);
  }, [displayedText, currentMaterial, materials.length]);

  useEffect(() => {
    setCurrentMaterial(materials[index]);
  }, [index, materials]);

  return (
    <>
      <div
        className="relative h-[400px] w-full bg-cover bg-center sm:h-[500px] md:h-[600px]"
        style={{
          backgroundImage:
            'url("https://avatars.mds.yandex.net/get-altay/14844975/2a0000019564f36803fd80433ed545f3837c/XXXL")',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 px-4 text-center">
          <p className="mb-2 text-sm text-white/90 sm:text-base">
            Качество, которому можно доверять
          </p>
          <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl">
            ИЗДЕЛИЯ ИЗ
            <motion.span
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-2 inline-block overflow-hidden whitespace-nowrap border-r-2 border-red-400 text-red-400"
              style={{
                animation: "blink 0.7s step-end infinite",
              }}
            >
              {displayedText}
            </motion.span>
          </h1>
        </div>
      </div>
      <style>{`
        @keyframes blink {
          0% {
            border-color: transparent;
          }
          50% {
            border-color: #f87171;
          }
          100% {
            border-color: transparent;
          }
        }
      `}</style>
    </>
  );
}
