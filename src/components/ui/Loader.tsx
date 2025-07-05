export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 animate-fadeIn">
        <img
          src="/trenly.png"
          alt="Trenly"
          className="w-24 h-24 animate-bounce"
        />
        <p className="text-indigo-500 font-semibold text-lg">Memuat Trenly...</p>
      </div>
    </div>
  );
}
