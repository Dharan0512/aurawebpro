import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link
            href="/admin"
            className="text-xl font-serif font-bold text-[#6A0DAD]"
          >
            AuraWeds{" "}
            <span className="text-gray-500 text-sm font-sans">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link
            href="/admin"
            className="bg-purple-50 text-[#6A0DAD] group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Dashboard Overview
          </Link>
          <Link
            href="/admin/users"
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            User Management
          </Link>
          <Link
            href="/admin/verifications"
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            ID Verifications
            <span className="bg-red-100 text-red-600 ml-auto inline-block py-0.5 px-2 text-xs rounded-full">
              12
            </span>
          </Link>
          <Link
            href="/admin/reports"
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Reported Profiles
          </Link>
          <Link
            href="/admin/success"
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Success Stories
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Premium Users
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-[#6A0DAD]">
              1,248
            </dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Matches Made This Month
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-[#6A0DAD]">843</dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pending Approvals
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">42</dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Monthly Revenue
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-[#D4AF37]">$32k</dd>
          </div>
        </div>

        {/* Recent Reports Area */}
        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          Recent Reports requiring attention
        </h2>
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="p-4 hover:bg-gray-50 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Fake Profile suspected (User #10432)
                </p>
                <p className="text-sm text-gray-500">
                  Reported by 3 different users today.
                </p>
              </div>
              <button className="text-sm font-medium text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded">
                Review
              </button>
            </li>
            <li className="p-4 hover:bg-gray-50 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Inappropriate behavior (User #9201)
                </p>
                <p className="text-sm text-gray-500">
                  Reported in chat by User #5122.
                </p>
              </div>
              <button className="text-sm font-medium text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded">
                Review
              </button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
