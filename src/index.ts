import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import {Language, DEFAULT_LANGUAGE, IEditor, IEditorOptions, IEditorFactoryOptions, IEditorInstance, init as _init} from 'moroboxai-editor-sdk';

export {defaultOptions} from 'moroboxai-editor-sdk';
export type { IEditor, IEditorOptions } from 'moroboxai-editor-sdk';

/**
 * Version of the editor SDK.
 */
export { VERSION as EDITOR_SDK_VERSION } from "moroboxai-editor-sdk";

/**
 * Version of the editor.
 */
export const VERSION: string = "0.1.0-alpha.5";

function factory(options: IEditorFactoryOptions): IEditorInstance {
    const editor = ace.edit(options.element);
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');

    return new EditorInstance(editor, options.language);
}

class EditorInstance implements IEditorInstance {
    private _instance: ace.Editor;
    private _language: Language;

    constructor(instance: ace.Editor, language?: Language) {
        this._instance = instance;
        this._language = language || DEFAULT_LANGUAGE;
    }

    get language(): Language {
        return this._language;
    }

    set language(value: Language) {
        this._language = value;
    }

    get value(): string {
        return this._instance.getValue();
    }

    set value(text: string) {
        this._instance.setValue(text, -1);
    }

    remove() {
        this._instance.destroy();
    }
}

export function init() : IEditor | IEditor[];
export function init(options: IEditorOptions) : IEditor | IEditor[];
export function init(element: Element) : IEditor;
export function init(element: Element[] | HTMLCollectionOf<Element>) : IEditor[];
export function init(element: Element, options: IEditorOptions) : IEditor;
export function init(element: Element[] | HTMLCollectionOf<Element>, options: IEditorOptions) : IEditor[];
export function init(element?: IEditorOptions | Element | Element[] | HTMLCollectionOf<Element>, options?: IEditorOptions) : IEditor | IEditor[];

/**
 * Initialize editor on one or multiple HTML elements.
 * @param {HTMLElement} element Element to wrap
 * @param {IEditor} options Options for initializing the editor
 */
export function init(element?: IEditorOptions | Element | Element[] | HTMLCollectionOf<Element>, options?: IEditorOptions) : IEditor | IEditor[] {
    return _init(factory, element, options);
}