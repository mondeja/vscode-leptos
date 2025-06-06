import * as vscode from "vscode";
import * as fs from "node:fs";
import { parse } from 'jsonc-parser';

export function registerCommands(context: vscode.ExtensionContext) {
    const commands = {
        "leptos.configureRecommendedExtensions": configureRecommendedExtensions,
    };
    for (const [command, callback] of Object.entries(commands)) {
        const disposable = vscode.commands.registerCommand(command, callback);
        context.subscriptions.push(disposable);
    }
}

export const CREATED_MESSAGE = "The file .vscode/extensions.json has been created";
export const UPDATED_MESSAGE = "The file .vscode/extensions.json has been updated";
export const ALREADY_UPDATED_MESSAGE = "The recommended extensions are already configured in .vscode/extensions.json";

const RECOMMENDATIONS = [
    "bradlc.vscode-tailwindcss",
    "rust-lang.rust-analyzer",
    "mondeja.leptos",
    "mondeja.leptos-snippets",
    "lorenzopirro.rust-flash-snippets",
];

/**
 * Configure recommended extensions putting them in _.vscode/extensions.json_.
 */
export async function configureRecommendedExtensions(showInformationMessage = true, openFile = true): Promise<boolean> {
    // There is not an official API to configure recommended extensions, so we do it manually.
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return false;
    }

    const extensionsJsonUri = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders![0].uri,
        '.vscode',
        'extensions.json'
    );

    let edited = false;
    if (!fs.existsSync(extensionsJsonUri.fsPath)) {
        fs.writeFileSync(extensionsJsonUri.fsPath, JSON.stringify({ recommendations: RECOMMENDATIONS }, null, 2));
        edited = true;
        if (showInformationMessage) {
            vscode.window.showInformationMessage(CREATED_MESSAGE);
        }
    } else {
        const content = fs.readFileSync(extensionsJsonUri.fsPath, 'utf8');

        const parsedContent = parse(content);
        if (!parsedContent || !Array.isArray(parsedContent.recommendations)) {
            vscode.window.showErrorMessage("The .vscode/extensions.json file is not valid.");
            return false;
        }

        const existingRecommendations = new Set(parsedContent.recommendations);
        for (const recommendation of RECOMMENDATIONS) {
            if (!existingRecommendations.has(recommendation)) {
                existingRecommendations.add(recommendation);
                edited = true;
            }
        }
        if (edited) {
            // TODO: preserve comments?
            // TODO: preserve formatting?
            const newContent = JSON.stringify(
                { recommendations: Array.from(existingRecommendations) },
                null,
                2
            );
            fs.writeFileSync(extensionsJsonUri.fsPath, newContent);
            if (showInformationMessage) {
                vscode.window.showInformationMessage(UPDATED_MESSAGE);
            }
        }
        else if (showInformationMessage) {
            vscode.window.showInformationMessage(ALREADY_UPDATED_MESSAGE);
        }
    }
    if (edited && openFile) {
        await vscode.window.showTextDocument(extensionsJsonUri, { preview: false });
    }
    return edited;
}
