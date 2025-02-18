import React from 'react';
function DoctorCard() {
  return (
        <div className="relative lg:w-1/2">
          <div className="relative w-96 h-96">
            <img
              src="./assets/images/asd 3.png"
              alt="Doctors"
              className="w-full h-full object-cover rounded-full shadow-xl"
            />
            
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-full shadow-lg w-64">
              <h3 className="text-lg font-semibold text-gray-800">Well Qualified Doctors</h3>
              <p className="text-sm text-gray-500">Treat with care</p>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-white p-6 rounded-full shadow-lg w-64">
              <h3 className="text-lg font-semibold text-gray-800">24/7 Availability</h3>
              <p className="text-sm text-gray-500">+231562645998</p>
            </div>
          </div>
        </div>
      );
}

export default DoctorCard;
