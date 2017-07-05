export function _createIndexHtml(schemaPageId:string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700,700i&amp;subset=cyrillic" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/platform-core/static/css/ag-grid.css">
    <link rel="stylesheet" type="text/css" href="/platform-core/static/css/antd.css">
    <link rel="stylesheet" type="text/css" href="/platform-core/static/css/index.css">
    <title>buhta 2017</title>
</head>
<body>
<div id="content">
</div>
<script>document.schemaPageId="${schemaPageId}"</script>
<script src="/platform-core/static/js/jquery.min.js"></script>
<script src="/platform-core/static/js/react.js"></script>
<script src="/platform-core/static/js/react-dom.js"></script>
<script src="/platform-core/static/js/antd-with-locales.min.js"></script>
<script src="/platform-core/static/js/ag-grid.min.js"></script>
<script src="/platform-core/static/app_bundle.js"></script>
</body>
</html>`;

}