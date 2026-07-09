"use client";

import useAppTheme from "@/app/hooks/useAppTheme";

const Footer = () => {
  const { bg, border, textSec } = useAppTheme();

  return (
    <footer
      className="py-3 border-t shadow-sm transition-all duration-300"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm" style={{ color: textSec }}>
          © {new Date().getFullYear()} Powered by{" "}
          <span className="font-semibold text-[#0066B3]">
            RevealNext
          </span>{" "}
          (BlueCompute)
        </p>
      </div>
    </footer>
  );
};

export default Footer;