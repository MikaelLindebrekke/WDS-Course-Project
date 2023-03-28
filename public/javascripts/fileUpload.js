const rootStyles = window.getComputedStyle(document.documentElement);

if (rootStyles.getPropertyValue('--book-cover-width-large') != null &&
    rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready();
} else {
    document.getElementById('main-css').addEventListener('load', ready);
}

function ready() {
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'));
    const aspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'));
    const coverHeigth = coverWidth / aspectRatio
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    );

    FilePond.setOptions({
        stylePanelAspectRatio: 1 / aspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeigth
    })

    FilePond.parse(document.body);
}