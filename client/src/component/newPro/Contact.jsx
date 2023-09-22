import React from 'react'

export default function Contact(props) {
  return (
     <div>
     <div className="bg-white rounded-t-3xl  m-auto">
     <div className="container mx-auto px-4">
     <div className='flex flex-col sm:flex-row justify-between ' >
     <div className='sm:w-[50%]'>
     <h1 className='font-semibold text-xl p-2 m-2'>Consulation Charges</h1>
          <div className='flex flex-col w-[98%]'>
               <div className='flex justify-between bg-white p-2 m-2 '><div className='text-1xl font-medium text-gray-500 '>For 1 hr consulation fees</div><div className=''>$30</div></div>
               <div className='flex justify-between bg-white p-2 m-2'><div className='text-1xl font-medium text-gray-500'>For 2 hr consulation fees</div><div>$40</div></div>
               <div className='flex justify-between bg-white p-2 m-2 '><div className='text-1xl font-medium text-gray-500' >For 3 hr consulation fees</div><div>$50</div></div>
          </div>
          <div className='font-semibold text-center sm:text-left text-xl p-2 m-2'>Address</div>
          <ul>
               <li className='p-2 text-center sm:text-left'>{props.data.address}</li>
               
          </ul>
          </div>
          <div className='sm:w-[48%]  mt-6 text-center m-2 '> 
          <div><img className="h-56 m-auto text-center bg-cover" src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"></img></div>

          <div className='flex flex-col space-between  m-auto p-2'>
          <div className='flex mb-2 m-auto w-[80%] justify-around'>
          <div><a href=""><img className='h-8 rounded-full w-8' src="https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eGluZyUyMGljb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"></img></a></div>
          <div><a href=""><img className='h-8 rounded-full w-8' src="https://images.unsplash.com/photo-1636114673156-052a83459fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"></img></a></div>
          <div><a href=""><img className='h-8 rounded-full w-8' src="https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxpbmtkaW4lMjBpY29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"></img></a></div>
          <div><a href=""><img className='h-8 rounded-full w-8' src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBpY29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60    "></img></a></div>
          <div><a href=""><img className='h-8 rounded-full w-8' src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHhpbmclMjBpY29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60    "></img></a></div></div>
          <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded text-center m-auto  '>Chat</button>
          </div>
          </div>
     </div>
      </div>
   </div>
 </div>
  )
}
