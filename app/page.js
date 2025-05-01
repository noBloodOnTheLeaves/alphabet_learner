'use client'

import { CanvasDrawer } from "./components/CanvasDrawer";
import Eraser from "./components/icons/Eraser";
import PlayIcon from "./components/icons/PlayIcon";
import { useState } from "react";
import Undo from "./components/icons/Undo";
import { useTheme } from "next-themes";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import ArrowRight from "./components/icons/ArrowRight";
import Check from "./components/icons/CheckIcon";

export default function Home() {
  const [letter, setLetter] = useState('ა');
  const [drawer, setDrawer] = useState();
  const [rating, setRating] = useState(0);
  const { theme, } = useTheme();
  const georgianAlphabet = [
    'ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ფ', 'ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ', 'ხ', 'ჯ', 'ჰ'
  ];
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: theme === 'dark' ? 'white' : 'dark',
    inactiveFillColor: 'grey'
  }

  const handleRating = (rate) => {
    setRating(rate)
  }

  const nextLetter = () => {
    const randomIndex = Math.floor(Math.random() * georgianAlphabet.length);
    setLetter(georgianAlphabet[randomIndex]);
    console.log(georgianAlphabet[randomIndex]);
    drawer.clear()

  }
  const checkLetter = () => {
    const dataUrl = drawer.getDataURL();
    // Convert data URL to Blob
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'drawing.png');
        formData.append('letter', letter);

        fetch('/api/check-letter', {
          method: 'POST',
          body: formData
        });
      });
  }

  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 row-start-2 items-center">
        <div className="flex gap-4 items-start flex-col sm:flex-row">
          <div 
          className={`
          ${rating >= 3.6 ? "shadow-[0_20px_50px_rgba(0,_255,_0,_0.7)]" :
            rating >= 3 && rating < 3.6 ? "shadow-[0_20px_50px_rgba(255,_165,_0,_0.7)]" : 
            rating < 1 ? "shadow-[0_20px_50px_rgba(128,_128,_128,_0.7)]" :
            "shadow-[0_20px_50px_rgba(255,_0,_0,_0.7)]"
            }`} 
            id="container"
            >
            <CanvasDrawer setDrawer={setDrawer} />
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => { drawer.eraseAll() }}
              className="mt-2 px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              <Eraser />
            </button>
            <button
              onClick={() => { drawer.undo() }}
              className="mb-2 mt-2 px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              <Undo />
            </button>
            <div>
              <Rating
                itemStyles={myStyles}
                style={{ maxWidth: 30 }}
                orientation="vertical"
                value={rating}
                readOnly
                transition="zoom"
                itemStrokeWidth={2}
                spaceInside="medium"
                spaceBetween="medium"
              />
            </div>
          </div>


        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            title="Check letter"
            onClick={checkLetter}
            className="transform active:scale-95 transition-all duration-75 hover:scale-110 transform transition group relative flex flex-row items-center"
          >
            <span className="dark:invert "><Check /></span>
            <span className="dark:invert invisible group-hover:visible absolute right-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white">
              Check letter
            </span>
          </button>
          <button
            onClick={() => {
              const audio = new Audio(`/audio/${letter}.ogg`);
              audio.play();
            }}
            className="transform active:scale-95 transition-all duration-75 hover:scale-110 transform transition"
          >
            <span className="dark:invert shadow-md"><PlayIcon /></span>
          </button>
          <button
            title="Next letter"
            onClick={nextLetter}
            className="transform active:scale-95 transition-all duration-75 hover:scale-110 transform transition group relative flex flex-row items-center"
          >
            <span className="dark:invert "><ArrowRight /></span>
            <span className="dark:invert invisible group-hover:visible absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white">
              Next letter
            </span>
          </button>
          {/*  <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a> */}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" >
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
