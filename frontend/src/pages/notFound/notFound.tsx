import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/src/store";
const Snow = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "white" : "rgba(59,130,246,0.7)";

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {Array.from({ length: 50 }).map((_, i) => {
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 5;

        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: color,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
};

const Waves = () => (
  <div className="absolute bottom-0 w-full overflow-hidden leading-none pointer-events-none z-10">
    <svg
      className="w-[200%] h-32 animate-wave-slow"
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
        fill="rgba(59,130,246,0.5)"
      />
    </svg>
    <svg
      className="absolute bottom-0 w-[200%] h-32 animate-wave-fast"
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C200,80 400,0 600,60 C800,100 1000,0 1200,40 L1200,120 L0,120 Z"
        fill="rgba(59,130,246,0.3)"
      />
    </svg>
  </div>
);

const Mountains = () => (
  <div className="absolute bottom-0 w-full pointer-events-none z-0 overflow-hidden">
    <svg
      viewBox="0 0 1200 400"
      className="w-full h-172 animate-parallax-mountains"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mountainGradientFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="20%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
        <linearGradient id="mountainGradientBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
      </defs>

      {/* дальние горы */}
      <path
        d="M0,250 L200,150 L400,250 L600,130 L800,250 L1000,160 L1200,250 L1200,400 L0,400 Z"
        fill="url(#mountainGradientBack)"
      />
    </svg>
  </div>
);

export const NotFoundPage = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col mx-8 justify-center align-middle mt-auto mb-auto h-full">
        <h1 className="text-6xl font-bold text-blue-700 dark:text-blue-300 mb-4 z-20 relative">
          404
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 z-20 relative">
          Кажется, эта страница утонула в Байкале…
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition z-20 relative"
        >
          Вернуться на главную
        </a>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center p-4 bg-gradient-to-b from-blue-100 via-blue-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden">
      <Snow />
      <Mountains />
      <Waves />
      <h1 className="text-6xl font-bold text-blue-700 dark:text-blue-300 mb-4 z-20 relative">
        404
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 z-20 relative">
        Кажется, эта страница утонула в Байкале…
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition z-20 relative"
      >
        Вернуться на главную
      </a>
    </div>
  );
};
