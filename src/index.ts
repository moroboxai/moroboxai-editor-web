import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import {IEditor, IEditorOptions, IEditorFactoryOptions, IEditorInstance, init as _init} from 'moroboxai-editor-sdk';

export { IEditor, IEditorOptions, defaultOptions } from 'moroboxai-editor-sdk';

function factory(options: IEditorFactoryOptions): IEditorInstance {
    const editor = ace.edit(options.element);
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');

    return new EditorInstance(editor);
}

class EditorInstance implements IEditorInstance {
    private _instance: ace.Editor;

    constructor(instance: ace.Editor) {
        this._instance = instance;
    }

    set value(text: string) {
        this._instance.setValue(text, -1);
    }

    get value(): string {
        return this._instance.getValue();
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