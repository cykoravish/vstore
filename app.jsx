export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">VStore E-commerce Platform</h1>
            <p className="text-gray-600 mb-6">
              This project has been restructured as a full MERN stack application with separate frontend and backend
              directories.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎨 Frontend (Vite + React)</h3>
              <p className="text-sm text-gray-600">
                Location: <code className="bg-gray-200 px-2 py-1 rounded">/frontend</code>
              </p>
              <p className="text-sm text-gray-600">
                Run: <code className="bg-gray-200 px-2 py-1 rounded">cd frontend && npm run dev</code>
              </p>
              <p className="text-sm text-gray-600">
                URL: <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:5173</code>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚙️ Backend (Node.js + Express)</h3>
              <p className="text-sm text-gray-600">
                Location: <code className="bg-gray-200 px-2 py-1 rounded">/backend</code>
              </p>
              <p className="text-sm text-gray-600">
                Run: <code className="bg-gray-200 px-2 py-1 rounded">cd backend && npm run dev</code>
              </p>
              <p className="text-sm text-gray-600">
                URL: <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:5000</code>
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">🚀 Features</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Modern React frontend with Vite</li>
                <li>• Express.js API with MongoDB</li>
                <li>• Cloudinary image uploads</li>
                <li>• Razorpay payment integration</li>
                <li>• OTP-based authentication</li>
                <li>• Admin panel with analytics</li>
                <li>• Responsive design with Tailwind CSS</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              See <code className="bg-gray-200 px-2 py-1 rounded">README.md</code> for complete setup instructions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
