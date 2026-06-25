const Footer = () => {
  return (
    <footer
      className="
        py-3
        bg-white
        dark:bg-[#191919]
        border-t
        border-gray-200
        dark:border-gray-800
        shadow-sm
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <p
          className="
            text-center
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
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