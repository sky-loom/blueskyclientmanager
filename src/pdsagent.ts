import { Agent } from "@atproto/api";

export class AgentFactory {
  private agentMap: Map<string, Agent>;

  constructor() {
    this.agentMap = new Map();
  }

  // Creates or returns an existing Agent based on pds
  getAgent(pds: string): Agent {
    if (!this.agentMap.has(pds)) {
      const newAgent = new Agent(pds);
      this.agentMap.set(pds, newAgent);
    }
    return this.agentMap.get(pds)!;
  }
  //we should include the calls we want directly here and just do the lookup.
  // that way we can also re-lookup if someone's pds changes
}
