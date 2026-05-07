'use client';

import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "President", company: "Acro Distribution and Logistics", content: "Vincent single-handedly transformed our IT infrastructure across all branches. His expertise in network security and system reliability has been invaluable to our operations.", rating: 5 },
  { name: "Owner", company: "Infinitecs Call Center Services", content: "We hired Vincent when our building was still under construction. He designed and built our entire IT infrastructure from the ground up. His dedication and technical skills are exceptional.", rating: 5 },
  { name: "Finance Manager", company: "Roberts Automotive & Industrial Parts", content: "Vincent recovered 14 years of our historical emails that we thought were lost forever. His problem-solving abilities and commitment to getting things done right are remarkable.", rating: 5 },
];

const Testimonials = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Feedback from colleagues and managers I've had the privilege to work with.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-7 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex flex-col"
            >
              <Quote className="absolute top-5 right-5 text-indigo-200 dark:text-indigo-900" size={36} />
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={15} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-800 dark:text-gray-100 mb-6 leading-relaxed text-sm flex-1">
                "{t.content}"
              </p>
              <div className="pt-5 border-t border-gray-100 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
