interface SearchFiltersProps {
  searchTerm: string;
  sexFilter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  resultCount: number;
}

export default function SearchFilters({
  searchTerm,
  sexFilter,
  onSearchChange,
  onFilterChange,
  resultCount,
}: SearchFiltersProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Liste des personnes
        </h2>
        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold">
          {resultCount} résultat{resultCount > 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Barre de recherche */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher par nom, postnom, prénom..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-transparent rounded-xl focus:ring-2 focus:ring-white focus:border-white transition duration-200 outline-none text-gray-900 placeholder-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filtre par sexe */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <select
            value={sexFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-transparent rounded-xl focus:ring-2 focus:ring-white focus:border-white transition duration-200 outline-none text-gray-900 appearance-none cursor-pointer"
          >
            <option value="tous">Tous les sexes</option>
            <option value="Masculin">Masculin uniquement</option>
            <option value="Féminin">Féminin uniquement</option>
          </select>
        </div>
      </div>
    </div>
  );
}

