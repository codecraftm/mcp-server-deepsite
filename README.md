# mcp-server-deepsite MCP Server

A Model Context Protocol server for DeepSite integration.

This is a TypeScript-based MCP server that implements integration with DeepSite services. It provides a bridge between MCP and DeepSite's chat capabilities.

## Features

### Tools

- `deepsite_chat` - Interact with DeepSite chat API
  - Takes content as a required parameter
  - Returns chat responses from DeepSite service
  - Handles API authentication and error cases

### Configuration

- API Key configuration through:
  - Command line argument: `--deepsite_api_key=YOUR_KEY`
  - Environment variable: `DEEPSITE_API_KEY`

## Development

Install dependencies:

```bash
pnpm install
```

Build the server:

```bash
pnpm run build
```

For development with auto-rebuild:

```bash
pnpm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-server-deepsite": {
      "command": "/path/to/mcp-server-deepsite/build/index.js",
      "args": ["--deepsite_api_key=YOUR_API_KEY"]
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
pnpm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Project Structure

- `src/` - Source code directory
  - `index.ts` - Main server entry point and MCP server implementation
  - `deepsite.ts` - DeepSite API client implementation
  - `hash.ts` - UUID generation utilities
- `build/` - Compiled JavaScript output
- `tsconfig.json` - TypeScript configuration

## Dependencies

- @modelcontextprotocol/sdk: MCP protocol implementation
- zod: Runtime type checking and validation
- TypeScript for type safety
