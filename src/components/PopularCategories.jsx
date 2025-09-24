import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const PopularCategories = ({ 
  limit = 6,
  showTabs = true 
}) => {
  const [activeTab, setActiveTab] = useState('equipment-buy');
  // Static categories data
  const staticCategories = {
    'equipment-buy': [
      {
        id: 1,
        name: 'Forklifts',
        slug: 'material-handling',
        image: 'images/forklift_new_1.jpg'
      },
      {
        id: 2,
        name: 'Crushers',
        slug: 'crushers',
        image: '/images/Crusher.png'
      },
      {
        id: 3,
        name: 'Drill Rigs',
        slug: 'drill-rigs',
        image: '/images/Drill_Rigs.png'
      },
      {
        id: 4,
        name: 'Concrete Mixer Trucks',
        slug: 'concrete-mixer-trucks',
        image: '/images/Concrete_Mixer_Trucks.png'
      },
      {
        id: 5,
        name: 'Tipper Dumper Trucks',
        slug: 'tipper-dumper-trucks',
        image: '/images/Tipper_Dumper_Trucks.png'
      },
      {
        id: 6,
        name: 'Graders',
        slug: 'graders',
        image: '/images/Graders.png'
      }
    ],
    'equipment-rent': [
      {
        id: 7,
        name: 'Crawler Dozers',
        slug: 'crawler-dozers',
        image: '/images/crawler-dozers.png'
      },
      {
        id: 8,
        name: 'Single Drum Rollers',
        slug: 'single-drum-rollers',
        image: '/images/single-drum-rollers.png'
      },
      {
        id: 9,
        name: 'Mobile Cranes',
        slug: 'mobile-cranes',
        image: '/images/mobile-cranes.png'
      },
      {
        id: 10,
        name: 'Long Boom Excavators',
        slug: 'long-boom-excavators',
        image: '/images/long-boom-excavators.png'
      },
      {
        id: 11,
        name: 'Rigid Dump Trucks',
        slug: 'rigid-dump-trucks',
        image: '/images/rigid-dump-trucks.png'
      },
      {
        id: 12,
        name: 'Medium Excavators',
        slug: 'medium-excavators',
        image: '/images/medium-excavators.png'
      }
    ]
  };

  // Get categories for the active tab
  const categories = staticCategories[activeTab]?.slice(0, limit) || [];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const CategoryCard = React.memo(({ category, index }) => {
    // Build the filter URL - use category slug for equipment-type filter
    const categoryLink = `/products?taxonomy=${activeTab}&term=${category.slug}&termName=${category.name}`;
    
    return (
      <motion.div
        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <Link 
          to={categoryLink}
          className="block"
        >
          <div className="aspect-[4/2] overflow-hidden relative">
            <img 
              src={category.image || '/images/placeholder-category.jpg'} 
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = '/images/placeholder-category.jpg';
              }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
          
          <div className="p-3">
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-accent-600 transition-colors flex items-center justify-between"><span>{category.name}</span> <span><ChevronRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' /></span></h3>
          </div>
        </Link>
      </motion.div>
    );
  });

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"></div>
                  <span className="text-sm font-bold tracking-wider text-accent-600 uppercase">
                    Customer Favorties
                  </span>
          </div>
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-2 capitalize">Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl">
            Find the right tools trusted by industry leaders
          </p>
        </div>

        {showTabs && (
          <div className="flex mb-8">
            <div className="inline-flex rounded-lg bg-white p-1">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'equipment-buy' 
                    ? 'bg-accent-500 text-white' 
                    : 'text-gray-700 hover:text-accent-500'
                }`}
                onClick={() => handleTabChange('equipment-buy')}
              >
                For Sale
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'equipment-rent' 
                    ? 'bg-accent-500 text-white' 
                    : 'text-gray-700 hover:text-accent-500'
                }`}
                onClick={() => handleTabChange('equipment-rent')}
              >
                For Rent
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;