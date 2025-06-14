import * as vscode from "vscode";

export function registerCommands(context: vscode.ExtensionContext) {
    const commands = {
        "leptos.configureRustAnalyzerFormatting": configureRustAnalyzerFormatting,
    };
    for (const [command, callback] of Object.entries(commands)) {
        const disposable = vscode.commands.registerCommand(command, callback);
        context.subscriptions.push(disposable);
    }
}

const EXPECTED_RUST_ANALYZER_SETTING = [
    "leptosfmt",
    "--stdin",
    // Executes rustfmt after leptosfmt, but STDERR is not captured.
    "--rustfmt",
    // Set to edition 2024 to ensure compatibility with the latest Rust features
    //
    // If not set, it will fail silently if your file imports a file that uses
    // new features like asynchronous functions.
    "--rustfmt-args=--edition=2024",
];
const EXPECTED_RUST_EDITOR_SETTING = 'rust-lang.rust-analyzer';

export const RUST_ANALYZER_SETTING_UPDATED_MESSAGE = "`rust-analyzer.rustfmt.overrideCommand` has been updated";
export const RUST_ANALYZER_SETTING_ALREADY_UPDATED_MESSAGE = "`rust-analyzer.rustfmt.overrideCommand` is already updated";
export const RUST_EDITOR_SETTING_UPDATED_MESSAGE = "`[rust].editor.defaultFormatter` has been updated";
export const RUST_EDITOR_SETTING_ALREADY_UPDATED_MESSAGE = "`[rust].editor.defaultFormatter` is already updated";

/**
 * Configure formatting with Rust Analyzer and leptosfmt.
 */
export function configureRustAnalyzerFormatting(showInformationMessage = true): boolean {
    let edited = false;

    const rustConfig = vscode.workspace.getConfiguration(undefined, vscode.workspace.workspaceFolders![0]);
    const rustSection = rustConfig.get<{ [key: string]: any }>('[' + 'rust' + ']') || {};
    if (rustSection['editor.defaultFormatter'] !== EXPECTED_RUST_EDITOR_SETTING) {
        rustSection['editor.defaultFormatter'] = EXPECTED_RUST_EDITOR_SETTING;
        rustConfig.update(
            '[rust]',
            rustSection,
            vscode.ConfigurationTarget.Workspace
        );
        if (showInformationMessage) {
            vscode.window.showInformationMessage(RUST_EDITOR_SETTING_UPDATED_MESSAGE);
        }
        edited = true;
    } else if (showInformationMessage) {
        vscode.window.showInformationMessage(RUST_EDITOR_SETTING_ALREADY_UPDATED_MESSAGE);
    }

    const rustAnalyzerConfig = vscode.workspace.getConfiguration('rust-analyzer', vscode.workspace.workspaceFolders![0]);
    const rustfmtOverrideCommand = rustAnalyzerConfig.get<string[]>('rustfmt.overrideCommand', ['']);
    if (JSON.stringify(rustfmtOverrideCommand) !== JSON.stringify(EXPECTED_RUST_ANALYZER_SETTING)) {
        rustAnalyzerConfig.update('rustfmt.overrideCommand', EXPECTED_RUST_ANALYZER_SETTING, vscode.ConfigurationTarget.Workspace);
        edited = true;
        if (showInformationMessage) {
            vscode.window.showInformationMessage(RUST_ANALYZER_SETTING_UPDATED_MESSAGE);
        }
    } else if (showInformationMessage) {
        vscode.window.showInformationMessage(RUST_ANALYZER_SETTING_ALREADY_UPDATED_MESSAGE);
    }
    return edited;
}
