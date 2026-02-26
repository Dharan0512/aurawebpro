import { MasterItem } from "@/services/masterService";

interface SearchSidebarProps {
  filters: Record<string, string>;
  onChange: (updates: Record<string, string | null>) => void;
  onClear: () => void;
  // Passing master data down for simplicity (could also call hooks inside here)
  religions?: MasterItem[];
  castes?: MasterItem[];
  countries?: MasterItem[];
  states?: MasterItem[];
}

export default function SearchSidebar({
  filters,
  onChange,
  onClear,
  religions,
  castes,
  states,
}: SearchSidebarProps) {
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: string,
  ) => {
    onChange({ [key]: e.target.value || null });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    onChange({ [key]: e.target.value || null });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-50 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-lg text-gray-900">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm text-[#6A0DAD] hover:text-purple-800 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={filters.gender || ""}
            onChange={(e) => handleSelectChange(e, "gender")}
            className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
          >
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin || ""}
              onChange={(e) => handleInputChange(e, "ageMin")}
              className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax || ""}
              onChange={(e) => handleInputChange(e, "ageMax")}
              className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
            />
          </div>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Religion
          </label>
          <select
            value={filters.religionId || ""}
            onChange={(e) => handleSelectChange(e, "religionId")}
            className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
          >
            <option value="">Any Religion</option>
            {religions?.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Caste (Filtered by religion ideally) */}
        {filters.religionId && castes && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caste
            </label>
            <select
              value={filters.casteId || ""}
              onChange={(e) => handleSelectChange(e, "casteId")}
              className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
            >
              <option value="">Any Caste</option>
              {castes?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mother Tongue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mother Tongue
          </label>
          <select
            value={filters.motherTongue || ""}
            onChange={(e) => handleSelectChange(e, "motherTongue")}
            className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
          >
            <option value="">Any Mother Tongue</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
          </select>
        </div>
      </div>
    </div>
  );
}
