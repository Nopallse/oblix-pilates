import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { PublicLayout } from "../../../components/layout";

const Classes = () => {
  const [filter, setFilter] = useState('all');

  // Sample class data
  const classTypes = [
    {
      id: 1,
      name: "Mat Pilates",
      description: "Foundation level class focusing on core strength, proper alignment, and fundamental Pilates principles. Perfect for beginners or those looking to refine their technique.",
      duration: "55 min",
      intensity: "Low to Medium",
      category: "beginner",
      image: "mat-pilates.jpg"
    },
    {
      id: 2,
      name: "Reformer Basics",
      description: "Introduction to the Pilates reformer machine. Learn proper setup, spring settings, and essential exercises to build confidence on the equipment.",
      duration: "55 min",
      intensity: "Low",
      category: "beginner",
      image: "reformer-basics.jpg"
    },
    {
      id: 3,
      name: "Intermediate Reformer",
      description: "Take your reformer practice to the next level with more complex sequences, increased spring resistance, and challenging variations.",
      duration: "55 min",
      intensity: "Medium",
      category: "intermediate",
      image: "intermediate-reformer.jpg"
    },
    {
      id: 4,
      name: "Advanced Reformer Flow",
      description: "A dynamic, flowing class for experienced practitioners. Incorporates advanced transitions, reduced spring tension for increased challenge, and complex exercises.",
      duration: "55 min",
      intensity: "High",
      category: "advanced",
      image: "advanced-reformer.jpg"
    },
    {
      id: 5,
      name: "Pilates for Athletes",
      description: "Specifically designed for athletes looking to enhance performance, increase flexibility, and prevent injury through targeted Pilates exercises.",
      duration: "55 min",
      intensity: "Medium to High",
      category: "specialized",
      image: "pilates-athletes.jpg"
    },
    {
      id: 6,
      name: "Prenatal Pilates",
      description: "Safe and effective exercises for expectant mothers in all trimesters. Focus on pelvic floor strength, postural support, and breathing techniques.",
      duration: "45 min",
      intensity: "Low",
      category: "specialized",
      image: "prenatal-pilates.jpg"
    },
    {
      id: 7,
      name: "Tower/Cadillac",
      description: "Explore the versatility of the Pilates Cadillac/Tower apparatus. This equipment offers unique spring work for both support and challenge.",
      duration: "55 min",
      intensity: "Medium",
      category: "intermediate",
      image: "tower-cadillac.jpg"
    },
    {
      id: 8,
      name: "Jump Board Cardio",
      description: "Add cardio to your Pilates routine with reformer jump board intervals. A fun, low-impact way to elevate your heart rate while maintaining core engagement.",
      duration: "45 min",
      intensity: "High",
      category: "specialized",
      image: "jump-board.jpg"
    },
  ];

  const filteredClasses = filter === 'all' 
    ? classTypes 
    : classTypes.filter(cls => cls.category === filter);

  // Weekly schedule data
  const weeklySchedule = [
    {
      day: "Monday",
      classes: [
        { time: "7:00 AM", name: "Mat Pilates", instructor: "Sarah" },
        { time: "9:00 AM", name: "Reformer Basics", instructor: "Michael" },
        { time: "12:00 PM", name: "Intermediate Reformer", instructor: "David" },
        { time: "5:30 PM", name: "Tower/Cadillac", instructor: "Sarah" },
        { time: "7:00 PM", name: "Advanced Reformer Flow", instructor: "Aisha" }
      ]
    },
    {
      day: "Tuesday",
      classes: [
        { time: "7:00 AM", name: "Jump Board Cardio", instructor: "David" },
        { time: "9:00 AM", name: "Prenatal Pilates", instructor: "Aisha" },
        { time: "12:00 PM", name: "Mat Pilates", instructor: "Michael" },
        { time: "5:30 PM", name: "Reformer Basics", instructor: "Sarah" },
        { time: "7:00 PM", name: "Intermediate Reformer", instructor: "David" }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        { time: "7:00 AM", name: "Mat Pilates", instructor: "Sarah" },
        { time: "9:00 AM", name: "Pilates for Athletes", instructor: "David" },
        { time: "12:00 PM", name: "Reformer Basics", instructor: "Aisha" },
        { time: "5:30 PM", name: "Advanced Reformer Flow", instructor: "Michael" },
        { time: "7:00 PM", name: "Tower/Cadillac", instructor: "Sarah" }
      ]
    },
    {
      day: "Thursday",
      classes: [
        { time: "7:00 AM", name: "Intermediate Reformer", instructor: "Michael" },
        { time: "9:00 AM", name: "Prenatal Pilates", instructor: "Aisha" },
        { time: "12:00 PM", name: "Mat Pilates", instructor: "Sarah" },
        { time: "5:30 PM", name: "Jump Board Cardio", instructor: "David" },
        { time: "7:00 PM", name: "Reformer Basics", instructor: "Michael" }
      ]
    },
    {
      day: "Friday",
      classes: [
        { time: "7:00 AM", name: "Advanced Reformer Flow", instructor: "David" },
        { time: "9:00 AM", name: "Mat Pilates", instructor: "Sarah" },
        { time: "12:00 PM", name: "Tower/Cadillac", instructor: "Aisha" },
        { time: "5:30 PM", name: "Pilates for Athletes", instructor: "Michael" },
        { time: "7:00 PM", name: "Intermediate Reformer", instructor: "Sarah" }
      ]
    },
    {
      day: "Saturday",
      classes: [
        { time: "8:00 AM", name: "Jump Board Cardio", instructor: "Aisha" },
        { time: "10:00 AM", name: "Reformer Basics", instructor: "Sarah" },
        { time: "12:00 PM", name: "Mat Pilates", instructor: "Michael" },
        { time: "2:00 PM", name: "Advanced Reformer Flow", instructor: "David" }
      ]
    },
    {
      day: "Sunday",
      classes: [
        { time: "9:00 AM", name: "Mat Pilates", instructor: "David" },
        { time: "11:00 AM", name: "Intermediate Reformer", instructor: "Sarah" },
        { time: "1:00 PM", name: "Prenatal Pilates", instructor: "Aisha" }
      ]
    }
  ];

    return (
    <PublicLayout>
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-fraunces font-bold mb-2 text-secondary">Our Classes</h1>
        <p className="text-lg text-gray-600 mb-10 font-montserrat">
          Explore our variety of Pilates classes designed for all levels
        </p>

        {/* Class Types Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-fraunces font-semibold text-secondary">Class Types</h2>

            <div className="flex flex-wrap gap-2">
              {['all', 'beginner', 'intermediate', 'advanced', 'specialized'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-montserrat ${
                    filter === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map(cls => (
              <div key={cls.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <img src={`/images/${cls.image}`} alt={cls.name} className="w-full h-40 object-cover rounded mb-4" />
                <h3 className="text-xl font-semibold text-secondary mb-2">{cls.name}</h3>
                <p className="text-gray-700 text-sm mb-2">{cls.description}</p>
                <p className="text-sm text-gray-500">Duration: {cls.duration} | Intensity: {cls.intensity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div>
          <h2 className="text-2xl font-fraunces font-semibold text-secondary mb-6">Weekly Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklySchedule.map(day => (
              <div key={day.day} className="bg-gray-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary mb-2">{day.day}</h3>
                <ul className="space-y-2 text-sm font-montserrat text-gray-700">
                  {day.classes.map((cls, idx) => (
                    <li key={idx}>
                      <span className="font-bold">{cls.time}</span> - {cls.name} <span className="text-xs text-gray-500">({cls.instructor})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        </PublicLayout>
  );
};

export default Classes;