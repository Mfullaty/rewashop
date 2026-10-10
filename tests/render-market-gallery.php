<?php

// Render the production gallery with empty, variant-only, digital, and mixed media.
// Usage: php tests/render-market-gallery.php [path/to/vendor/autoload.php]
$root = dirname(__DIR__);
require $argv[1] ?? $root . '/vendor/autoload.php';
set_error_handler(function ($severity, $message, $file, $line) {
    if (error_reporting() & $severity) throw new ErrorException($message, 0, $severity, $file, $line);
    return false;
});

class GalleryFixtureEnvironment
{
    use Illuminate\View\Concerns\ManagesLoops;
}
class GalleryFixtureProduct
{
    public $photos = null;
    public $video_link = null;
    public $short_video = null;
    public $short_video_thumbnail = null;
    public $digital = 0;
    public $stocks;
    public function __construct() { $this->stocks = collect(); }
    public function getTranslation($key): string { return 'Headphones & accessories'; }
}
function translate($value) { return $value; }
function uploaded_asset($value) { return $value ? '/upload/' . $value : null; }
function static_asset($value) { return '/public/' . $value; }
function youtubeVideoId($value) { return 'fixture-video'; }
function convertToEmbedUrl($value) { return '/embed/fixture-video'; }

$compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), sys_get_temp_dir());
$template = $compiler->compileString(file_get_contents($root . '/resources/views/frontend/product_details/image_gallery.blade.php'));
$render = function ($detailedProduct) use ($template): string {
    $__env = new GalleryFixtureEnvironment();
    ob_start();
    try { eval('?>' . $template); return ob_get_contents(); }
    finally { ob_end_clean(); }
};
$assert = function ($valid, $message): void { if (!$valid) throw new RuntimeException($message); };

$empty = new GalleryFixtureProduct();
$html = $render($empty);
$assert(substr_count($html, 'assets/img/placeholder.jpg') >= 2, 'Empty galleries must show a main image and thumbnail placeholder.');
$assert(!str_contains($html, 'thumb-btn-down'), 'A single placeholder must not show thumbnail paging.');
$assert(str_contains($html, 'Headphones &amp; accessories'), 'Product image labels must be escaped.');

$variants = new GalleryFixtureProduct();
$variants->stocks = collect(array_map(fn ($index) => (object) ['image' => 'variant-' . $index, 'variant' => 'size-' . $index], range(1, 6)));
$html = $render($variants);
$assert(str_contains($html, 'thumb-btn-down') && str_contains($html, 'thumb-btn-up'), 'Variant-only galleries exceeding five visible images need thumbnail paging.');
$assert(substr_count($html, 'data-variation-image=') === 6 && str_contains($html, 'data-variation="size-6"'), 'Every variant thumbnail and main slide must retain its commerce hook.');

$digital = new GalleryFixtureProduct();
$digital->digital = 1;
$digital->stocks = $variants->stocks;
$html = $render($digital);
$assert(!str_contains($html, 'variant-1') && !str_contains($html, 'thumb-btn-down'), 'Digital products must not inherit stock-image paging.');

$mixed = new GalleryFixtureProduct();
$mixed->photos = 'photo-1,photo-2';
$mixed->short_video = 'clip-1';
$mixed->video_link = ['https://www.youtube.com/watch?v=fixture-video'];
$html = $render($mixed);
$assert(str_contains($html, '/upload/photo-1') && str_contains($html, '/upload/photo-2'), 'Configured photos must render.');
$assert(str_contains($html, '<video') && str_contains($html, '/upload/clip-1') && str_contains($html, '<iframe'), 'Uploaded and embedded video must remain available without a thumbnail.');
$mixed->short_video = 'clip-1,clip-2';
$mixed->short_video_thumbnail = 'video-cover';
$html = $render($mixed);
$assert(substr_count($html, '/upload/video-cover') === 4, 'Incomplete video thumbnail lists must reuse the first cover without missing-index errors.');
echo "Gallery render checks passed: placeholders, escaped labels, variant paging, digital products and mixed media.\n";
