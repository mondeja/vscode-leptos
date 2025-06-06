import * as vscode from "vscode";

import { configureRecommendedExtensions } from "./recommendedExtensions";
import { configureTailwindCSSExperimentalClassRegex } from "./tailwindCSSExperimentalClassRegex";

export function registerCommands(context: vscode.ExtensionContext) {
  const commands = {
    "leptos.configureWorkspace": configureWorkspace,
  };
  for (const [command, callback] of Object.entries(commands)) {
    const disposable = vscode.commands.registerCommand(command, callback);
    context.subscriptions.push(disposable);
  }
}

const EXPECTED_CLASS_REGEX: Array<string | [string, string]> = [
  // `format!("px-1")` and `concat!("px-1")`
  ["(?:format|concat)!\\(([^)]*)\\)", "(?:\")([^\"]*)(?:\")"],
  // `attr:class="px-1"`
  "(?:attr:class=\")([^\"]*)(?:\")",
  // `class:px-1`
  "(?:class:)([^=\\s]*)(?:=)",
  // `my_foo_class = "px-1"`
  "(?:\\w_class\\s=\\s\")([^\"]*)",
];

export const UPDATED_MESSAGE = "All the configurations have been updated";
export const ALREADY_UPDATED_MESSAGE = "All the configurations are already updated";

/**
 * Run all configurations at once.
 */
export async function configureWorkspace() {
  let edited = false;
  
  if (await configureRecommendedExtensions(false, false)) {
    edited = true;
  }
  if (configureTailwindCSSExperimentalClassRegex(false)) {
    edited = true;
  }

  vscode.window.showInformationMessage(edited ? UPDATED_MESSAGE : ALREADY_UPDATED_MESSAGE);
}
