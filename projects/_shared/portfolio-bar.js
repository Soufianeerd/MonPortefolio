/* ============================================================
   Soufiane EL RHADI — Portfolio Bar
   Self-contained bar injected at the bottom of every sub-project.
   Auto-computes the back URL from the current pathname.
   Just include with:
     <script src="<relative>/_shared/portfolio-bar.js" defer></script>
   ============================================================ */
(function () {
    'use strict';

    if (window.__sefPortfolioBarInjected) return;
    window.__sefPortfolioBarInjected = true;

    // Ne pas afficher le bandeau si la page est chargée dans une iframe
    // (cas des builders Mariage / WeddingSuite, prévisualisations Kartell, etc.)
    try {
        if (window.self !== window.top) return;
    } catch (_) {
        // iframe cross-origin : on s'abstient pour ne pas polluer le rendu
        return;
    }

    function inject() {
        // ---- Compute back URL : everything up to /projects/ + /index.html
        var path = window.location.pathname;
        var marker = '/projects/';
        var idx = path.indexOf(marker);
        var backUrl;
        if (idx >= 0) {
            backUrl = path.slice(0, idx) + '/index.html';
        } else {
            // Fallback : try to go up one level
            backUrl = '../index.html';
        }

        // Avoid injecting on the landing page itself
        if (path.endsWith('/index.html') && idx < 0) return;

        // ---- Style (scoped via .sef-pf-bar prefix)
        var css = ''
            + '.sef-pf-bar{'
            +   'position:fixed;top:14px;left:14px;z-index:2147483646;'
            +   'display:inline-flex;align-items:center;gap:8px;'
            +   'padding:8px 14px 8px 12px;'
            +   'background:rgba(18,18,18,0.92);color:#fff;'
            +   'font-family:"Outfit",system-ui,-apple-system,sans-serif;'
            +   'font-weight:600;font-size:13px;letter-spacing:0.2px;'
            +   'text-decoration:none;border-radius:100px;'
            +   'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);'
            +   'box-shadow:0 6px 20px rgba(0,0,0,0.18);'
            +   'transition:transform .25s cubic-bezier(.23,1,.32,1),background .25s,color .25s;'
            +   'border:1px solid rgba(255,255,255,0.08);'
            + '}'
            + '.sef-pf-bar:hover{background:#d97757;transform:translateY(-2px) scale(1.03);}'
            + '.sef-pf-bar svg{width:14px;height:14px;flex-shrink:0;}'
            + '.sef-pf-bar .sef-pf-dot{width:6px;height:6px;border-radius:50%;background:#d97757;'
            +   'box-shadow:0 0 0 0 rgba(217,119,87,0.5);'
            +   'animation:sefPfPulse 2s infinite;flex-shrink:0;'
            + '}'
            + '.sef-pf-bar:hover .sef-pf-dot{background:#fff;animation:none;}'
            + '@keyframes sefPfPulse{'
            +   '0%{box-shadow:0 0 0 0 rgba(217,119,87,0.5);}'
            +   '70%{box-shadow:0 0 0 8px rgba(217,119,87,0);}'
            +   '100%{box-shadow:0 0 0 0 rgba(217,119,87,0);}'
            + '}'
            + '@media print{.sef-pf-bar{display:none !important;}}'
            + '@media (max-width:480px){.sef-pf-bar{font-size:12px;padding:7px 12px 7px 10px;}}'
            + '@media (prefers-reduced-motion:reduce){.sef-pf-bar,.sef-pf-bar:hover{transition:none;transform:none;}.sef-pf-dot{animation:none;}}';

        var styleTag = document.createElement('style');
        styleTag.setAttribute('data-sef-pf-bar', '');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);

        // ---- DOM
        var a = document.createElement('a');
        a.className = 'sef-pf-bar';
        a.href = backUrl;
        a.setAttribute('aria-label', 'Retour au portfolio de Soufiane EL RHADI');
        a.title = 'Retour au portfolio';

        var dot = document.createElement('span');
        dot.className = 'sef-pf-dot';
        a.appendChild(dot);

        // arrow icon
        var svgNS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        var path1 = document.createElementNS(svgNS, 'path');
        path1.setAttribute('d', 'M19 12H5');
        var path2 = document.createElementNS(svgNS, 'path');
        path2.setAttribute('d', 'M12 19l-7-7 7-7');
        svg.appendChild(path1);
        svg.appendChild(path2);
        a.appendChild(svg);

        var label = document.createElement('span');
        label.textContent = 'Portfolio';
        a.appendChild(label);

        document.body.appendChild(a);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
