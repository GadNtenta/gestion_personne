import { ImportValidation } from "@/types/person";

interface ImportModalProps {
  validation: ImportValidation | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ImportModal({
  validation,
  loading,
  onConfirm,
  onCancel,
}: ImportModalProps) {
  if (!validation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-in-up">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Prévisualisation de l'importation
            </h3>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Statut de validation */}
          {validation.isValid ? (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-green-800 mb-2">
                    ✅ Données valides et compatibles !
                  </h4>
                  <p className="text-green-700">
                    {validation.validRecords} enregistrement(s) prêt(s) à être
                    importé(s). Toutes les données correspondent au schéma de la
                    base de données.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-red-800 mb-2">
                    ❌ Données incompatibles
                  </h4>
                  <p className="text-red-700 mb-3">
                    {validation.invalidRecords} enregistrement(s) invalide(s)
                    détecté(s). Les données ne correspondent pas au schéma
                    requis.
                  </p>
                  <div className="bg-white rounded-lg p-3 mt-3">
                    <p className="font-semibold text-red-800 mb-2">
                      Erreurs détectées :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                      {validation.errors?.map((err: string, idx: number) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                    {validation.hasMoreErrors && (
                      <p className="text-sm text-red-600 mt-2 italic">
                        ... et {validation.invalidRecords - 10} autre(s)
                        erreur(s)
                      </p>
                    )}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-semibold mb-1">
                      📝 Format requis :
                    </p>
                    <p className="text-sm text-blue-700">
                      Chaque enregistrement doit avoir : <strong>nom</strong>,{" "}
                      <strong>postnom</strong>, <strong>prenom</strong>, et{" "}
                      <strong>sexe</strong> ("Masculin" ou "Féminin")
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">
                {validation.totalRecords}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {validation.validRecords}
              </p>
              <p className="text-sm text-green-700">Valides</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {validation.invalidRecords}
              </p>
              <p className="text-sm text-red-700">Invalides</p>
            </div>
          </div>

          {/* Aperçu des données */}
          {validation.preview && validation.preview.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                Aperçu des données (5 premiers)
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                        Nom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                        Postnom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                        Prénom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                        Sexe
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {validation.preview.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.nom}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.postnom}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.prenom}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              item.sexe === "Masculin"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-pink-100 text-pink-800"
                            }`}
                          >
                            {item.sexe}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer de la modale */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          {validation.isValid && (
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Importation...
                </span>
              ) : (
                `Importer ${validation.validRecords} enregistrement(s)`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

