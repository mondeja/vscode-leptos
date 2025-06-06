import * as vscode from 'vscode';

import { registerCommands as registerTailwindCSSExperimentalClassRegexCommands } from './tailwindCSSExperimentalClassRegex';
import { registerCommands as registerConfigureWorkspaceCommands } from './configureWorkspace';
import { registerCommands as registerConfigureRecommendedExtensionsCommands } from './recommendedExtensions';

export function activate(context: vscode.ExtensionContext) {
	console.log('mondeja.leptos is running');

	registerConfigureWorkspaceCommands(context);
	registerConfigureRecommendedExtensionsCommands(context);
	registerTailwindCSSExperimentalClassRegexCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
