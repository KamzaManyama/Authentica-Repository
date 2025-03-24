import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/5 lg:w-2/5 max-h-[80vh] flex flex-col"
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-blue-600">Terms & Conditions</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onClose}
            className="text-gray-600 text-xl"
          >
            &times;
          </motion.button>
        </div>
        <div className="overflow-y-auto max-h-[60vh] space-y-4 text-sm text-gray-700 p-2">
          <p><strong>1. Acceptance of Terms</strong> - By using Authentica, you agree to these Terms.</p>
          <p><strong>2. Use of the Service</strong> - The app is intended for lawful authentication and verification purposes.</p>
          <p><strong>3. User Responsibilities</strong> - You must protect your authentication credentials.</p>
          <p><strong>4. Privacy & Data Protection</strong> - We prioritize user privacy and encryption.</p>
          <p><strong>5. Security and Limitations</strong> - We implement security protocols but cannot guarantee absolute security.</p>
          <p><strong>6. Third-Party Services</strong> - Authentica integrates with third-party platforms at your discretion.</p>
          <p><strong>7. Limitation of Liability</strong> - We are not responsible for damages resulting from app usage.</p>
          <p><strong>8. Termination and Account Suspension</strong> - Accounts may be suspended for misuse.</p>
          <p><strong>9. Updates and Modifications</strong> - We may update the app to improve functionality.</p>
          <p><strong>10. Governing Law and Dispute Resolution</strong> - Any disputes will be resolved under applicable law.</p>
          <p><strong>11. Contact Information</strong> - Reach us at Authentica@support.co.za.</p>
        </div>
        <div className="text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
