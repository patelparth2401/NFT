import PropTypes from "prop-types";
import { motion } from "framer-motion";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
      {/* Motion animation for smooth popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-xl max-w-[60%] w-full relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-transparent text-red-500 hover:bg-red-100 rounded-full p-2 transition duration-300"
        >
          ✖
        </button>

        {/* Modal Content */}
        {children}
      </motion.div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
