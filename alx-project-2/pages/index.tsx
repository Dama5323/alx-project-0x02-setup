import Header from '../components/layout/Header';

export default function Welcome() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Welcome to ALX Project 2!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is a Next.js application with TypeScript and Tailwind CSS. 
            Use the navigation above to explore different pages and features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">🏠 Home</h3>
              <p className="text-gray-600">Dynamic posts with modal creation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">ℹ️ About</h3>
              <p className="text-gray-600">Reusable Button component examples</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">📄 Posts</h3>
              <p className="text-gray-600">Collection of articles and tutorials</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}