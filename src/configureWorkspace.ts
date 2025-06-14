import * as vscode from "vscode";

import { configureRustAnalyzerFormatting } from "./rustAnalyzerFormatting";
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
  if (configureRustAnalyzerFormatting(false)) {
    edited = true;
  }

  vscode.window.showInformationMessage(edited ? UPDATED_MESSAGE : ALREADY_UPDATED_MESSAGE);
}
