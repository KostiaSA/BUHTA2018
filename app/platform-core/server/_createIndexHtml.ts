import {serverState} from "./ServerState";
export function _createIndexHtml(schemaPageId: string): string {


    return `
<!DOCTYPE html>
<html>
<head>
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    ${serverState.externalStyles.map((link) => link).join("\n")}
    <title>buhta 2017</title>
</head>
<body>
<div id="content">
</div>
<script>document.schemaPageId="${schemaPageId}"</script>
${serverState.externalScripts.map((script) => script).join("\n")}
<script src="/platform-core/static/app_bundle.js"></script>
</body>
</html>`;

}