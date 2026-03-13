import React from "react";
import { Card, CardBody } from "@heroui/react";
import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";

const FilterSection = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="mb-8">
      <Card className="shadow-sm">
        <CardBody className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <SearchInput value={searchTerm} onChange={onSearchChange} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
            />
          </div>

          {hasActiveFilters && (
            <div className="mt-4">
              <button
                onClick={onClearFilters}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors duration-200 border border-gray-300 hover:border-gray-400"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default FilterSection; 