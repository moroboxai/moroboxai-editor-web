# moroboxai-editor-web

[![NPM version](https://img.shields.io/npm/v/moroboxai-editor-web.svg)](https://www.npmjs.com/package/moroboxai-editor-web)
![Node.js CI](https://github.com/moroboxai/moroboxai-editor-web/workflows/Node.js%20CI/badge.svg)
[![gitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/moroboxai/moroboxai-editor-web/blob/master/LICENSE)[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/moroboxai/moroboxai-editor-web.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/moroboxai/moroboxai-editor-web/context:javascript)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/moroboxai/moroboxai-editor-web.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/moroboxai/moroboxai-editor-web/alerts)

Embeddable code editor for coding AIs for [MoroboxAI](https://github.com/moroboxai) on the web.

## Install

Using npm:

```bash
npm install moroboxai-editor-web --save
```

Or:

```bash
git clone https://github.com/moroboxai/moroboxai-editor-web.git
cd moroboxai-editor-web
npm i
npm run build
```

## Usage

Create a `sample.html` file in the `moroboxai-editor-web` folder:

```html
<html>
 <div id="editor"></div> 
  
 <script type="text/javascript" src="./lib/umd/moroboxai-editor-web.js"></script>
 <script type="text/javascript">
  // Initialize the editor on our div
  const editor = MoroboxAIEditor.init({
   element: document.getElementById("editor"),
   value: 'function foo() {\n  console.log("foo");\n}\n',
   width: "500px",
   height: "400px"
  });
 </script>
</html>
```

Open `sample.html` in your browser and check the console output.

## Arguments

| Name   |      Type      |  Default |  Description |
|:----------|:-------------|:------|:------|
| element | Element || DOM element to attach the editor to |
| language | string | javascript | Selected language |
| value | string || Initial content of the editor |
| width | string || Width of the `div` element |
| height | string || Height of the `div` element |
| onLoad | func | noop | **Signature: function(value: string) => void** <br/> Function called when the Load button is clicked |
| onUnload | func | noop | **Signature: function() => void** <br/> Function called when the Unload button is clicked |

## License

This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
