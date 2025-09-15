import { vapi } from "@/lib/vapi.sdk";

async function testVapiStart() {
  const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
  const webToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

  if (!workflowId || !webToken) {
    console.error(
      "Missing NEXT_PUBLIC_VAPI_WORKFLOW_ID or NEXT_PUBLIC_VAPI_WEB_TOKEN environment variables."
    );
    return;
  }

  try {
    console.log("Starting VAPI call with workflow ID:", workflowId);
    const result = await vapi.start(workflowId, {
      variableValues: { username: "testuser", userid: "testuserid" },
    });
    console.log("VAPI start result:", result);
  } catch (error) {
    console.error("Error starting VAPI call:", error);
  }
}

testVapiStart();
