import { Statistics } from "@/types/person";

interface StatisticsCardsProps {
  stats: Statistics;
}

export default function StatisticsCards({ stats }: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
              Total
            </p>
            <p className="text-4xl font-bold mt-2">{stats.total}</p>
            <p className="text-blue-100 text-sm mt-1">Personnes</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-4">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Masculin */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">
              Masculin
            </p>
            <p className="text-4xl font-bold mt-2">{stats.masculin}</p>
            <p className="text-indigo-100 text-sm mt-1">
              {stats.total > 0
                ? `${Math.round((stats.masculin / stats.total) * 100)}%`
                : "0%"}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-4">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Féminin */}
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-pink-100 text-sm font-medium uppercase tracking-wider">
              Féminin
            </p>
            <p className="text-4xl font-bold mt-2">{stats.feminin}</p>
            <p className="text-pink-100 text-sm mt-1">
              {stats.total > 0
                ? `${Math.round((stats.feminin / stats.total) * 100)}%`
                : "0%"}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-4">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

