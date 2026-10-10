/* Rewa Market: progressive enhancements; existing commerce scripts own all actions. */
(function () {
    'use strict';
    if (!document.body.classList.contains('rewa-market')) return;

    function labelControls(root) {
        root.querySelectorAll('button, a[onclick]').forEach(function (control) {
            if (!control.textContent.trim() && !control.hasAttribute('aria-label')) {
                var label = control.getAttribute('title') || control.getAttribute('data-title');
                if (label) control.setAttribute('aria-label', label);
            }
        });
    }
    labelControls(document);
    // AJAX product grids receive the same accessibility treatment as initial cards.
    var grid = document.getElementById('section_newest');
    if (grid) new MutationObserver(function () { labelControls(grid); }).observe(grid, { childList: true, subtree: true });

    document.querySelectorAll('.stikcy-header-visibility input[name="keyword"]').forEach(function (input) {
        if (!input.labels || !input.labels.length) input.setAttribute('aria-label', input.getAttribute('placeholder') || 'Search');
    });

    var headers = Array.from(document.querySelectorAll('.stikcy-header-visibility'));
    var detail = document.querySelector('.market-product-detail');
    var gallery = detail && detail.querySelector('.product-slider-wrapper');
    var mainSlider = gallery && gallery.querySelector('.main-slider');
    var tabHeader = detail && detail.querySelector('.nav-tab-header');
    var tabList = detail && detail.querySelector('#tabLinks');
    var underline = tabList && tabList.querySelector('.tab-underline');
    var links = tabList ? Array.from(tabList.querySelectorAll('a[href^="#"]')) : [];
    var sections = links.map(function (link) {
        return document.getElementById(link.hash.slice(1));
    });
    var activeLink = null;
    var scrollOffset = 24;
    var frame = null;

    function motion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    }

    function setPixels(element, name, value) {
        var pixels = Math.round(value) + 'px';
        if (element.style.getPropertyValue(name) !== pixels) element.style.setProperty(name, pixels);
    }

    function measureLayout() {
        var stickyOffset = 0;
        headers.forEach(function (header) {
            var style = window.getComputedStyle(header);
            if ((style.position === 'sticky' || style.position === 'fixed') && header.getClientRects().length) {
                stickyOffset = Math.max(stickyOffset, header.getBoundingClientRect().height + (parseFloat(style.top) || 0));
            }
        });
        setPixels(document.body, '--market-sticky-offset', stickyOffset);
        scrollOffset = stickyOffset + (tabHeader ? tabHeader.getBoundingClientRect().height : 0) + 20;
        setPixels(document.body, '--market-scroll-offset', scrollOffset);

        if (gallery && mainSlider) {
            var desktop = window.matchMedia('(min-width: 992px)').matches;
            var availableHeight = window.innerHeight - stickyOffset - 40;
            var height = Math.max(280, Math.min(mainSlider.clientWidth || 560, 560, desktop ? availableHeight : 560));
            setPixels(detail, '--market-gallery-height', height);
            // A short viewport must still allow the whole gallery to scroll into view.
            gallery.classList.toggle('market-gallery-static', desktop && gallery.getBoundingClientRect().height > availableHeight);
        }
        if (activeLink) positionUnderline(activeLink);
    }

    function positionUnderline(link) {
        if (!underline) return;
        var rect = link.getBoundingClientRect();
        var parent = tabList.getBoundingClientRect();
        underline.style.width = rect.width + 'px';
        underline.style.left = (rect.left - parent.left) + 'px';
        underline.style.right = 'auto';
    }

    function activate(link, reveal) {
        if (!link) return;
        if (activeLink !== link) {
            links.forEach(function (item) {
                item.classList.toggle('active', item === link);
                if (item === link) item.setAttribute('aria-current', 'location');
                else item.removeAttribute('aria-current');
            });
            activeLink = link;
            positionUnderline(link);
            var rect = tabHeader && tabHeader.getBoundingClientRect();
            if (reveal && rect && rect.top < window.innerHeight && rect.bottom > 0) {
                var wrapper = tabList.parentElement;
                var bounds = wrapper.getBoundingClientRect();
                var linkBounds = link.getBoundingClientRect();
                var delta = linkBounds.left < bounds.left ? linkBounds.left - bounds.left
                    : linkBounds.right > bounds.right ? linkBounds.right - bounds.right : 0;
                if (delta) wrapper.scrollTo({ left: wrapper.scrollLeft + delta, behavior: motion() });
            }
        }
    }

    function updateActiveSection() {
        if (!links.length) return;
        var current = links[0];
        sections.forEach(function (section, index) {
            if (section && section.getBoundingClientRect().top <= scrollOffset + 8) current = links[index];
        });
        activate(current, true);
    }

    links.forEach(function (link, index) {
        link.addEventListener('click', function (event) {
            var target = sections[index];
            if (!target) return;
            event.preventDefault();
            measureLayout();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - scrollOffset, behavior: motion() });
            activate(link, false);
        });
    });

    function scheduleLayout() {
        if (frame !== null) return;
        frame = window.requestAnimationFrame(function () {
            frame = null;
            measureLayout();
            updateActiveSection();
        });
    }

    measureLayout();
    activate(links[0], false);
    window.addEventListener('resize', scheduleLayout, { passive: true });
    window.addEventListener('load', scheduleLayout, { once: true });
    if (links.length) {
        var scrollFrame = null;
        window.addEventListener('scroll', function () {
            if (scrollFrame !== null) return;
            scrollFrame = window.requestAnimationFrame(function () {
                scrollFrame = null;
                updateActiveSection();
            });
        }, { passive: true });
    }
    if ('ResizeObserver' in window) {
        var observer = new ResizeObserver(scheduleLayout);
        headers.forEach(function (header) { observer.observe(header); });
        if (mainSlider) observer.observe(mainSlider);
        if (tabHeader) observer.observe(tabHeader);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleLayout);
})();
