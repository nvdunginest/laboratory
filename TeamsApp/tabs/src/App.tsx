import React from "react";
import { app } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Requests from "./pages/requests";
import config from "./lib/config";
import { TeamsFxContext } from "./contexts/TeamsFxContext";
import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  tokens,
} from "@fluentui/react-components";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Create from "./pages/create";
import Receives from "./pages/receives";

export default function App() {
  const { loading, theme, themeString, teamsUserCredential } =
    useTeamsUserCredential({
      initiateLoginEndpoint: config.initiateLoginEndpoint!,
      clientId: config.clientId!,
    });

  React.useEffect(() => {
    loading &&
      app.initialize().then(() => {
        // Hide the loading indicator.
        app.notifySuccess();
      });
    console.log(app.getContext().then((c) => console.log("context", c)));
  }, [loading]);
  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {!loading && (
            <Routes>
              <Route path="/create" element={<Create />} />
              <Route path="/received" element={<Receives />} />
              <Route path="/requested" element={<Requests />} />
              <Route path="*" element={<Navigate to={"/requested"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}

/* 

https://teams.microsoft.com/l/entity/ab4c2678-4cc5-40c3-b497-1df12f38747f/requested/?tenantId=2b5438a9-6a60-437b-afb7-2cc6fd444d86&label=Request1&context={"subEntityId": "12"}

*/
