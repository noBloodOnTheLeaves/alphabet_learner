'use client'

import Check from "@/app/components/icons/CheckIcon";
import { CanvasDrawer } from "./components/CanvasDrawer";
import Eraser from "./components/icons/Eraser";
import PlayIcon from "./components/icons/PlayIcon";
import { useState } from "react";
import Undo from "./components/icons/Undo";
import { useTheme } from "next-themes";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import ArrowRight from "./components/icons/ArrowRight";
import LetterProgressBar from "./components/ui/progress/LetterProgressBar";
import LampIcon from "./components/icons/LampIcon";
import Tooltip from "./components/ui/tooltip/Tooltip";



export default function Home() {
  const [letter, setLetter] = useState('ა');
  const [drawer, setDrawer] = useState();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hintMessage, setHintMEssage] = useState('Hint');

  const { theme, } = useTheme();
  const georgianAlphabet = ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ფ', 'ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ', 'ხ', 'ჯ', 'ჰ'];

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: theme === 'dark' ? 'white' : 'dark',
    inactiveFillColor: 'grey'
  }

  const showHintMessage = () => {
    setHintMEssage(<div className="text-5xl">{letter}</div>)
    setTimeout(() => setHintMEssage('Hint'), 3000)
  }
  const nextLetter = () => {
    const randomIndex = Math.floor(Math.random() * georgianAlphabet.length);
    setLetter(georgianAlphabet[randomIndex]);
    setRating(0)
    drawer.clear()
  }

  const percentToStars = (percent, allowHalfStars = true) => {
    const stars = percent / 20; // Convert to 0–5 scale
    if (allowHalfStars) {
      // Round to nearest 0.5 (e.g., 4.25 → 4.5, 3.6 → 3.5)
      return Math.round(stars * 2) / 2;
    } else {
      // Round to nearest whole star (e.g., 4.5 → 5, 3.2 → 3)
      return Math.round(stars);
    }
  }

  const check = async () => {
    setLoading(true)
    const eventId = await runCheck();
    const prediction = await getCheckResult(eventId);

    if (prediction) {
      let result = false
      prediction.confidences.forEach((element) => {
        if (element.label === letter) {
          setRating(percentToStars(Math.round(element.confidence * 100)))
          result = true;
        }
      });
      if (!result) {
        setRating(1);
      }
    } else {
      console.log('servers');
    }
    setLoading(false)
  }

  const runCheck = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "data": [drawer.getDataURL('png', null, 'white'),
        "meta"]
    })
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch("https://pandalikespotato-panda-sandbox.hf.space/gradio_api/call/predict", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result)
        if (response?.event_id !== undefined) {
          return response.event_id
        } else {
          return false;
        }
      })
      .catch((error) => console.error(error));

  }

  const getCheckResult = async (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    return fetch(`https://pandalikespotato-panda-sandbox.hf.space/gradio_api/call/predict/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = parseEventStream(result)
        if (result?.event !== undefined) {
          return result.data[0]
        } else {
          return false;
        }

      })
      .catch((error) => console.error(error));
    /*  */
  }

  function parseEventStream(str) {
    const result = {};

    // Split by lines and process each key-value pair
    str.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(': ');
      const value = valueParts.join(': '); // Rejoin in case value contains ': '

      if (key && value !== undefined) {
        // Handle different event types
        if (key === 'data') {
          try {
            result[key] = JSON.parse(value);
          } catch (e) {
            result[key] = value; // Fallback to raw string if not JSON
          }
        } else {
          result[key] = value;
        }
      }
    });

    return result;
  }

  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 row-start-2 items-center">
        <div className="flex gap-4 items-start flex-row">
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
              className="mt-2 cursor-pointer px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              <Eraser />
            </button>
            <button
              onClick={() => { drawer.undo() }}
              className="mb-2 cursor-pointer mt-2 px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              <Undo />
            </button>
            <Tooltip message={hintMessage} className={"hover:-translate-y-1 transform transition duration-200 "} direction="mb-2 right">
              <button
                onClick={showHintMessage}
                className="mb-2 cursor-pointer px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm  hover:shadow-md"
              >
                <LampIcon />
              </button>
            </Tooltip>

            <div>
              <Rating
                itemStyles={myStyles}
                style={{ maxWidth: 30 }}
                className="cursor-pointer"
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
        {
          loading ? <div className="flex items-center flex-row"><LetterProgressBar letters={georgianAlphabet} /></div> :
            <div className="flex gap-4 items-center  flex-row">
              <button
                type="submit"
                title="Check letter"
                onClick={check}
                className="transform cursor-pointer active:scale-95 transition-all duration-75 hover:scale-110 transform transition group relative flex flex-row items-center"
              >
                <span className="dark:invert"><Check /></span>
                <span
                  className="dark:invert invisible group-hover:visible absolute right-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white">
                  Check letter
                </span>
              </button>
              <button
                onClick={() => {
                  const audio = new Audio(`/audio/${letter}.ogg`);
                  audio.play();
                }}
                className="transform cursor-pointer active:scale-95 transition-all duration-75 hover:scale-110 transform transition"
              >
                <span className="dark:invert shadow-md"><PlayIcon /></span>
              </button>
              <button
                title="Next letter"
                onClick={nextLetter}
                className="transform cursor-pointer active:scale-95 transition-all duration-75 hover:scale-110 transform transition group relative flex flex-row items-center"
              >
                <span className="dark:invert "><ArrowRight /></span>
                <span
                  className="dark:invert  invisible group-hover:visible absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white">
                  Next letter
                </span>
              </button>
            </div>
        }
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center absolute right-10 bottom-5">
        <a 
        target="_blank"
        href="https://github.com/noBloodOnTheLeaves" 
        className="font-mono text-stone-400 text-sm cursor-pointer hover:-translate-y-1 transform transition duration-200"
        >
          Created By 🐼
        </a>
      </footer>
    </div>
  );
}
