/**
 * Utility function to build hierarchical tree from flat WordPress taxonomy terms
 */

export function buildHierarchy(terms) {
  // Create a map for quick lookup
  const termMap = {};
  const roots = [];

  // First pass: create all term objects
  terms.forEach(term => {
    termMap[term.id] = {
      id: term.id,
      name: term.name,
      slug: term.slug,
      parent: term.parent,
      description: term.description,
      count: term.count,
      featured_image: term.featured_image, // Preserve featured_image
      image: term.image, // Also preserve alternative image field
      acf: term.acf, // Preserve ACF fields if they exist
      meta: term.meta, // Preserve meta fields
      children: []
    };
  });

  // Second pass: build the tree
  terms.forEach(term => {
    const termObj = termMap[term.id];
    if (term.parent === 0) {
      // Root level term
      roots.push(termObj);
    } else if (termMap[term.parent]) {
      // Add as child to parent
      termMap[term.parent].children.push(termObj);
    } else {
      // Parent doesn't exist, treat as root
      roots.push(termObj);
    }
  });

  // Sort function for alphabetical ordering
  const sortTerms = (terms) => {
    terms.sort((a, b) => a.name.localeCompare(b.name));
    terms.forEach(term => {
      if (term.children && term.children.length > 0) {
        sortTerms(term.children);
      }
    });
    return terms;
  };

  return sortTerms(roots);
}