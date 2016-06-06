<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Vimeo Channel Feed</title>
        <link href="https://f.vimeocdn.com/images_v6/favicon.ico" rel="Shortcut Icon" type="image/x-icon">
    </head>
    <body>
        <div id="app"></div>
        {%- for bundleLocation in bundles %}
        <script src="{{ bundleLocation }}"></script>
        {%- endfor %}
    </body>
</html>
