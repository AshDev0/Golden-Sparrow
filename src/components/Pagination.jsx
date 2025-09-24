/**
 * Pagination Component
 * 
 * Handles page navigation with smart page number display
 * Shows first, last, and surrounding pages based on current position
 */

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading = false 
}) => {
  // Don't show pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    if (totalPages <= showPages) {
      // Show all pages if total is less than showPages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push('...');
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else {
        // In the middle
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-center space-x-1 sm:space-x-2 py-4">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isLoading}
        className={`
          p-2 rounded-xl transition-colors duration-200
          ${currentPage === 1 || isLoading
            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
          }
        `}
        aria-label="Go to first page"
        title="First page"
      >
        <ChevronsLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`
          p-2 rounded-xl transition-colors duration-200
          ${currentPage === 1 || isLoading
            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
          }
        `}
        aria-label="Go to previous page"
        title="Previous page"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-neutral-500"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`
                px-3 py-2 rounded-xl transition-colors duration-200 min-w-[40px]
                ${currentPage === page
                  ? 'bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white font-medium'
                  : isLoading
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Mobile Page Indicator */}
      <div className="flex sm:hidden items-center px-3 py-2 bg-white border border-neutral-300 rounded-xl">
        <span className="text-sm text-neutral-700">
          {currentPage} / {totalPages}
        </span>
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`
          p-2 rounded-xl transition-colors duration-200
          ${currentPage === totalPages || isLoading
            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
          }
        `}
        aria-label="Go to next page"
        title="Next page"
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        className={`
          p-2 rounded-xl transition-colors duration-200
          ${currentPage === totalPages || isLoading
            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
          }
        `}
        aria-label="Go to last page"
        title="Last page"
      >
        <ChevronsRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  );
};

// Simple pagination for mobile or compact spaces
export const SimplePagination = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-white border-t">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`
            relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl
            ${currentPage === 1 || isLoading
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-300'
            }
          `}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`
            relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl
            ${currentPage === totalPages || isLoading
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-300'
            }
          `}
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-700">
            Showing{' '}
            <span className="font-medium">{startItem}</span>
            {' '}to{' '}
            <span className="font-medium">{endItem}</span>
            {' '}of{' '}
            <span className="font-medium">{totalItems}</span>
            {' '}results
          </p>
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;