import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { PublicLayout } from "../../../components/layout";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqItems = [
    {
      id: 1,
      question: "What is Pilates?",
      answer: "Pilates is a form of low-impact exercise that aims to strengthen muscles while improving postural alignment and flexibility. The method was developed by Joseph Pilates in the early 20th century and focuses on controlled movements, breathing techniques, and core strength."
    },
    {
      id: 2,
      question: "Is Pilates suitable for beginners?",
      answer: "Absolutely! Pilates is adaptable for all fitness levels, including complete beginners. Our instructors will guide you through proper form and technique, offering modifications as needed. We also have specific beginner classes designed to introduce the fundamental principles of Pilates in a supportive environment."
    },
    {
      id: 3,
      question: "What's the difference between mat and reformer Pilates?",
      answer: "Mat Pilates involves exercises performed on the floor using your body weight as resistance, while reformer Pilates utilizes a specialized piece of equipment with springs, straps, and pulleys to provide resistance. Both methods focus on the core Pilates principles, but reformer work can offer additional support or challenge depending on how it's used."
    },
    {
      id: 4,
      question: "How often should I do Pilates to see results?",
      answer: "For optimal results, we recommend practicing Pilates 2-3 times per week. Consistency is key! Many clients report feeling better after just a few sessions, noticing improvements in posture and body awareness. More significant physical changes typically become apparent after 8-10 regular sessions."
    },
    {
      id: 5,
      question: "What should I wear to a Pilates class?",
      answer: "Wear comfortable clothing that allows freedom of movement but isn't too loose. Form-fitting athletic wear is ideal as it allows instructors to see your body alignment. Pilates is typically done barefoot or with grip socks, which we sell at our studio if needed."
    },
    {
      id: 6,
      question: "Do I need to bring anything to class?",
      answer: "Just yourself and a water bottle! We provide all necessary equipment including mats, reformers, and props. If you prefer to use your own mat for hygiene reasons, you're welcome to bring it."
    },
    {
      id: 7,
      question: "How is Pilates different from yoga?",
      answer: "While both practices focus on the mind-body connection, Pilates primarily emphasizes core strength, posture, and precise movements, often incorporating equipment. Yoga typically integrates more flexibility, meditation, and spiritual elements with primarily mat-based postures. Many people find the practices complementary!"
    },
    {
      id: 8,
      question: "Can Pilates help with my back pain?",
      answer: "Many clients report relief from back pain through regular Pilates practice due to its focus on core strength, proper alignment, and balanced muscle development. However, if you have a specific medical condition, please consult your healthcare provider before beginning any exercise program and inform your instructor about any concerns."
    },
    {
      id: 9,
      question: "What is your cancellation policy?",
      answer: "We request 24 hours' notice for class cancellations to allow other clients the opportunity to book the spot. Late cancellations or no-shows may result in a charge for the full session price. We understand that emergencies happen, so please contact us as soon as possible if you need to cancel unexpectedly."
    },
    {
      id: 10,
      question: "Do you offer private sessions?",
      answer: "Yes! Private sessions are available and are a great way to receive personalized attention and work toward specific goals or address particular concerns. Our private sessions are 55 minutes long and can be booked online or by contacting our studio directly."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
        <PublicLayout>

    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-fraunces font-bold mb-2 text-secondary text-center">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 mb-10 font-montserrat text-center">
          Everything you need to know about Oblix Pilates
        </p>

        <div className="max-w-3xl mx-auto mb-16">
          {faqItems.map((item) => (
            <div key={item.id} className="mb-4 border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left font-fraunces text-xl font-medium text-secondary py-2 focus:outline-none"
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.question}</span>
                <span className={`transition-transform transform ${openItems[item.id] ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              {openItems[item.id] && (
                <div className="mt-2 text-gray-700 font-montserrat">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-fraunces font-semibold mb-4 text-secondary">Still have questions?</h2>
          <p className="text-gray-700 font-montserrat mb-6">
            If you couldn't find the answer to your question, please feel free to contact us directly.
            Our team is always happy to help!
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-opacity-80 text-white rounded-full px-6 py-3 transition-colors font-montserrat font-medium">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
            </PublicLayout>

  );
};

export default FAQ;
