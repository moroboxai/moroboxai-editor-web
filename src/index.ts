import * as monaco from 'monaco-editor';

export interface IEditorOptions {
    element?: Element | Element[] | HTMLCollectionOf<Element>;
    language?: string;
    value?: string;
    width?: string;
    height?: string;
}

export interface IEditor {
    /**
     * Remove the editor from document.
     */
    remove(): void;
}

function createElement(tagName: string, className?: string): HTMLElement {
    const el = document.createElement(tagName);
    if (className !== undefined) {
        el.classList.add(className);
    }
    return el;
}

const STYLES = {
    'editor': {
        'background-color': '#1e1e1e',
        'overflow': 'hidden'
    },
    'body': {
        'padding': '0.5em',
        'padding-top': '2em',
        'padding-bottom': '1em'
    },
    'toolbar': {
        'position': 'relative',
        'flex-grow': '1',
        'top': '-1em',
        'padding-left': '1em',
        'padding-right': '1em',
        'display': 'flex',
        'flex-direction': 'row'
    },
    'language': {
        'font-weight': 'bold',
        'color': '#4e6c8b',
        'flex-grow': '1',
        'text-align': 'right'
    }
}

class Editor implements IEditor {
    private _options: IEditorOptions;
    private _ui: {
        element?: HTMLElement;
        base?: HTMLDivElement;
        toolbar?: HTMLDivElement;
        runButton?: HTMLInputElement;
        wrapper?: HTMLDivElement;
        editor?: monaco.editor.IStandaloneCodeEditor;
    } = {};

    constructor(element: Element, options: IEditorOptions) {
        this._options = options;
        
        if (isHTMLElement(element)) {
            this._ui.element = element as HTMLElement;
            this._options = {...options};

            this._attach();
        }
    }

    private _attach() {
        if (this._ui.element === undefined) {
            return;
        }

        {
            const div = createElement('div', 'moroboxai-editor') as HTMLDivElement;
            Object.assign(div.style, STYLES['editor']);
            if (this._options.width !== undefined) {
                div.style.width = this._options.width;
            }
            if (this._options.height !== undefined) {
                div.style.height = this._options.height;
            }
            this._ui.base = div;
            this._ui.element.appendChild(div);
        }

        {
            const body = createElement('div', 'moroboxai-body') as HTMLDivElement;
            Object.assign(body.style, STYLES['body']);
            this._ui.base.appendChild(body);

            {
                const div = createElement('div', 'moroboxai-toolbar') as HTMLDivElement;
                Object.assign(div.style, STYLES['toolbar']);
                this._ui.toolbar = div;
                body.appendChild(div);
            }

            {
                const div = createElement('div') as HTMLDivElement;
                div.style.width = '100%';
                div.style.height = '100%';
                this._ui.wrapper = div;
                body.appendChild(div);
            }
        }

        {
            const input = createElement('input') as HTMLInputElement;
            input.type = 'button';
            input.value = 'Run';
            this._ui.runButton = input;
            this._ui.toolbar.appendChild(input);
        }

        {
            const span = createElement('span', 'moroboxai-language') as HTMLSpanElement;
            Object.assign(span.style, STYLES['language']);
            span.textContent = 'Javascript';
            this._ui.toolbar.appendChild(span);
        }

        {
            const editor = monaco.editor.create(this._ui.wrapper, {
                value: this._options.value,
                theme: 'vs-dark',
                language: this._options.language,
                minimap: {enabled: false}
            });
            
            let div = editor.getDomNode()!;
            div.style.width = '100%';
            div.style.height = '100%';

            div = div.firstElementChild as HTMLElement;
            div.style.width = '100%';
            div.style.height = '100%';

            this._ui.editor = editor;
        }
    }

    remove() {
        if (this._ui.editor !== undefined) {
            this._ui.editor.dispose();
            this._ui.editor = undefined;
        }

        if (this._ui.base !== undefined) {
            this._ui.base.remove();
            this._ui.base = undefined;
        }
    }
}

/**
 * Get default configured editor options.
 * @returns {IEditorOptions} Default options
 */
export function defaultOptions(): IEditorOptions {
    return {
        language: 'javascript'
    };
}

function isHTMLElement(_: Element | HTMLElement): _ is HTMLElement {
    return "dataset" in _;
}

function isElementArray(_: IEditorOptions | Element | Element[] | HTMLCollectionOf<Element>): _ is Element[] | HTMLCollectionOf<Element> {
    return "length" in _;
}

function isEditorOptions(_?: | IEditorOptions | Element | Element[] | HTMLCollectionOf<Element>): _ is IEditorOptions {
    return _ !== undefined && !isElementArray(_) && !("className" in _);
}

function createEditor(element: Element, options: IEditorOptions): IEditor {
    return new Editor(element, options);
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
    let _elements: undefined | Element | Element[] | HTMLCollectionOf<Element> = undefined;
    let _options: IEditorOptions = defaultOptions();

    if (isEditorOptions(element)) {
        options = element;
    } else {
        _elements = element;
    }

    if (options !== undefined) {
        _options = {..._options, ...options};
    }

    if (_elements == undefined) {
        if (_options.element !== undefined) {
            _elements = _options.element;
        } else {
            _elements = document.getElementsByClassName("moroboxai-editor");
        }
    }

    if (!isElementArray(_elements)) {
        return createEditor(_elements, _options);
    }

    return Array.prototype.map.call(_elements, _ => createEditor(_, _options)) as IEditor[];
}