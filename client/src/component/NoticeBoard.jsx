import React from 'react'

export default function NoticeBoard() {
	let time = new Date().toLocaleTimeString();
  return (
	
   <>
    <section className="p-6 bg-blue-200">
  <div className="container w-[100%] outline-black  my-1 mx-auto">
  <div className='font-bold text-3xl tracking-wide outline-black border-black  font-serif text-center mb-2'>Recent Updates</div>
    <div className="flex flex-col w-[98%] bg-white border-2  border-black p-6 space-y-8 rounded-md lg:h-full lg:p-8 asdasd:bg-gray-900 asdasd:text-gray-100">
    <p className="  text-black text-2xl italic font-semibold text-left">Important Update: Changes to Legal Service Hours</p>
      <blockquote className="  text-gray-500 italic font-normal text-left">
        In India, the legal service sector is largely unorganized, making it difficult for people to access legal services. Many legal service providers, such as advocates, arbitrators, mediators, notaries, and document writers, operate independently and do not have a centralized platform to offer their services to clients. This leads to a lack of transparency, lorem english sun lo yrr difficulty in finding the right legal service provider, and highoin us for an informative workshop on estate planning. Learn about the importance of wills, trusts, and estate administration. The workshop will be held on 23-10-23.  costs for clients. <span className='text-blue-400 text-light underline underline-offset-4'>Read more</span>
      </blockquote>
	 
      
      <div className='flex w-[100%] flex-row justify-between'>
        <div className='underline underline-offset-4'>Common Cause</div>
        <div>{time}</div>
      </div>
      </div>
  </div>


  <div className="container w-[100%] my-1 mx-auto">
    <div className="flex flex-col w-[98%]  bg-white  border-black border-2  p-6 space-y-8 rounded-md lg:h-full lg:p-8 asdasd:bg-gray-900 asdasd:text-gray-100">
    <p className="  text-black text-2xl italic font-semibold text-left">Upcoming Event: Legal Workshop on Estate Planning</p>
      <blockquote className="  text-gray-500 italic font-normal text-left">
	 Join us for an informative workshop on estate planning. Learn about the importance of wills, trusts, and  Stay informed about the latest changes to immigration laws. Our legal experts have summarized the recent updates, and you can find detailed information ha pasand ho  on our website. If you have questions or concerns, please don't hesitate to reach out to us.
	 Join us for an inform kuch bhi estate planning. Learn about the importance of wills, trusts, and estate administration. The workshop will be held on 23-10-23. Reserve your spot today!oin us for an informative workshop on estate planning. 
	 <span className='text-blue-400 text-light underline underline-offset-4'>Read more</span>
      </blockquote>
      
      <div className='flex w-[100%] flex-row justify-between'>
        <div className='underline underline-offset-4'>Legal Aid Services (LAS)</div>
        <div>{time}</div>
      </div>
      </div>
  </div>


  <div className="container w-[100%] my-1 mx-auto">
    <div className="flex flex-col  w-[98%] bg-white border-2   border-black p-6 space-y-8 rounded-md lg:h-full lg:p-8 asdasd:bg-gray-900 asdasd:text-gray-100">
    <p className="  text-black text-2xl italic font-semibold text-left">Legal News: Recent Changes to Immigration Laws</p>
      <blockquote className="  text-gray-500 italic font-normal text-left">
	 Stay informed about the latest changes to immigration laws. Our legal experts have summarized the recent updates, and you can find detailed information on our website. If you have questions or concerns, please don't hesitate to reach out to us.aisa thodi h
	 Join us for an informative workshop on estate planning. Learn about the importance of wills, trusts, and estate administration. The workshop pta nhii kb kaise will be held on 23-10-23. Reserve your spot today!oin us for an informative workshop on estate planning. Learn about the importance of wills, trusts, and estate administration. The workshop will be held on.  <span className='text-blue-400 text-light underline underline-offset-4'>Read more</span>
      </blockquote>
      
      <div className='flex w-[100%] flex-row justify-between'>
        <div className='underline underline-offset-4'>The Human Rights Law Network (HRLN)</div>
        <div>{time}</div>
      </div>
      </div>
  </div>

  <div className="container w-[100%] my-1 mx-auto">
    <div className="flex flex-col w-[98%] bg-white  border-black  border-2  p-6 space-y-8 rounded-md lg:h-full lg:p-8 asdasd:bg-gray-900 asdasd:text-gray-100">
    <p className="  text-black text-2xl italic font-semibold text-left">Community Outreach: Legal Education Programs</p>
      <blockquote className="  text-gray-500 italic font-normal text-left">
	 We believe in empowering our community with legal knowledge. Stay tuned for upcoming legal education programs, seminars, and webinars designed to inform and educate the public about their legal rights.
	 Join us for an informative workshop on estate but ho  planning. Learn about the importance of wills, trusts, and estate administration. The workshop will be held on 23-10-23. Reserve your spot today!oin us for an informative workshop on estate planning. Learn about the importance of wills, trusts, and estate administration. The workshop will be held on 23-10-23.  <span className='text-blue-400 text-light underline underline-offset-4'>Read more</span>
      </blockquote>
      
      <div className='flex w-[100%] flex-row justify-between'>
        <div className='underline underline-offset-4'>The Center for Social Justice (CSJ)</div>
        <div>{time}</div>
      </div>
      </div>
  </div>


  

</section>



   </>
  )
}
