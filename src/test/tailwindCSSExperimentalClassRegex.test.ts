import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { configureTailwindCSSExperimentalClassRegex, UPDATED_MESSAGE } from '../tailwindCSSExperimentalClassRegex';

suite('tailwindCSSExperimentalClassRegex', () => {
	test('configure when no tailwindCSS configuration', () => {
		const showWarningStub = sinon.stub(vscode.window, 'showInformationMessage');

		teardown(() => {
			showWarningStub.restore();
		});

		configureTailwindCSSExperimentalClassRegex();

		assert.ok(showWarningStub.calledOnce);
		assert.ok(showWarningStub.calledWith(UPDATED_MESSAGE));

		(vscode.workspace.getConfiguration as any).restore?.();
	});
});
