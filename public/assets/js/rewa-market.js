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

    document.querySelectorAll('.market-header input[name="keyword"]').forEach(function (input) {
        if (!input.labels || !input.labels.length) input.setAttribute('aria-label', input.getAttribute('placeholder') || 'Search');
    });
})();
