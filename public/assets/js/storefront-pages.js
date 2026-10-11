(function () {
    'use strict';
    var directory = document.querySelector('[data-brand-directory]');
    if (directory) {
        var input = directory.querySelector('[data-brand-search]');
        var alphabet = directory.querySelector('[data-brand-alphabet]');
        var tiles = Array.from(directory.querySelectorAll('[data-brand-name]'));
        var selectedLetter = 'all';
        var normalize = function (text) { return text.toLocaleLowerCase().trim(); };
        var filter = function () {
            var query = normalize(input.value);
            var visible = 0;
            tiles.forEach(function (tile) {
                var matches = normalize(tile.dataset.brandName).includes(query) && (selectedLetter === 'all' || tile.dataset.brandInitial === selectedLetter);
                tile.hidden = !matches;
                if (matches) visible++;
            });
            directory.querySelector('[data-brand-count]').textContent = visible;
            directory.querySelector('[data-brand-empty]').hidden = visible > 0;
        };
        alphabet.hidden = false;
        alphabet.addEventListener('click', function (event) {
            var button = event.target.closest('button[data-brand-letter]');
            if (!button || button.disabled) return;
            selectedLetter = button.dataset.brandLetter;
            alphabet.querySelectorAll('button').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
            filter();
        });
        input.addEventListener('input', filter);
        filter();
    }
    var body = document.querySelector('[data-article-body]');
    var contents = document.querySelector('[data-article-contents]');
    if (body && contents) {
        var headings = Array.from(body.querySelectorAll('h2, h3')).filter(function (heading) { return heading.textContent.trim(); });
        if (headings.length > 1) {
            headings.forEach(function (heading, index) {
                if (!heading.id) {
                    var id = 'rewa-story-section-' + (index + 1);
                    while (document.getElementById(id)) id += '-section';
                    heading.id = id;
                }
                var item = document.createElement('li');
                var link = document.createElement('a');
                link.href = '#' + encodeURIComponent(heading.id);
                link.textContent = heading.textContent;
                if (heading.tagName === 'H3') item.className = 'article-subheading';
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    var offset = 24;
                    document.querySelectorAll('.stikcy-header-visibility').forEach(function (header) {
                        if (['sticky', 'fixed'].includes(getComputedStyle(header).position)) offset = Math.max(offset, header.getBoundingClientRect().height + 24);
                    });
                    var top = heading.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({top: Math.max(0, top), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
                    heading.setAttribute('tabindex', '-1');
                    heading.focus({preventScroll: true});
                });
                item.appendChild(link);
                contents.appendChild(item);
            });
            contents.parentElement.hidden = false;
        }
    }
})();
