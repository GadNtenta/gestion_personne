import { PersonFormData } from "@/types/person";

interface PersonFormProps {
  formData: PersonFormData;
  editingId: number | null;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof PersonFormData, value: string) => void;
  onCancel: () => void;
}

export default function PersonForm({
  formData,
  editingId,
  loading,
  error,
  onSubmit,
  onChange,
  onCancel,
}: PersonFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-2">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                editingId
                  ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  : "M12 4v16m8-8H4"
              }
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {editingId ? "Modifier" : "Ajouter"}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-pulse">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nom *
          </label>
          <input
            type="text"
            id="nom"
            value={formData.nom}
            onChange={(e) => onChange("nom", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none hover:border-gray-300"
            placeholder="Nom"
          />
        </div>

        <div>
          <label
            htmlFor="postnom"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Postnom *
          </label>
          <input
            type="text"
            id="postnom"
            value={formData.postnom}
            onChange={(e) => onChange("postnom", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none hover:border-gray-300"
            placeholder="Postnom"
          />
        </div>

        <div>
          <label
            htmlFor="prenom"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Prénom *
          </label>
          <input
            type="text"
            id="prenom"
            value={formData.prenom}
            onChange={(e) => onChange("prenom", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none hover:border-gray-300"
            placeholder="Prénom"
          />
        </div>

        <div>
          <label
            htmlFor="sexe"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Sexe *
          </label>
          <select
            id="sexe"
            value={formData.sexe}
            onChange={(e) => onChange("sexe", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none hover:border-gray-300"
          >
            <option value="">Sélectionnez</option>
            <option value="Masculin">Masculin</option>
            <option value="Féminin">Féminin</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enregistrement...
              </span>
            ) : editingId ? (
              "Mettre à jour"
            ) : (
              "Ajouter"
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-gray-400"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

