import React from 'react';
import { Link } from 'react-router-dom'
import { PublicLayout } from '../../../components/layout'

const About = () => {
  return (
    <PublicLayout>
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-fraunces font-bold mb-8 text-secondary">About Oblix Pilates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-fraunces font-semibold mb-4 text-secondary">Our Story</h2>
            <p className="mb-4 text-gray-700 font-montserrat">
              Oblix Pilates was founded in 2018 with a simple mission: to make the transformative benefits of Pilates 
              accessible to everyone. Our studio began as a small space with just two reformers and has grown into 
              a thriving community center for wellness and movement.
            </p>
            <p className="mb-4 text-gray-700 font-montserrat">
              What sets us apart is our commitment to personalized instruction and a welcoming atmosphere 
              where clients of all fitness levels feel comfortable and supported on their wellness journey.
            </p>
          </div>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            [Studio Image Placeholder]
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-fraunces font-semibold mb-6 text-secondary">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-fraunces font-medium mb-3 text-primary">Movement for Everyone</h3>
              <p className="text-gray-700 font-montserrat">
                We believe that Pilates is for everybody, regardless of age, fitness level, or movement history.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-fraunces font-medium mb-3 text-primary">Mind-Body Connection</h3>
              <p className="text-gray-700 font-montserrat">
                We focus on creating awareness between mind and body, teaching clients to move with intention.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-fraunces font-medium mb-3 text-primary">Sustainable Fitness</h3>
              <p className="text-gray-700 font-montserrat">
                Our approach prioritizes longevity and injury prevention over short-term fitness goals.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-fraunces font-semibold mb-6 text-secondary">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  [Instructor Photo]
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-fraunces font-medium text-secondary">Instructor Name</h3>
                  <p className="text-sm text-primary font-montserrat mb-2">Senior Pilates Trainer</p>
                  <p className="text-sm text-gray-700 font-montserrat">
                    Certified in Classical Pilates with 5+ years of teaching experience.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-fraunces font-semibold mb-6 text-secondary">Our Studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                [Studio Photo]
              </div>
            ))}
          </div>
          <p className="text-gray-700 font-montserrat">
            Our studio is equipped with top-of-the-line Pilates apparatus including reformers, Cadillacs, chairs, and barrels. 
            The space is designed to be bright, airy, and inviting, creating the perfect environment for focus and movement.
          </p>
        </div>
      </div>
    </div>
        </PublicLayout>

  );
};

export default About;
