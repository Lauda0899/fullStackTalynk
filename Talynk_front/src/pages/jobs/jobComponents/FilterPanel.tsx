import { Search, MapPin, Building2, DollarSign, Briefcase, X } from 'lucide-react';
import type { JobFilters } from '../types';

interface FilterPanelProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
}

export function FilterPanel({ filters, onFiltersChange, onClearFilters }: FilterPanelProps) {
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const handleEmploymentTypeToggle = (type: string) => {
    const newTypes = filters.employmentType.includes(type)
      ? filters.employmentType.filter(t => t !== type)
      : [...filters.employmentType, type];
    onFiltersChange({ ...filters, employmentType: newTypes });
  };

  const hasActiveFilters =
    filters.search ||
    filters.location ||
    filters.company ||
    filters.salaryMin !== null ||
    filters.salaryMax !== null ||
    filters.isRemote !== null ||
    filters.employmentType.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4" />
            Job Title or Keywords
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="e.g. Software Engineer, Product Manager"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            placeholder="e.g. Tunis , Sousse"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Building2 className="w-4 h-4" />
            Company
          </label>
          <input
            type="text"
            value={filters.company}
            onChange={(e) => onFiltersChange({ ...filters, company: e.target.value })}
            placeholder="e.g. Google, Microsoft"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Briefcase className="w-4 h-4" />
            Employment Type
          </label>
          <div className="space-y-2">
            {employmentTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.employmentType.includes(type)}
                  onChange={() => handleEmploymentTypeToggle(type)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            Remote Work
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.isRemote === null}
                onChange={() => onFiltersChange({ ...filters, isRemote: null })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">All</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.isRemote === true}
                onChange={() => onFiltersChange({ ...filters, isRemote: true })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Remote Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.isRemote === false}
                onChange={() => onFiltersChange({ ...filters, isRemote: false })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">On-site Only</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <DollarSign className="w-4 h-4" />
            Salary Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Minimum</label>
              <input
                type="number"
                value={filters.salaryMin || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  salaryMin: e.target.value ? parseInt(e.target.value) : null
                })}
                placeholder="e.g. 80000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Maximum</label>
              <input
                type="number"
                value={filters.salaryMax || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  salaryMax: e.target.value ? parseInt(e.target.value) : null
                })}
                placeholder="e.g. 150000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
