/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

// Import polyfills for fetch required by msgraph-sdk-javascript.
import "isomorphic-fetch";
import { Context, HttpRequest } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import { AppCredential, AppCredentialAuthConfig, createMicrosoftGraphClientWithCredential } from "@microsoft/teamsfx";
import config from "../config";

interface Response {
  status: number;
  body: { [key: string]: any };
}

type TeamsfxContext = { [key: string]: any };

const authConfig: AppCredentialAuthConfig = {
  authorityHost: config.authorityHost,
  clientId: config.clientId,
  tenantId: config.tenantId,
  clientSecret: config.clientSecret,
}

/**
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @param {teamsfxContext} TeamsfxContext - The context generated by teamsfx binding.
 */
export default async function run(
  context: Context,
  req: HttpRequest,
  teamsfxContext: TeamsfxContext
): Promise<Response> {
  context.log("HTTP trigger function processed a request.");

  // Initialize response.
  const res: Response = {
    status: 200,
    body: {},
  };

  let appCredential;
  try {
    appCredential = new AppCredential(authConfig);
  } catch (e) {
    context.log.error(e);
    return {
      status: 500,
      body: {
        error:
          "Failed to construct AppCredential with Application Identity. " +
          "Ensure your function app is configured with the right Azure AD App registration.",
      },
    };
  }

  // Query status of schema
  try {
    let graphClient: Client = createMicrosoftGraphClientWithCredential(appCredential);
    const location = req.query.location;
    const result = await graphClient.api(location).get();
    res.body.status = result.status;
  } catch (e) {
    context.log.error(e);
    return {
      status: e?.statusCode ?? 500,
      body: {
        error:
          "Failed to check connection schema status: " + e.toString(),
      },
    };
  }

  return res;
}
