import "@/lib/db";

// export default function Home() {
//   return (
//     // <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
//     //   <div className="bg-white w-full shadow-md rounded-3xl p-5 max-w-screen-sm dark:bg-gray-600">
//     //     <div className="flex justify-between items-center">
//     //       <div className="flex flex-col">
//     //         <span className="text-gray-500 font-semibold dark:text-gray-300">
//     //           In transit
//     //         </span>
//     //         <span className="text-4xl font-semibold -mb-1 dark:text-white">
//     //           Coolblue
//     //         </span>
//     //       </div>
//     //       <div className="size-12 rounded-full bg-orange-400"></div>
//     //     </div>
//     //     <div className="my-2 flex items-center gap-2">
//     //       <span className="bg-green-400 text-white uppercase px-2 py-1.5 text-xs font-medium rounded-full hover:bg-green-500 hover:scale-125 transition">
//     //         Today
//     //       </span>
//     //       <span className="dark:text-gray-100">9:30 - 10:10u</span>
//     //     </div>
//     //     <div className="relative">
//     //       <div className="bg-gray-200 w-full h-2 rounded-full absolute"></div>
//     //       <div className="bg-green-300 w-2/3 h-2 rounded-full absolute"></div>
//     //     </div>
//     //     <div className="flex justify-between items-center mt-5 text-gray-600 dark:text-gray-300">
//     //       <span>Expected</span>
//     //       <span>Sorting center</span>
//     //       <span>In transit</span>
//     //       <span className="text-gray-400 dark:text-gray-500">Delivered</span>
//     //     </div>
//     //   </div>
//     // </main>

import Link from "next/link";

//     // <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700 sm:dark:bg-red-100 md:dark:bg-green-100 lg:dark:bg-cyan-100 xl:dark:bg-orange-500 dark:2xl:bg-fuchsia-600">
//     //   <div className="bg-white w-full shadow-md rounded-3xl p-5 max-w-screen-sm flex flex-col gap-2 *:outline-none   has-[:invalid]:ring-red-100 ring ring-transparent transition-shadow">
//     //     <input
//     //       type="email"
//     //       placeholder="Email address"
//     //       required
//     //       className="w-full rounded-full h-10 pl-5 bg-gray-200 ring focus:ring-green-400 focus:ring-offset-2 ring-offset-blue-600 ring-transparent transition-shadow placeholder:text-red-500 invalid:focus:ring-red-500 peer"
//     //     />
//     //     <span className="text-red-500 font-medium hidden peer-invalid:block">
//     //       Emaill is required.
//     //     </span>
//     //     {/* <button className="bg-black text-white py-2 rounded-full active:scale-90 transition-transform font-medium focus:scale-90 outline-none  bg-opacity-50 focus:bg-opacity-100"> */}
//     //     <button className=" text-white py-2 rounded-full active:scale-90 transition-transform font-medium focus:scale-90   bg-opacity-50 focus:bg-opacity-100 peer-invalid:bg-red-400 bg-black peer-required:bg-green-500">
//     //       Search
//     //     </button>
//     //   </div>
//     // </main>

//     <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700 sm:dark:bg-red-100 md:dark:bg-green-100 lg:dark:bg-cyan-100 xl:dark:bg-orange-500 dark:2xl:bg-fuchsia-600">
//       <div className="bg-white w-full shadow-md rounded-3xl p-5 max-w-screen-sm flex flex-col gap-4 *:outline-none   has-[:invalid]:ring-red-100 ring ring-transparent transition-shadow">
//         {/* {["nico", "me", "you", "yourself", ""].map((person, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-5 odd:bg-gray-100 p-2.5 rounded-xl even:bg-orange-100 border-b-2 pb-5 last:border-0 last:pb-2.5 *:animate-pulse group"
//           >
//             <div className="size-7 bg-blue-400 rounded-full" />
//             <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
//               {person}
//             </span>
//             <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full">
//               <span className="z-10">{index}</span>
//               <div className="size-6 bg-red-500 rounded-full absolute animate-ping"></div>
//             </div>
//           </div>
//         ))} */}
//         <div className="group flex flex-col">
//           <input
//             type="text"
//             className="bg-gray-100 w-full"
//             placeholder="asdasd"
//           />
//           <span className="group-focus-within:block hidden">
//             make sure it is a valid email...
//           </span>
//           <button>Submit</button>
//         </div>
//       </div>
//     </main>
//   );
// }

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center gap-2">
        <span className="text-9xl ">당근</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn py-2.5 text-lg">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
