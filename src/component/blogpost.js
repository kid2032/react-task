import React from 'react'

export default function Blogpost(props) {
    const { index, i,setModal } = props
    const functionnow = () => {
        console.log(`Button clicked for post: ${i.title}`);
    };

    return (
        <div key={index.i} className='group bg-white mb-4 h-64 justify-around  rounded-lg shadow-md border-[rgb(0,0,0,0.1)] border-2 w-60 h-auto hover:bg-[#1fbf5d] transition-colors duration-300 ease-in-out'>
            <div className='flex flex-col  justify-between h-full'>

                <div className='p-3  flex flex-col  justify-between h-full' >
                    <p className='text-black cursor-default font-medium transition-colors duration-300  group-hover:text-white'>{index.title}</p>
                    <span className='text-gray-500 cursor-default font-normal text-[13px] transition-colors duration-300 group-hover:text-gray-100 '>{index.body.slice(0,50)}...</span>
                    <div className=''>


                        <div className="">
                            <button
                                className="basis-xs font-lg rounded-2xl text-center m-2 bg-blue-500/100 text-white font-sans font-medium text-xl w-[150px] h-[2.5rem] hover:bg-blue-500/90 focus:outline-2 border-none"
                                onClick={()=>setModal(index.id)}
                            >
                                Read More
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
