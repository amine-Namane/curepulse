import React from 'react'

export default function Definsection() {
  return (
    <section>
    <section className="flex items-center justify-center min-h-screen">
  <div className=" mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-1 md:grid-cols-5 md:items-center md:gap-8">
      <div className="md:col-span-3 max-w-xl">  {/* Decrease text width slightly */}
        <div className="max-w-xs md:max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            All Your Health Needs<span className='text-[#0089FF]'> in One Place</span>
          </h2>

          <p className="mt-4 text-gray-700">
            Access your medical records, schedule appointments, and connect with your doctor—all from one secure and easy-to-use platform designed for your health and convenience.
          </p>
        </div>
      </div>

      <div className="md:col-span-2">  {/* Decrease image width */}
        <img
          src="/assets/images/onboarding-img.png"
          className=" rounded"
          alt=""
        />
      </div>
    </div>
  </div>
</section>
{/* <section>
  <div className="mx-auto max-w-screen-md px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
      <div className="md:col-span-3">
        <img
          // src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          
          className="rounded"
          alt=""
        />
      </div>

      <div className="md:col-span-1">
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            <span>We Care</span> about your health 
          </h2>

          <p className="mt-4 text-gray-700">
            Good health the state of mental, physical and social well bing and it does not just mean abseance of 
          </p>
        </div>
      </div>
    </div>
  </div>
</section> */}
</section>
  )
}
