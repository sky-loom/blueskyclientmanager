import { Agent } from "@atproto/api";
import { AgentFactory } from "./pdsagent.js";

export class BskyClientManager {
  public pdsagents: AgentFactory;
  public pdsgateway: Agent;
  public publicagent: Agent;
  public appview: Agent;
  public authenticatedAgent: Agent | undefined;
  constructor(labelers: string[]) {
    //PDS gateway for general repo requests and getting stuff directly from the user
    this.pdsgateway = new Agent("https://bsky.social");
    //unauthenticated public API, when we want to be nice and hit the CDN
    this.publicagent = new Agent("https://public.api.bsky.app");
    this.publicagent.configureLabelers(labelers);
    //unauthenticated appview, useful for a few things like getting labels unauthenticated
    this.appview = new Agent("https://api.bsky.app");
    this.appview.configureLabelers(labelers);
    //pds agent factory - connect directly to a PDS, useful for getting block lists/etc.
    // that are rejected by the gateway
    this.pdsagents = new AgentFactory();
  }
}
