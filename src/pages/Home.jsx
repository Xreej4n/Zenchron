export default function Home() {
  return (
    <div
      className="page-content relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('pic3.jpg')`,
      }}
    >
      {/* Full-page blur and overlay below navbar */}
      <div className="absolute inset-0 top-[6rem] z-0">
        <div className="w-full h-full bg-black bg-opacity-40 backdrop-blur-md"></div>
      </div>

      {/* 🏠 Text Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-12">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8 tracking-wider drop-shadow-2xl">
          Welcome to <span className="text-indigo-300">Zenchron</span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-100 mb-10 font-semibold drop-shadow-lg italic">
          Structure the Chaos. Flow with Zen
        </p>
      </div>
    </div>
  );
}