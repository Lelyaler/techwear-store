/**
 * Модуль фильтрации и поиска товаров
 */
export const FilterService = {
  /**
   * Фильтрует список товаров по категории и поисковому запросу
   * @param {Array} products - исходный массив товаров
   * @param {string} category - активная категория (например, "ALL", "SHELL", "CORE", "CARGO")
   * @param {string} searchQuery - текст поискового запроса
   * @returns {Array} отфильтрованный массив товаров
   */
  filter(products, category = 'ALL', searchQuery = '') {
    const query = searchQuery.trim().toLowerCase();
    
    return products.filter(product => {
      // 1. Фильтрация по категории (модульности)
      let matchesCategory = true;
      const isBlackMarketItem = (product.badge || '').toUpperCase().includes('BLACK MARKET');

      if (category === 'ALL') {
        // По умолчанию скрываем товары Черного Рынка в общей категории
        matchesCategory = !isBlackMarketItem;
      } else {
        const badgeText = (product.badge || '').toUpperCase().replace(' ', '');
        matchesCategory = badgeText.includes(category.toUpperCase());
      }
      
      // 2. Фильтрация по поисковому запросу
      let matchesSearch = true;
      if (query) {
        const nameMatches = product.name.toLowerCase().includes(query);
        const specsMatches = (product.specs || []).some(spec => 
          spec.toLowerCase().includes(query)
        );
        matchesSearch = nameMatches || specsMatches;
      }
      
      return matchesCategory && matchesSearch;
    });
  }
};
