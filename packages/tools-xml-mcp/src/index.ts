#!/usr/bin/env node
import process from 'node:process';
// Remove direct SDK imports
// import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
// Import ToolDefinition instead of Tool
import type { ToolDefinition, ToolExecuteOptions } from '@sylphlab/tools-core';
// Import the server start function
import { startMcpServer } from '@sylphlab/tools-adaptor-mcp';

// Import the tool object from the core library
import { xmlTool } from '@sylphlab/tools-xml';
import { description, name, version } from '../package.json'; // Import metadata

// --- Server Setup ---

// Array of imported tool objects
// biome-ignore lint/suspicious/noExplicitAny: Necessary for array of tools with diverse signatures
const tools: ToolDefinition<any>[] = [xmlTool]; // Use ToolDefinition

// --- Server Start ---
// Directly call startMcpServer at the top level
(async () => {
  const toolOptions: ToolExecuteOptions = {
    workspaceRoot: process.cwd(),
    // Add other options if needed, e.g., allowOutsideWorkspace: false
  };
  try {
    await startMcpServer(
      {
        name, // Use name from package.json
        version, // Use version from package.json
        description, // Use description from package.json
        tools,
      },
      toolOptions, // Pass the created options object
    );
  } catch (_error) {
    // Error handling is inside startMcpServer
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGINT', () => {
  process.exit(0);
});
process.on('SIGTERM', () => {
  process.exit(0);
});
