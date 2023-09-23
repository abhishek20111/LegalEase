import React from "react";

export default function Rating(props) {
  console.log("Rating: ", props);
  return (
    <>
      <div className="w-[100%] m-auto  p-4">
        <article>
          <div class="flex items-center mb-4 bg-white space-x-4">
            <img class="w-10 h-10 rounded-full" src={props.data.Id.photo} alt="" />
            <div class="space-y-1 font-medium dark:text-white">
              <p>
                {props.data.Id.name}
              </p>
            </div>
          </div> 
          <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          </footer>
          <p class="mb-2 text-gray-500 dark:text-gray-400"></p>
          <p class="mb-3 text-gray-500 dark:text-gray-400">{props.data.description}</p>
          <hr className="mt-2"></hr>
        </article>
      </div>
    </>
  );
}
