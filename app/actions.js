'use server'

import { Client } from "@gradio/client";

export async function submitDrawing() {
  try {
    const app = await Client.connect("PandaLikesPotato/panda_sandbox");
    const app_info = await app.view_api();
    return { success: true, data: app_info };
  } catch (error) {
    console.error('Error in server action:', error);
    return { success: false, error: error.message };
  }
} 