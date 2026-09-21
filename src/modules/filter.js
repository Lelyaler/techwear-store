export const FilterService = {
  filter(products, category = 'ALL', searchQuery = '') {
    const query = searchQuery.trim().toLowerCase();
    
    return products.filter(product => {
      let matchesCategory = true;
      const isBlackMarketItem = (product.badge || '').toUpperCase().includes('BLACK MARKET');

      if (category === 'ALL') {
        matchesCategory = !isBlackMarketItem;
      } else {
        const badgeText = (product.badge || '').toUpperCase().replace(' ', '');
        matchesCategory = badgeText.includes(category.toUpperCase());
      }
      
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
