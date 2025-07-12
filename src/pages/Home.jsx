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
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-16">
        <h1 className="space-grotesk" style={{ fontSize: '3.5rem', lineHeight: '1.2' }}>
          Welcome to <span className="text-indigo-300 audiowide-regular bg-indigo-600 hover:bg-indigo-700 px-3 py-1 text-sm rounded text-white transition duration-300">Zenchron</span>
        </h1>

        <p className="work-sans-body text-3xl md:text-4xl lg:text-5xl text-sky-100 mb-12 font-medium drop-shadow-xl italic tracking-wide">
          Structure the Chaos. <span className="font-semibold text-indigo-200">Flow with Zen</span>
        </p>
      </div>
    </div>
  );
}