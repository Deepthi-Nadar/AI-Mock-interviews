import VapiClient from "@vapi-ai/web";

const webToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

if (!webToken) {
  throw new Error("Missing NEXT_PUBLIC_VAPI_WEB_TOKEN environment variable");
}

export const vapi = new VapiClient(webToken);

// Example usage:
// vapi.start(workflowId, { variableValues: { ... } });
// vapi.stop();
// vapi.on("event", callback);
// vapi.off("event", callback);
