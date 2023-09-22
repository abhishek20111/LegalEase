import React from "react";

export default function Rating(props) {
  return (
    <>
      <div className="w-[100%] m-auto  p-4">
        <article>
          <div class="flex items-center mb-4 bg-white space-x-4">
            <img class="w-10 h-10 rounded-full" src={props.src} alt="" />
            <div class="space-y-1 font-medium dark:text-white">
              <p>
                {props.sname}{" "}
                <time
                  datetime="2014-08-16 19:00"
                  class="block text-sm text-gray-500 dark:text-gray-400"
                >
                  {props.date}
                </time>
              </p>
            </div>
          </div>
          <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Reviewed in the {props.place} on{" "}
              <time datetime="2017-03-03 19:00">{props.date}</time>
            </p>
          </footer>
          <p class="mb-2 text-gray-500 dark:text-gray-400"></p>
          <p class="mb-3 text-gray-500 dark:text-gray-400">{props.review}</p>
          <hr className="mt-2"></hr>
        </article>
      </div>
    </>
  );
}
