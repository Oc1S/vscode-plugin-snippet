export function getWebviewContent(srcUrl: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script>
      console.log('test',window,window.$RefreshReg$,window.$RefreshSig$)
    </script>
    <script type="module">
      import RefreshRuntime from "localhost:5173/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>
  </head>
  <body>
  
    <div id="root"></div>
    <script type="module" src="${srcUrl}"></script>
  </body>
</html>
`
}
