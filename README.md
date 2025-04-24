# BlueSky Client Manager

A TypeScript utility that combines multiple BlueSky/AT Protocol clients for different contexts, providing a unified way to interact with various endpoints in the BlueSky ecosystem. This is primarily for unauthenticated requests, and does not currently allow custom domain endpoints other than individual PDSs.

## Features

- Multiple pre-configured agents for different BlueSky unauthenticated endpoints:
  - PDS Gateway - For general repo requests directly from users
  - Public API - For unauthenticated requests via CDN
  - AppView API - For specific unauthenticated operations like getting labels
  - PDS Agent Factory - For direct PDS connections to access data not available via gateway

## Installation

```bash
npm install @sky-loom/blueskyclientmanager
```

## Usage Examples

### Basic Setup

```typescript
import { BskyClientManager } from "@sky-loom/blueskyclientmanager";

// Initialize with labelers (content warning/moderation labelers you want to receive labels from)
// Format is the DID of labelers
const clientManager = new BskyClientManager([
  "did:plc:e4elbtctnfqocyfcml6h2000",
  "did:plc:4ugewi6aca52a62u62jcc000",
  "did:plc:wkoofae5uytcm7bjncmev000",
]);
```

### Using Different API Endpoints

```typescript
// Using public unauthenticated API (CDN)
const publicTimeline = await clientManager.publicagent.app.bsky.feed.getTimeline(/*params*/);

// Using AppView for unauthenticated operations
const posts = await clientManager.appview.app.bsky.feed.getPosts({
  uris: ["at://did:plc:abcdefg/app.bsky.feed.post/123456"],
});

const myNotifications = await clientManager.authenticatedAgent.app.bsky.notification.listNotifications();
```

### Direct PDS Access

```typescript
// For operations that require direct PDS access (like block lists)
const pdsHost = "https://morel.us-east.host.bsky.network";
const pdsAgent = clientManager.pdsagents.getAgent(pdsHost);

// Now you can make calls that might be rejected by the gateway
const blockList = await pdsAgent.com.atproto.repo.listRecords({
  repo: did,
  collection: "app.bsky.graph.listblock",
});
```

### Working with Multiple PDS Instances

```typescript
// The agent factory manages connections to different PDS servers
const firstPds = clientManager.pdsagents.getAgent("https://morel.us-east.host.bsky.network");
const secondPds = clientManager.pdsagents.getAgent("https://shiitake.us-east.host.bsky.network");

// Each agent is cached and can be retrieved using the same URL
const cachedFirstPds = clientManager.pdsagents.getAgent("https://morel.us-east.host.bsky.network");
// cachedFirstPds === firstPds
```

## API Reference

### BskyClientManager

The main class that provides access to different BlueSky API endpoints.

```typescript
class BskyClientManager {
  public pdsagents: AgentFactory; // Factory for PDS-specific agents
  public pdsgateway: Agent; // Agent for the main PDS gateway
  public publicagent: Agent; // Unauthenticated agent for public API (CDN)
  public appview: Agent; // Unauthenticated agent for AppView API
  public authenticatedAgent: Agent | undefined; // Your authenticated agent

  constructor(labelers: string[]); // Initialize with content labelers
}
```

### AgentFactory

A factory class that manages and caches PDS-specific agents.

```typescript
class AgentFactory {
  getAgent(pds: string): Agent; // Get or create an agent for a specific PDS
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Created by Skyloom
