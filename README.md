# moroboxai-editor-web

[![NPM version](https://img.shields.io/npm/v/moroboxai-editor-web.svg)](https://www.npmjs.com/package/moroboxai-editor-web)
![Node.js CI](https://github.com/moroboxai/moroboxai-editor-web/workflows/Node.js%20CI/badge.svg)
[![gitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/moroboxai/moroboxai-editor-web/blob/master/LICENSE)

Editor for coding AIs for MoroboxAI on the web.

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

You can also import the lib as an ECMAScript module:

```html
<html>
 <div id="editor"></div> 
 
 <script type="module" src="./lib/es/moroboxai-editor-web.js"></script>
 <script type="module">
  import * as MoroboxAIEditor from "./lib/es/moroboxai-editor-web.js";
  
  ...
 </script>
</html>
```

Open `sample.html` in your browser and check the console output.

## License

This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
