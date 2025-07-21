import React from 'react';
import { Search, Filter } from 'lucide-react';
import { EVENT_COLORS } from '../../utils/constants';

const SearchFilter = ({ 
  searchQuery, 
  onSearchChange, 
  colorFilter, 
  onColorFilterChange 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex-1 min-w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-gray-500" />
        <select
          value={colorFilter}
          onChange={(e) => onColorFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Colors</option>
          {EVENT_COLORS.map(color => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;