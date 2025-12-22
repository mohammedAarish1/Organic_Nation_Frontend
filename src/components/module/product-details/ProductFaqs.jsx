import {motion,AnimatePresence} from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { memo, useState } from 'react';


const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <motion.div
    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-left text-gray-800 text-lg">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={20} className="text-orange-500" />
      ) : (
        <ChevronDown size={20} className="text-gray-500" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50"
        >
          <p className="px-5 py-4 text-gray-700 leading-relaxed">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);


const ProductFaqs = memo(({faqs}) => {
      const [openAccordion, setOpenAccordion] = useState(0); // For dropdowns
    
  return (
     <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  title={faq.q}
                  content={faq.a}
                  isOpen={openAccordion === faq.id}
                  onClick={() =>
                    setOpenAccordion(openAccordion === faq.id ? null : faq.id)
                  }
                />
              ))}
            </div>
          </section>
  )
})

export default ProductFaqs
