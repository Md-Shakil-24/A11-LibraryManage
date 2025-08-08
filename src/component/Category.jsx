import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories([ 
      {
        id: 1,
        name: 'Science',
        image: 'https://i.ibb.co/C5j4bs8V/science-exhibitions.jpg'
      },
      
      {
        id: 2,
        name: 'History',
        image: 'https://i.ibb.co/zT2GXhW8/history1.jpg'
      },
     {
        id: 3,
        name: 'Novel',
        image: 'https://i.ibb.co/v4c34g00/novel1.jpg'
      },
      {
        id: 4,
        name: 'CSE',
        image: 'https://i.ibb.co/mCLMtLYZ/cse1.jpg'
      },
      {
        id: 5,
        name: 'EEE',
        image: 'https://i.ibb.co/nMymqdt3/eee1.jpg'
      },
      {
        id: 6,
        name: 'Pharmacy',
        image: 'https://i.ibb.co/YFchsbYm/pharmacy1.jpg'
      },
      {
        id: 7,
        name: 'Sci-Fi',
        image: 'https://i.ibb.co/1GnrfNPX/scify1.png'
      },
      {
        id: 8,
        name: 'Drama',
        image: 'https://i.ibb.co/vx95ryyN/drama1.jpg'
      }
    ]);
  }, []);

  const handleClick = (category) => {
    navigate(`/auth/category/${category}`);
  };

  return (
    <section className="w-[95%] mx-auto px-1 lg:px-5 mt-12  ">
     

      <div className=" mx-auto  z-10 relative">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow">
          📚 Explore Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {categories.map(cat => (
            <motion.div
              key={cat.id}
              onClick={() => handleClick(cat.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer bg-white rounded-[12px] lg:rounded-[12px]  overflow-hidden shadow-xl hover:shadow-indigo-300 border border-gray-400 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-44 object-cover transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-80 transition" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-indigo-700">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
