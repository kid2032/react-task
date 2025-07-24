import React from 'react';

export default function Modal(props) {
  const { height, width, modal, setModal } = props;

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${modal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ transition: 'opacity 0.3s ease' }}>
      <div
        className={`bg-white rounded-2xl shadow-lg max-w-3xl w-full mx-auto transform transition-all ${modal ? 'scale-100' : 'scale-95'} ${modal ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: height, width: width }}
      >
        <button
          onClick={() => setModal("")}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white bg-black rounded-full focus:outline-none"
        >
          X
        </button>

        <div className="p-6 overflow-y-auto" style={{ height: "inherit" }}>
          <div className="flex flex-col max-h-[400px] overflow-x-hidden h-full">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
