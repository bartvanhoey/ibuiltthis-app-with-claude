# Errors

## Can't resolve 'tw-animate-css'

```bash
Error evaluating Node.js code
CssSyntaxError: tailwindcss: C:\Personal\MyGitHubRepos\ibuiltthis-app\app\globals.css:1:1: Can't resolve 'tw-animate-css' in 'C:\Personal\MyGitHubRepos\ibuiltthis-app\app'   
    [at Input.error (turbopack:///[project]/node_modules/postcss/lib/input.js:135:16)]
    [at Root.error (turbopack:///[project]/node_modules/postcss/lib/node.js:146:32)]
    [at Object.Once (C:\Personal\MyGitHubRepos\ibuiltthis-app\node_modules\@tailwindcss\postcss\dist\index.js:10:6911)]
    [at process.processTicksAndRejections (node:internal/process/task_queues:105:5)]
    [at async LazyResult.runAsync (turbopack:///[project]/node_modules/postcss/lib/lazy-result.js:293:11)]
    [at async transform (turbopack:///[turbopack-node]/transforms/postcss.ts:70:34)]
```

=> This error occurs because the `tw-animate-css` package is not installed in your project. To resolve this issue, you need to install the package using npm or yarn.

```bash
npm install tw-animate-css
```
