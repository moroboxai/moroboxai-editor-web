import * as ace from "brace";
import "brace/mode/javascript";
import "brace/mode/lua";
import "brace/theme/monokai";

import * as MoroboxAIEditorSDK from "moroboxai-editor-sdk";

/**
 * Version of the editor SDK.
 */
export { VERSION as EDITOR_SDK_VERSION } from "moroboxai-editor-sdk";

/**
 * Version of the editor.
 */
export const VERSION: string = "__VERSION__";

export interface EditorOptions extends MoroboxAIEditorSDK.EditorOptions {
    // Extra options for ace
    aceOptions?: any;
}

class EditorInstance implements MoroboxAIEditorSDK.IEditorInstance {
    private _instance: ace.Editor;
    private _language: MoroboxAIEditorSDK.Language;

    constructor(instance: ace.Editor, language?: MoroboxAIEditorSDK.Language) {
        this._instance = instance;
        this._language = language || MoroboxAIEditorSDK.DEFAULT_LANGUAGE;
    }

    get language(): MoroboxAIEditorSDK.Language {
        return this._language;
    }

    set language(value: MoroboxAIEditorSDK.Language) {
        this._language = value;
        this._instance.getSession().setMode(`ace/mode/${value}`);
    }

    get value(): string {
        return this._instance.getValue();
    }

    set value(text: string) {
        this._instance.setValue(text, -1);
    }

    resize() {
        this._instance.resize();
    }

    remove() {
        this._instance.destroy();
    }
}

export function init():
    | MoroboxAIEditorSDK.IEditor
    | MoroboxAIEditorSDK.IEditor[];
export function init(
    options: EditorOptions
): MoroboxAIEditorSDK.IEditor | MoroboxAIEditorSDK.IEditor[];
export function init(element: Element): MoroboxAIEditorSDK.IEditor;
export function init(
    element: Element[] | HTMLCollectionOf<Element>
): MoroboxAIEditorSDK.IEditor[];
export function init(
    element: Element,
    options: EditorOptions
): MoroboxAIEditorSDK.IEditor;
export function init(
    element: Element[] | HTMLCollectionOf<Element>,
    options: EditorOptions
): MoroboxAIEditorSDK.IEditor[];
export function init(
    element?: EditorOptions | Element | Element[] | HTMLCollectionOf<Element>,
    options?: EditorOptions
): MoroboxAIEditorSDK.IEditor | MoroboxAIEditorSDK.IEditor[];

/**
 * Initialize editor on one or multiple HTML elements.
 * @param {HTMLElement} element Element to wrap
 * @param {IEditor} options Options for initializing the editor
 */
export function init(
    element?: EditorOptions | Element | Element[] | HTMLCollectionOf<Element>,
    options?: EditorOptions
): MoroboxAIEditorSDK.IEditor | MoroboxAIEditorSDK.IEditor[] {
    return MoroboxAIEditorSDK.init(
        (
            factoryOptions: MoroboxAIEditorSDK.EditorFactoryOptions
        ): MoroboxAIEditorSDK.IEditorInstance => {
            const editor = ace.edit(factoryOptions.element);
            editor.getSession().setMode("ace/mode/javascript");
            editor.setTheme("ace/theme/monokai");
            editor.setOptions({
                fontFamily: "monospace",
                fontSize: "10pt",
                ...(options?.aceOptions ?? {})
            });

            return new EditorInstance(editor, factoryOptions.language);
        },
        element,
        options
    );
}
