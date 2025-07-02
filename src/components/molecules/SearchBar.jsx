import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  onFilter,
  filters = [],
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value, selectedFilter);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowFilters(false);
    if (onFilter) {
      onFilter(filter);
    }
    if (onSearch) {
      onSearch(searchTerm, filter);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            icon="Search"
            className="pr-10"
          />
        </div>
        {filters.length > 0 && (
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              icon="Filter"
              className="px-3"
            />
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-lift border border-gray-200 py-1 z-20">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedFilter === 'all' ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                  }`}
                >
                  All
                </button>
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      selectedFilter === filter.value ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;