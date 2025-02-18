import React from 'react';

export default function MainHeader({ h1, p, button, button2 }) {
  return (
    <header className="mt-20 p-5 w-5/12">
      <h1
        className="text-2xl font-bold text-[#0089ff] text-start"
        dangerouslySetInnerHTML={{ __html: h1 }}
      />
      <p className="mt-2 text-[#A7A7A7]">{p}</p>
      <div className=" text-start mt-5 ">
        <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-full shadow-lg">{button}</button>
        {/* {button2 && (
          <button className=" px-4 py-2">{button2}</button>
        )} */}
      </div>
    </header>
  );
}
