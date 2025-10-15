interface ImportExportButtonsProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

export default function ImportExportButtons({
  onFileSelect,
  onExport,
}: ImportExportButtonsProps) {
  return (
    <div className="flex justify-end gap-3 mb-6">
      <input
        type="file"
        id="importFile"
        accept=".json"
        onChange={onFileSelect}
        className="hidden"
      />
      <label
        htmlFor="importFile"
        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-indigo-300"
      >
        <svg
          className="w-5 h-5 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span>Importer</span>
      </label>

      <button
        onClick={onExport}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
        <span>Exporter</span>
      </button>
    </div>
  );
}

