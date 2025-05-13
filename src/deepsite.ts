import { getUniSeq } from "./hash.js";

export class DeepSiteClient {
  private readonly apiKey: string;

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }
  async deepsiteChat(content: string) {
    try {
      if (!content) {
        throw new Error("Content is required");
      }
      const req = {
        message: {
          uuid: getUniSeq(),
          conv_uuid: getUniSeq(),
          content,
        },
      };
      console.log("Sending request to deepsite:", JSON.stringify(req, null, 2));
      console.log("Request URL:", "http://localhost:3000/chat/api/chat");
      const response = await fetch("http://localhost:3000/chat/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(req),
      });
      if (!response.ok) {
        throw new Error(`request failed with status ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Failed to chat with deepsite ${error}`);
    }
  }
}
