import * as vscode from "vscode";

export function registerCommands(context: vscode.ExtensionContext) {
  const commands = {
    "leptos.configureTailwindCSSExperimentalClassRegex": configureTailwindCSSExperimentalClassRegex,
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

export const UPDATED_MESSAGE = "`tailwindCSS.experimental.classRegex` has been updated";
export const ALREADY_UPDATED_MESSAGE = "`tailwindCSS.experimental.classRegex` is already updated";

/**
 * Configure Tailwind CSS experimental class regexes in _.vscode/settings.json_.
 */
export function configureTailwindCSSExperimentalClassRegex(showInformationMessage = true): boolean {
  const config = vscode.workspace.getConfiguration('tailwindCSS', vscode.workspace.workspaceFolders![0]);
  const classRegex = config.get<any>('experimental.classRegex', []);

  const newClassRegex = globalThis.structuredClone(classRegex);
  let edited = false;
  for (const regex of EXPECTED_CLASS_REGEX) {
    if (typeof regex === 'string') {
      if (!newClassRegex.includes(regex)) {
        newClassRegex.push(regex);
        edited = true;
      }
    } else if (Array.isArray(regex)) {
      if (!newClassRegex.some((r: any) => Array.isArray(r) && r[0] === regex[0] && r[1] === regex[1])) {
        newClassRegex.push(regex);
        edited = true;
      }
    }
  }

  if (edited) {
    config.update('experimental.classRegex', newClassRegex, vscode.ConfigurationTarget.Workspace);
    if (showInformationMessage) {
      vscode.window.showInformationMessage(
        UPDATED_MESSAGE,
      );
    }
  } else if (showInformationMessage) {
    vscode.window.showInformationMessage(
      ALREADY_UPDATED_MESSAGE,
    );
  }
  return edited;
}
