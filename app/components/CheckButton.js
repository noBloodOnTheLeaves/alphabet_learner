'use server'

import {Client} from "@gradio/client";
import Check from "./icons/CheckIcon";
//import { submitDrawing } from "../actions";

export default async function CheckButton() {
    const submitDrawing = async () => {
        try {
            const app = await Client.connect("PandaLikesPotato/panda_sandbox");
            const app_info = await app.view_api();
            return { success: true, data: app_info };
        } catch (error) {
            console.error('Error in server action:', error);
            return { success: false, error: error.message };
        }
    }
    return (
      <button
          type="submit"
          title="Check letter"
          onClick={()=>{}}
          className="transform active:scale-95 transition-all duration-75 hover:scale-110 transform transition group relative flex flex-row items-center"
      >
          <span className="dark:invert"><Check/></span>
          <span
              className="dark:invert invisible group-hover:visible absolute right-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white">
          Check letter
        </span>
      </button>
  );
}
