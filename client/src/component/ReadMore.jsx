import React from 'react'

export default function ReadMore() {

   

    return (
        <div>
            <div className='bg-gray-100  m-auto w-[90%] justify-center'>
                <div className='flex flex-col w-[80%] m-auto '>
                    <div className='flex '>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/024/226/462/small/happy-anime-boy-logo-vector.jpg" className='rounded-full h-[50px] ' alt="" />
                        <p className='ml-[10px] m-auto font-semibold'>Ramesh Sharma</p>
                    </div>
                </div>

                <form>
                    <div class="w-[80%] m-auto mt-[2%] border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 max-h-[95px] overflow-hidden ">
                            <p className='font-bold mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p >Lorem ipsum dolor, llat l Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione iste impedit minus placeat esse odio molestias! Aperiam quaerat labore tempore inventore? Cum iste eaque possimus numquam doloremque dignissimos, itaque, omnis vero repellat non aperiam esse velit sunt quis quibusdam in ea! Laborum, voluptatibus harum consequuntur neque repudiandae dolorem possimus assumenda? Suscipit numquam voluptatibus delectus consectetur doloribus quisquam libero beatae eum minus iure, optio facere repudiandae assumenda asperiores praesentium illo omnis mollitia magni deserunt? Placeat quas ullam ex expedita magni dolor! Accusamus numquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsa totam natus voluptas consequuntur, hic nihil soluta laudantium dolorem ipsum voluptate? Officiis accusantium atque consectetur eaque labore ut error quidem odio maiores impedit, provident sunt delectus possimus odit nihil quaerat, explicabo dolor! Laboriosam animi, illum ipsa inventore, aspernatur doloribus soluta molestias molestiae sed officiis atque adipisci corporis similique cupiditate. Est beatae autem fugit reiciendis veniam, eum omnis veritatis, ut, officia aliquid modi aperiam quae ea laboriosam ipsam cupiditate. id, facilis architecto incidunt autem ut neque. culpa corporis! Aliquam tenetur im placeat odit Lorem ipsum dolor, sit   Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum beatae maiores ipsam. Pariatur nesciunt autem quasi maxime. Asperiores natus veritatis maxime molestias impedit, et ipsa enim rem sit aliquam placeat officiis similique perferendis debitis non expedita molestiae culpa totam eligendi nesciunt distinctio qui beatae? Rerum, quis aliquid ipsa neque, amet possimus laboriosam beatae repellendus esse magni dicta nam. amet consectetur adipisicing elit. Error quis minima voluptas tempore impedit, minus fugit odit voluptatum aspernatur. ducimus.
                            </p>
                        </div>

                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <div className=' ml-2 flex gap-x-8'>
                                <span class="material-symbols-outlined">comment</span>
                                <span class="material-symbols-outlined">thumb_up</span>
                            </div>
                            <div class="flex pl-0 space-x-1 sm:pl-2">


                                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">


                                    <span>{t}</span>

                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[5%]'>
                        <button class="bg-blue-500 ml-[10%] mb-[2%] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                            Chat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
