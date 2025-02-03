import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex items-center">
      {/* Search Container */}
      <motion.div 
        className="flex items-center rounded-full overflow-hidden"
        animate={{ width: isOpen ? "200px" : "34px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Search Icon Button */}
        <button 
          className="p-2 rounded-full flex items-center justify-center hover:bg-base-100"
          onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen
                ? <FontAwesomeIcon className="text-primary" icon={faXmark} />
                : <FontAwesomeIcon className="text-primary" icon={faMagnifyingGlass} />}
        </button>

        {/* Search Input */}
        {isOpen && (
          <motion.input 
            type="text"
            placeholder="Search..."
            className="border-none px-3 py-1 w-full text-md rounded-full bg-base-100 focus:outline-primary"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
          />
        )}
      </motion.div>
    </div>
  );
}
