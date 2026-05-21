import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* Logo */}
          <div>

            <h1 className="text-3xl font-bold text-blue-700">
              Smart Campus
            </h1>

            <p className="text-sm text-gray-500">
              University Assistance Platform
            </p>

          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </button>

          </div>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>

          <p className="text-blue-600 font-semibold mb-4">
            Smart University Management
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">

            One Platform For
            <span className="text-blue-600"> Student Support</span>

          </h1>

          <p className="text-gray-600 text-lg mt-8 leading-relaxed">

            Smart Campus helps students find departments,
            track complaints, search university information,
            and receive important notifications in one place.

          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Start Now
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Explore Dashboard
            </button>

          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14">

            <div>

              <h2 className="text-3xl font-bold text-blue-600">
                24/7
              </h2>

              <p className="text-gray-500">
                Student Support
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-blue-600">
                100+
              </h2>

              <p className="text-gray-500">
                Complaints Managed
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-blue-600">
                Real-Time
              </h2>

              <p className="text-gray-500">
                Notifications
              </p>

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="relative">

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-2xl font-bold">
                  Student Dashboard
                </h2>

                <p className="text-gray-500">
                  Smart Campus Portal
                </p>

              </div>

              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>

            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-blue-50 rounded-2xl p-5">

                <h3 className="font-semibold text-gray-700">
                  Complaints
                </h3>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                  12
                </p>

              </div>

              <div className="bg-green-50 rounded-2xl p-5">

                <h3 className="font-semibold text-gray-700">
                  Resolved
                </h3>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  8
                </p>

              </div>

              <div className="bg-yellow-50 rounded-2xl p-5">

                <h3 className="font-semibold text-gray-700">
                  Pending
                </h3>

                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  4
                </p>

              </div>

              <div className="bg-purple-50 rounded-2xl p-5">

                <h3 className="font-semibold text-gray-700">
                  Notices
                </h3>

                <p className="text-3xl font-bold text-purple-600 mt-2">
                  18
                </p>

              </div>

            </div>

            {/* Activity */}
            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-5">
                Recent Activity
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between bg-gray-50 p-4 rounded-xl">

                  <div>

                    <p className="font-medium">
                      Transcript Issue
                    </p>

                    <p className="text-sm text-gray-500">
                      Examination Branch
                    </p>

                  </div>

                  <span className="text-yellow-500 font-semibold">
                    Pending
                  </span>

                </div>

                <div className="flex justify-between bg-gray-50 p-4 rounded-xl">

                  <div>

                    <p className="font-medium">
                      Marks Correction
                    </p>

                    <p className="text-sm text-gray-500">
                      Academic Section
                    </p>

                  </div>

                  <span className="text-green-500 font-semibold">
                    Resolved
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-8 bg-white shadow-lg rounded-2xl p-5 w-60">

            <p className="text-sm text-gray-500">
              New Notification
            </p>

            <h3 className="font-semibold mt-2">
              Mid Exams Postponed
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Academic Section
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <p className="text-blue-600 font-semibold">
              Features
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Everything Students Need
            </h2>

            <p className="text-gray-500 mt-6 text-lg">
              Designed to simplify university communication and support.
            </p>

          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition">

              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                📋
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Complaint Tracking
              </h3>

              <p className="text-gray-500 mt-4">
                Submit and track university complaints in real-time.
              </p>

            </div>

            {/* Card */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition">

              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                🔔
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Smart Notifications
              </h3>

              <p className="text-gray-500 mt-4">
                Receive important university updates instantly.
              </p>

            </div>

            {/* Card */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition">

              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl">
                🔎
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Search Information
              </h3>

              <p className="text-gray-500 mt-4">
                Search documents, departments, and university procedures.
              </p>

            </div>

            {/* Card */}
            <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition">

              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl">
                🏢
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Department Directory
              </h3>

              <p className="text-gray-500 mt-4">
                Quickly find department contacts and office information.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-blue-600 text-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-bold leading-tight">

            Modernize Your
            University Experience

          </h2>

          <p className="mt-8 text-xl text-blue-100">

            Smart Campus connects students and university services
            in one centralized platform.

          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-10 bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-2xl text-lg font-semibold transition"
          >
            Get Started Today
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Smart Campus
            </h2>

            <p className="mt-2">
              University Assistance Platform
            </p>

          </div>

          <p>
            © 2026 Smart Campus. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}