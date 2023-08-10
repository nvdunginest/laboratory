// Import polyfills for fetch required by msgraph-sdk-javascript.
import "isomorphic-fetch";
import { Context, HttpRequest } from "@azure/functions";
import { Client, ResponseType } from "@microsoft/microsoft-graph-client";
import { AppCredential, AppCredentialAuthConfig, createMicrosoftGraphClientWithCredential } from "@microsoft/teamsfx";
import config from "../config";

interface Response {
  status: number;
  body: { [key: string]: any };
}

const authConfig: AppCredentialAuthConfig = {
  authorityHost: config.authorityHost,
  clientId: config.clientId,
  tenantId: config.tenantId,
  clientSecret: config.clientSecret,
}

type TeamsfxContext = { [key: string]: any };

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

  const connectionId = req.query.connectionId;

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

  // Register schema
  try {
    const graphClient: Client = createMicrosoftGraphClientWithCredential(appCredential);
    const result = await graphClient.api(`/external/connections/${connectionId}/schema`)
      .responseType(ResponseType.RAW)
      .post({
        "baseType": "microsoft.graph.externalItem",
        "properties": [
          {
            "name": "partNumber",
            "type": "int64",
            "isSearchable": false,
            "isRetrievable": true,
            "isQueryable": true,
            "labels": [],
            "aliases": []
          },
          {
            "name": "name",
            "type": "string",
            "isSearchable": true,
            "isRetrievable": true,
            "isQueryable": true,
            "labels": [],
            "aliases": []
          },
          {
            "name": "description",
            "type": "string",
            "isSearchable": true,
            "isRetrievable": true,
            "isQueryable": false,
            "labels": [],
            "aliases": []
          },
          {
            "name": "price",
            "type": "double",
            "isSearchable": false,
            "isRetrievable": true,
            "isQueryable": true,
            "labels": [],
            "aliases": []
          },
          {
            "name": "inventory",
            "type": "int64",
            "isSearchable": false,
            "isRetrievable": true,
            "isQueryable": true,
            "labels": [],
            "aliases": []
          },
          {
            "name": "appliances",
            "type": "stringCollection",
            "isSearchable": true,
            "isRetrievable": true,
            "isQueryable": true,
            "labels": [],
            "aliases": []
          },
        ]
      });
    res.body.location = result.headers.get('Location');
  } catch (e) {
    context.log.error(e);
    return {
      status: e?.statusCode ?? 500,
      body: {
        error:
          "Failed to register a schema for connection: " + e.toString(),
      },
    };
  }

  return res;
}