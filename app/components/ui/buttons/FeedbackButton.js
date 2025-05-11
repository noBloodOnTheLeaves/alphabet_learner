import Check from "@/app/components/icons/CheckIcon";
import FeedbackIcon from "@/app/components/icons/FeedbackIcon";

export default function Feedback(props) {
    return (
        <button
            type="submit"
            title="Send feedback"
            onClick={() => {
            }}
            className="transform active:scale-95 transition-all duration-75 hover:scale-110 transform transition group relative flex flex-row items-center"
        >
            <span className="dark:invert"><FeedbackIcon/></span>
            <span
                className="dark:invert invisible group-hover:visible absolute right-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white">
          Check letter
        </span>
        </button>
    );
}
