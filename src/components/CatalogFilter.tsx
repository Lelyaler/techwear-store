import React from 'react';
import { ProductCategory } from '../types';
import { AudioService } from '../services/audio';

interface CatalogFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'default' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'default' | 'price-asc' | 'price-desc') => void;
}

const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: 'ALL', label: 'ALL' },
  { key: 'SHELL', label: 'SHELL' },
  { key: 'CORE', label: 'CORE' },
  { key: 'CARGO', label: 'CARGO' },
  { key: 'BLACKMARKET', label: 'LIMITED' }
];

export const CatalogFilter: React.FC<CatalogFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange
}) => {
  const handleCategoryClick = (cat: ProductCategory) => {
    AudioService.playClick();
    onSelectCategory(cat);
  };

  return (
    <div className="catalog-controls" id="catalog-controls">
      <div className="catalog-controls__top">
        <div className="catalog-search">
          <input
            type="text"
            className="catalog-search__input"
            placeholder="Поиск по каталогу // SEARCH..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Поиск по каталогу"
          />
          <svg className="catalog-search__icon" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              className="catalog-search__clear"
              onClick={() => onSearchChange('')}
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
        </div>

        <div className="catalog-sort">
          <select
            value={sortBy}
            onChange={(e) => {
              AudioService.playClick();
              onSortChange(e.target.value as 'default' | 'price-asc' | 'price-desc');
            }}
            className="catalog-sort__select"
            aria-label="Сортировка товаров"
          >
            <option value="default">СОРТИРОВКА: ПО УМОЛЧАНИЮ</option>
            <option value="price-asc">ЦЕНА: ПО ВОЗРАСТАНИЮ</option>
            <option value="price-desc">ЦЕНА: ПО УБЫВАНИЮ</option>
          </select>
        </div>
      </div>

      <div className="catalog-filter" role="tablist">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            className={`catalog-filter__btn ${selectedCategory === key ? 'catalog-filter__btn--active' : ''}`}
            onClick={() => handleCategoryClick(key)}
            role="tab"
            aria-selected={selectedCategory === key}
          >
            {label} //
          </button>
        ))}
      </div>
    </div>
  );
};
