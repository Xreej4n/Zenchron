export default function Home() {
  return (
    <div
      className="page-content relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('pic3.jpg')`,
      }}
    >
      {/* Optional: Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* 🏠 Text Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg">
          Welcome to <span className="text-indigo-300">Zenchron</span>
        </h1>

        <p className="text-lg text-gray-100 mb-8 font-medium drop-shadow-sm italic">
          Structure the Chaos. Flow with Zen
        </p>

        
      </div>
    </div>
  );
}