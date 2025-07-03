const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M10.6776 2.13179C11.452 -0.25162 14.8239 -0.25162 15.5983 2.13179L16.768 5.73181C17.1143 6.79771 18.1076 7.51937 19.2284 7.51937H23.0137C25.5197 7.51937 26.5617 10.7262 24.5343 12.1993L21.4719 14.4242C20.5652 15.083 20.1858 16.2506 20.5321 17.3165L21.7018 20.9166C22.4762 23.3 19.7483 25.2819 17.7209 23.8089L14.6585 21.584C13.7518 20.9252 12.524 20.9252 11.6173 21.584L8.55498 23.8089C6.52753 25.2819 3.79961 23.3 4.57403 20.9166L5.74374 17.3165C6.09007 16.2506 5.71067 15.083 4.80397 14.4242L1.74161 12.1993C-0.285845 10.7262 0.756125 7.51937 3.26219 7.51937H7.04748C8.16823 7.51937 9.16152 6.79771 9.50785 5.73181L10.6776 2.13179Z" fill="currentColor"/>
  </svg>
);

const TestimonialCard = ({ text, name, age, image, rating = 5 }) => {
  return (
    <div className="w-full h-full bg-neutral-50 rounded-[3rem] shadow-lg p-8 flex flex-col justify-between">
      
      <p className="text-neutral-600 text-base sm:text-lg font-raleway leading-relaxed tracking-tight text-justify">
        "{text}"
      </p>

      <div className="flex items-center mt-2">
        <img 
          src={image} 
          alt={name} 
          className="w-14 h-14 rounded-full bg-primary object-cover flex-shrink-0" 
        />
        <div className="ml-4 flex flex-col">
          <h3 className="text-black text-lg sm:text-xl font-inter font-medium leading-tight">
            {name}{age ? `, ${age}` : ''}
          </h3>
          <div className="flex items-center mt-1">
            {[...Array(rating)].map((_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;