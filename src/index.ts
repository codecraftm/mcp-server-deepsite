#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { DeepSiteClient } from "./deepsite.js";

// Define command line arguments interface
interface CommandLineArgs {
  [key: string]: string;
}

// Initialize MCP server
const server = new McpServer(
  {
    name: "mcp-deepsite",
    version: "0.1.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const args = parseArgs();
const apiKey = args.deepsite_api_key || process.env.DEEPSITE_API_KEY || "";

server.tool(
  "deepsite_chat",
  "Create websites with deepsite",
  {
    content: z.string(),
  },
  async ({ content }) => {
    try {
      if (!apiKey) {
        throw new Error("Deepsite API key not set");
      }
      console.log("get request:", content);
      if (!content) {
        throw new Error("Title and content are required");
      }
      const deepsite = new DeepSiteClient({ apiKey });
      const response = await deepsite.deepsiteChat(content);
      return {
        content: [
          {
            type: "text",
            text: `${response.data.message}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `DeepeSite API error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

function parseArgs(): CommandLineArgs {
  const args: CommandLineArgs = {};
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      args[key] = value;
    }
  });
  return args;
}

// Initialize MCP server connection using stdio transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
