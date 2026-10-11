/* Presentation helpers only. Routes, permissions, forms and AIZ plugins remain native. */
(function () {
    'use strict';
    if (!document.body.classList.contains('rewa-admin')) return;
    var body = document.body;
    var sidebar = document.getElementById('admin-sidebar');
    var toggle = document.querySelector('[data-admin-sidebar-toggle]');
    var search = document.getElementById('menu-search');
    var toolbar = document.querySelector('.rewa-admin-topbar');
    var mobile = window.matchMedia('(max-width: 1199.98px)');
    var previousFocus = null;

    function sidebarIsOpen() {
        return body.classList.contains('side-menu-open') ||
            (!mobile.matches && !body.classList.contains('side-menu-closed'));
    }
    function syncSidebar() {
        var open = sidebarIsOpen();
        if (toggle) toggle.setAttribute('aria-expanded', String(open));
        if (sidebar) {
            if (!open && sidebar.contains(document.activeElement) && toggle) toggle.focus();
            sidebar.inert = !open;
            sidebar.setAttribute('aria-hidden', String(!open));
        }
    }
    function closeSidebar() {
        body.classList.remove('side-menu-open');
        body.classList.add('side-menu-closed');
        syncSidebar();
        if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
        else if (toggle) toggle.focus();
        previousFocus = null;
    }
    function openSearch() {
        if (!search) return;
        previousFocus = document.activeElement;
        body.classList.remove('side-menu-closed');
        body.classList.add('side-menu-open');
        syncSidebar();
        search.focus();
        search.select();
    }
    function measureToolbar() {
        if (toolbar) body.style.setProperty('--rewa-toolbar-height', Math.ceil(toolbar.getBoundingClientRect().height) + 'px');
    }

    document.querySelectorAll('[data-admin-search]').forEach(function (button) {
        button.addEventListener('click', openSearch);
    });
    document.querySelectorAll('[data-admin-sidebar-close]').forEach(function (button) {
        button.addEventListener('click', closeSidebar);
    });
    if (toggle) {
        toggle.addEventListener('click', function () {
            // AIZ handles this click on the parent. Observe its result after bubbling.
            previousFocus = toggle;
            window.requestAnimationFrame(function () {
                syncSidebar();
                if (mobile.matches && sidebarIsOpen() && search) search.focus();
            });
        });
    }
    var overlay = document.querySelector('.aiz-sidebar-overlay');
    if (overlay) overlay.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            openSearch();
        }
        if (event.key === 'Escape' && mobile.matches && sidebarIsOpen()) {
            event.preventDefault();
            // The navigation owns this Escape, before shared storefront key handlers.
            event.stopImmediatePropagation();
            closeSidebar();
        }
        if (event.key === 'Tab' && mobile.matches && sidebar && sidebarIsOpen()) {
            var focusable = Array.from(sidebar.querySelectorAll('a[href], button, input, [tabindex="0"]')).filter(function (item) {
                return !item.disabled && item.getClientRects().length && getComputedStyle(item).visibility !== 'hidden';
            });
            var first = focusable[0], last = focusable[focusable.length - 1];
            if (first && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (last && !event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    }, true);
    mobile.addEventListener('change', function () {
        // A fresh desktop/phone state keeps a hidden mobile menu from trapping focus.
        body.classList.remove('side-menu-open', 'side-menu-closed');
        if (mobile.matches) body.classList.add('side-menu-closed');
        syncSidebar();
        measureToolbar();
    });
    new MutationObserver(syncSidebar).observe(body, { attributes: true, attributeFilter: ['class'] });
    if (window.ResizeObserver && toolbar) new ResizeObserver(measureToolbar).observe(toolbar);
    else window.addEventListener('resize', measureToolbar);
    var page = document.getElementById('admin-content');
    if (page && !page.querySelector('.rewa-page-intro')) {
        var heading = page.querySelector('h1, h2, .aiz-titlebar .title');
        if (heading && !heading.closest('.card, .modal')) heading.classList.add('rewa-page-heading');
    }
    // Long, existing table regions can be scrolled with a keyboard as well as touch.
    document.querySelectorAll('.rewa-admin-page .table-responsive').forEach(function (region) {
        if (!region.hasAttribute('tabindex')) region.setAttribute('tabindex', '0');
    });
    syncSidebar();
    measureToolbar();
}());
