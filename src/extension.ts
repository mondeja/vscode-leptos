import * as vscode from 'vscode';

import { registerCommands as registerTailwindCSSExperimentalClassRegexCommands } from './tailwindCSSExperimentalClassRegex';
import { registerCommands as registerConfigureWorkspaceCommands } from './configureWorkspace';
import { registerCommands as registerConfigureRecommendedExtensionsCommands } from './recommendedExtensions';
import { registerCommands as registerConfigureRustAnalyzerFormattingCommands } from './rustAnalyzerFormatting';

export function activate(context: vscode.ExtensionContext) {
	registerConfigureWorkspaceCommands(context);
	registerConfigureRecommendedExtensionsCommands(context);
	registerTailwindCSSExperimentalClassRegexCommands(context);
	registerConfigureRustAnalyzerFormattingCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
