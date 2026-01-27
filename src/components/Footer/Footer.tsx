export const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-8 md:py-12 px-8 md:px-16 lg:px-24 xl:px-32 font-poppins">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src="/src/assets/icons/Logo.svg"
              alt="Movie Logo"
              className="w-full h-full"
            />
          </div>
          <span className="text-xl font-semibold text-white tracking-tight">
            Movie
          </span>
        </div>

        <p className="text-[#A4A7AE] text-sm md:text-base font-normal">
          Copyright ©2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
};
