/* ============================================================
   WC Analytics 2026 — Dashboard interactif
   Données : XI titulaires des finales 1998 → 2022 + projection 2026
   ============================================================ */

(function () {
    'use strict';

    /* ============================================================
       DATASET
       Compositions officielles des finales de Coupe du Monde
       Format pitch coordinates : x/y in % (0..100), x=left-right, y=top-bottom (top = portière équipe)
       ============================================================ */
    const TOURNAMENTS = [
        {
            year: 1998,
            host: 'France',
            winner: 'France',
            flag: '🇫🇷',
            opponent: 'Brésil',
            score: '3-0',
            stadium: 'Stade de France, Saint-Denis',
            date: '12 juillet 1998',
            captain: 'Didier Deschamps',
            manager: 'Aimé Jacquet',
            formation: '4-3-2-1',
            lineup: [
                { num: 16, name: 'Fabien Barthez',    pos: 'GK', age: 27, club: 'Monaco',          x: 50, y: 90 },
                { num: 15, name: 'Lilian Thuram',     pos: 'DF', age: 26, club: 'Parme',           x: 75, y: 75 },
                { num: 18, name: 'Frank Lebœuf',      pos: 'DF', age: 30, club: 'Chelsea',         x: 60, y: 80 },
                { num: 8,  name: 'Marcel Desailly',   pos: 'DF', age: 29, club: 'Chelsea',         x: 40, y: 80 },
                { num: 3,  name: 'Bixente Lizarazu',  pos: 'DF', age: 28, club: 'Bayern Munich',   x: 25, y: 75 },
                { num: 7,  name: 'Didier Deschamps',  pos: 'MF', age: 29, club: 'Juventus',        x: 50, y: 60 },
                { num: 17, name: 'Emmanuel Petit',    pos: 'MF', age: 27, club: 'Arsenal',         x: 35, y: 55 },
                { num: 14, name: 'Christian Karembeu',pos: 'MF', age: 27, club: 'Real Madrid',     x: 65, y: 55 },
                { num: 10, name: 'Zinédine Zidane',   pos: 'MF', age: 26, club: 'Juventus',        x: 40, y: 35 },
                { num: 6,  name: 'Youri Djorkaeff',   pos: 'MF', age: 30, club: 'Inter Milan',     x: 60, y: 35 },
                { num: 9,  name: "Stéphane Guivarc'h",pos: 'FW', age: 27, club: 'Auxerre',         x: 50, y: 18 }
            ]
        },
        {
            year: 2002,
            host: 'Corée du Sud / Japon',
            winner: 'Brésil',
            flag: '🇧🇷',
            opponent: 'Allemagne',
            score: '2-0',
            stadium: 'International Stadium, Yokohama',
            date: '30 juin 2002',
            captain: 'Cafu',
            manager: 'Luiz Felipe Scolari',
            formation: '3-4-3',
            lineup: [
                { num: 1,  name: 'Marcos',            pos: 'GK', age: 28, club: 'Palmeiras',       x: 50, y: 90 },
                { num: 3,  name: 'Lúcio',             pos: 'DF', age: 24, club: 'Bayer Leverkusen',x: 50, y: 78 },
                { num: 4,  name: 'Roque Júnior',      pos: 'DF', age: 26, club: 'Milan',           x: 30, y: 78 },
                { num: 14, name: 'Edmílson',          pos: 'DF', age: 26, club: 'Lyon',            x: 70, y: 78 },
                { num: 2,  name: 'Cafu',              pos: 'MF', age: 32, club: 'Roma',            x: 85, y: 55 },
                { num: 6,  name: 'Roberto Carlos',    pos: 'MF', age: 29, club: 'Real Madrid',     x: 15, y: 55 },
                { num: 15, name: 'Kléberson',         pos: 'MF', age: 23, club: 'Atlético-PR',     x: 60, y: 50 },
                { num: 5,  name: 'Gilberto Silva',    pos: 'MF', age: 25, club: 'Atlético Mineiro',x: 40, y: 50 },
                { num: 11, name: 'Ronaldinho',        pos: 'FW', age: 22, club: 'PSG',             x: 30, y: 25 },
                { num: 10, name: 'Rivaldo',           pos: 'FW', age: 30, club: 'Barcelone',       x: 70, y: 25 },
                { num: 9,  name: 'Ronaldo',           pos: 'FW', age: 25, club: 'Inter Milan',     x: 50, y: 15 }
            ]
        },
        {
            year: 2006,
            host: 'Allemagne',
            winner: 'Italie',
            flag: '🇮🇹',
            opponent: 'France',
            score: '1-1 (5-3 t.a.b.)',
            stadium: 'Olympiastadion, Berlin',
            date: '9 juillet 2006',
            captain: 'Fabio Cannavaro',
            manager: 'Marcello Lippi',
            formation: '4-4-1-1',
            lineup: [
                { num: 1,  name: 'Gianluigi Buffon',  pos: 'GK', age: 28, club: 'Juventus',        x: 50, y: 90 },
                { num: 19, name: 'Gianluca Zambrotta',pos: 'DF', age: 29, club: 'Juventus',        x: 80, y: 75 },
                { num: 5,  name: 'Fabio Cannavaro',   pos: 'DF', age: 32, club: 'Juventus',        x: 60, y: 80 },
                { num: 23, name: 'Marco Materazzi',   pos: 'DF', age: 32, club: 'Inter Milan',     x: 40, y: 80 },
                { num: 3,  name: 'Fabio Grosso',      pos: 'DF', age: 28, club: 'Palerme',         x: 20, y: 75 },
                { num: 21, name: 'Andrea Pirlo',      pos: 'MF', age: 27, club: 'Milan',           x: 50, y: 55 },
                { num: 8,  name: 'Gennaro Gattuso',   pos: 'MF', age: 28, club: 'Milan',           x: 35, y: 55 },
                { num: 16, name: 'Mauro Camoranesi',  pos: 'MF', age: 29, club: 'Juventus',        x: 75, y: 50 },
                { num: 20, name: 'Simone Perrotta',   pos: 'MF', age: 28, club: 'Roma',            x: 25, y: 50 },
                { num: 10, name: 'Francesco Totti',   pos: 'MF', age: 29, club: 'Roma',            x: 50, y: 35 },
                { num: 9,  name: 'Luca Toni',         pos: 'FW', age: 29, club: 'Fiorentina',      x: 50, y: 18 }
            ]
        },
        {
            year: 2010,
            host: 'Afrique du Sud',
            winner: 'Espagne',
            flag: '🇪🇸',
            opponent: 'Pays-Bas',
            score: '1-0 (a.p.)',
            stadium: 'Soccer City, Johannesburg',
            date: '11 juillet 2010',
            captain: 'Iker Casillas',
            manager: 'Vicente del Bosque',
            formation: '4-2-3-1',
            lineup: [
                { num: 1,  name: 'Iker Casillas',     pos: 'GK', age: 29, club: 'Real Madrid',     x: 50, y: 90 },
                { num: 15, name: 'Sergio Ramos',      pos: 'DF', age: 24, club: 'Real Madrid',     x: 80, y: 75 },
                { num: 3,  name: 'Gerard Piqué',      pos: 'DF', age: 23, club: 'Barcelone',       x: 60, y: 80 },
                { num: 5,  name: 'Carles Puyol',      pos: 'DF', age: 32, club: 'Barcelone',       x: 40, y: 80 },
                { num: 11, name: 'Joan Capdevila',    pos: 'DF', age: 32, club: 'Villarreal',      x: 20, y: 75 },
                { num: 16, name: 'Sergio Busquets',   pos: 'MF', age: 22, club: 'Barcelone',       x: 40, y: 60 },
                { num: 14, name: 'Xabi Alonso',       pos: 'MF', age: 28, club: 'Real Madrid',     x: 60, y: 60 },
                { num: 8,  name: 'Xavi',              pos: 'MF', age: 30, club: 'Barcelone',       x: 50, y: 42 },
                { num: 6,  name: 'Andrés Iniesta',    pos: 'MF', age: 26, club: 'Barcelone',       x: 30, y: 35 },
                { num: 18, name: 'Pedro',             pos: 'MF', age: 23, club: 'Barcelone',       x: 70, y: 35 },
                { num: 7,  name: 'David Villa',       pos: 'FW', age: 28, club: 'Barcelone',       x: 50, y: 18 }
            ]
        },
        {
            year: 2014,
            host: 'Brésil',
            winner: 'Allemagne',
            flag: '🇩🇪',
            opponent: 'Argentine',
            score: '1-0 (a.p.)',
            stadium: 'Maracanã, Rio de Janeiro',
            date: '13 juillet 2014',
            captain: 'Philipp Lahm',
            manager: 'Joachim Löw',
            formation: '4-3-3',
            lineup: [
                { num: 1,  name: 'Manuel Neuer',      pos: 'GK', age: 28, club: 'Bayern Munich',   x: 50, y: 90 },
                { num: 16, name: 'Philipp Lahm',      pos: 'DF', age: 30, club: 'Bayern Munich',   x: 80, y: 75 },
                { num: 17, name: 'Jérôme Boateng',    pos: 'DF', age: 25, club: 'Bayern Munich',   x: 60, y: 80 },
                { num: 5,  name: 'Mats Hummels',      pos: 'DF', age: 25, club: 'Dortmund',        x: 40, y: 80 },
                { num: 4,  name: 'Benedikt Höwedes',  pos: 'DF', age: 26, club: 'Schalke 04',      x: 20, y: 75 },
                { num: 7,  name: 'Bastian Schweinsteiger', pos: 'MF', age: 29, club: 'Bayern Munich', x: 35, y: 55 },
                { num: 6,  name: 'Sami Khedira',      pos: 'MF', age: 27, club: 'Real Madrid',     x: 65, y: 55 },
                { num: 18, name: 'Toni Kroos',        pos: 'MF', age: 24, club: 'Bayern Munich',   x: 50, y: 45 },
                { num: 13, name: 'Thomas Müller',     pos: 'FW', age: 24, club: 'Bayern Munich',   x: 75, y: 25 },
                { num: 8,  name: 'Mesut Özil',        pos: 'FW', age: 25, club: 'Arsenal',         x: 25, y: 25 },
                { num: 11, name: 'Miroslav Klose',    pos: 'FW', age: 36, club: 'Lazio',           x: 50, y: 15 }
            ]
        },
        {
            year: 2018,
            host: 'Russie',
            winner: 'France',
            flag: '🇫🇷',
            opponent: 'Croatie',
            score: '4-2',
            stadium: 'Loujniki, Moscou',
            date: '15 juillet 2018',
            captain: 'Hugo Lloris',
            manager: 'Didier Deschamps',
            formation: '4-2-3-1',
            lineup: [
                { num: 1,  name: 'Hugo Lloris',       pos: 'GK', age: 31, club: 'Tottenham',       x: 50, y: 90 },
                { num: 2,  name: 'Benjamin Pavard',   pos: 'DF', age: 22, club: 'Stuttgart',       x: 80, y: 75 },
                { num: 4,  name: 'Raphaël Varane',    pos: 'DF', age: 25, club: 'Real Madrid',     x: 60, y: 80 },
                { num: 5,  name: 'Samuel Umtiti',     pos: 'DF', age: 24, club: 'Barcelone',       x: 40, y: 80 },
                { num: 21, name: 'Lucas Hernandez',   pos: 'DF', age: 22, club: 'Atlético Madrid', x: 20, y: 75 },
                { num: 13, name: "N'Golo Kanté",      pos: 'MF', age: 27, club: 'Chelsea',         x: 35, y: 60 },
                { num: 6,  name: 'Paul Pogba',        pos: 'MF', age: 25, club: 'Manchester Utd',  x: 65, y: 60 },
                { num: 14, name: 'Blaise Matuidi',    pos: 'MF', age: 31, club: 'Juventus',        x: 25, y: 40 },
                { num: 7,  name: 'Antoine Griezmann', pos: 'MF', age: 27, club: 'Atlético Madrid', x: 50, y: 38 },
                { num: 10, name: 'Kylian Mbappé',     pos: 'FW', age: 19, club: 'PSG',             x: 75, y: 35 },
                { num: 9,  name: 'Olivier Giroud',    pos: 'FW', age: 31, club: 'Chelsea',         x: 50, y: 18 }
            ]
        },
        {
            year: 2022,
            host: 'Qatar',
            winner: 'Argentine',
            flag: '🇦🇷',
            opponent: 'France',
            score: '3-3 (4-2 t.a.b.)',
            stadium: 'Lusail Stadium, Lusail',
            date: '18 décembre 2022',
            captain: 'Lionel Messi',
            manager: 'Lionel Scaloni',
            formation: '4-3-3',
            lineup: [
                { num: 23, name: 'Emiliano Martínez', pos: 'GK', age: 30, club: 'Aston Villa',     x: 50, y: 90 },
                { num: 26, name: 'Nahuel Molina',     pos: 'DF', age: 24, club: 'Atlético Madrid', x: 80, y: 75 },
                { num: 19, name: 'Nicolás Otamendi',  pos: 'DF', age: 34, club: 'Benfica',         x: 60, y: 80 },
                { num: 13, name: 'Cristian Romero',   pos: 'DF', age: 24, club: 'Tottenham',       x: 40, y: 80 },
                { num: 3,  name: 'Nicolás Tagliafico',pos: 'DF', age: 30, club: 'Lyon',            x: 20, y: 75 },
                { num: 7,  name: 'Rodrigo De Paul',   pos: 'MF', age: 28, club: 'Atlético Madrid', x: 65, y: 55 },
                { num: 24, name: 'Enzo Fernández',    pos: 'MF', age: 21, club: 'Benfica',         x: 50, y: 50 },
                { num: 20, name: 'Alexis Mac Allister',pos: 'MF',age: 23, club: 'Brighton',        x: 35, y: 55 },
                { num: 10, name: 'Lionel Messi',      pos: 'FW', age: 35, club: 'PSG',             x: 50, y: 30 },
                { num: 11, name: 'Ángel Di María',    pos: 'FW', age: 34, club: 'Juventus',        x: 25, y: 30 },
                { num: 9,  name: 'Julián Álvarez',    pos: 'FW', age: 22, club: 'Manchester City', x: 75, y: 25 }
            ]
        },
        {
            year: 2026,
            host: 'USA · Canada · Mexique',
            winner: '— À déterminer —',
            flag: '🇺🇸🇨🇦🇲🇽',
            opponent: 'TBD',
            score: 'TBD',
            stadium: 'MetLife Stadium, New Jersey',
            date: '19 juillet 2026',
            captain: '—',
            manager: '—',
            formation: 'TBD',
            future: true,
            lineup: []
        }
    ];

    /* ============================================================
       STATE
       ============================================================ */
    let activeYear = 2022;
    let activePos = 'ALL';
    let activeSearch = '';
    let chartAge = null, chartPos = null, chartClubs = null, chartNations = null;

    /* ============================================================
       INIT
       ============================================================ */
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        renderYearChips();
        wirePosFilter();
        wireSearch();
        // Wait for Chart.js
        bootCharts(0);
    }

    function bootCharts(attempts) {
        if (typeof window.Chart === 'function') {
            // Configure global Chart.js theme
            window.Chart.defaults.color = '#aaaaaa';
            window.Chart.defaults.font.family = 'Outfit, system-ui, sans-serif';
            window.Chart.defaults.borderColor = '#232323';
            renderActive();
        } else if (attempts < 80) {
            setTimeout(function () { bootCharts(attempts + 1); }, 50);
        } else {
            // Render without charts
            renderActive();
        }
    }

    /* ============================================================
       RENDERERS
       ============================================================ */
    function getActive() {
        return TOURNAMENTS.find(function (t) { return t.year === activeYear; });
    }

    function renderActive() {
        renderTournamentCard();
        renderPitch();
        renderLineupList();
        renderInsights();
        renderCharts();
        // Update chips
        document.querySelectorAll('#yearChips .chip').forEach(function (c) {
            c.classList.toggle('active', parseInt(c.dataset.year, 10) === activeYear);
        });
    }

    function renderYearChips() {
        const wrap = document.getElementById('yearChips');
        wrap.innerHTML = '';
        TOURNAMENTS.forEach(function (t) {
            const b = document.createElement('button');
            b.className = 'chip' + (t.year === activeYear ? ' active' : '');
            b.dataset.year = t.year;
            b.textContent = t.year + (t.future ? ' (à venir)' : '');
            b.setAttribute('role', 'tab');
            b.addEventListener('click', function () {
                activeYear = t.year;
                renderActive();
            });
            wrap.appendChild(b);
        });
    }

    function renderTournamentCard() {
        const t = getActive();
        const card = document.getElementById('tournamentCard');
        if (t.future) {
            card.innerHTML =
                '<div class="tc-block">' +
                  '<span class="tc-label">Édition</span>' +
                  '<span class="tc-value-xl">2026</span>' +
                  '<span class="tc-flag"><span class="tc-flag-emoji">' + t.flag + '</span></span>' +
                '</div>' +
                '<div class="tc-block">' +
                  '<span class="tc-label">Pays-hôtes</span>' +
                  '<span class="tc-value">' + t.host + '</span>' +
                  '<span class="tc-label" style="margin-top:0.5rem;">Finale prévue</span>' +
                  '<span class="tc-value" style="font-size:1rem;">' + t.date + '</span>' +
                  '<span class="tc-label" style="margin-top:0.5rem;">Stade</span>' +
                  '<span class="tc-value" style="font-size:0.95rem;color:var(--text-muted);">' + t.stadium + '</span>' +
                '</div>' +
                '<div class="tc-block">' +
                  '<span class="tc-label">Format inédit</span>' +
                  '<span class="tc-value" style="font-size:1rem;color:var(--text-muted);line-height:1.5;">48 équipes pour la première fois — 12 groupes de 4, puis phase finale élargie.</span>' +
                '</div>' +
                '<div class="tc-future">' +
                  '<strong>📊 Le XI titulaire de la finale 2026 sera ajouté ici dès la fin du tournoi.</strong> ' +
                  'En attendant, parcourez les <strong>7 finales précédentes</strong> en cliquant sur les éditions ci-dessus. ' +
                  'Les compositions sont issues des feuilles de match officielles FIFA.' +
                '</div>';
            return;
        }
        const avgAge = (t.lineup.reduce(function (s, p) { return s + p.age; }, 0) / t.lineup.length).toFixed(1);
        card.innerHTML =
            '<div class="tc-block">' +
              '<span class="tc-label">Champion du Monde ' + t.year + '</span>' +
              '<span class="tc-flag"><span class="tc-flag-emoji">' + t.flag + '</span><span class="tc-value-xl">' + t.winner + '</span></span>' +
              '<span class="tc-meta" style="margin-top:0.85rem;">' +
                '<span class="tc-meta-item"><span>Score</span><strong>' + t.score + '</strong></span>' +
                '<span class="tc-meta-item"><span>Adversaire</span><strong>' + t.opponent + '</strong></span>' +
              '</span>' +
            '</div>' +
            '<div class="tc-block">' +
              '<span class="tc-label">Capitaine</span>' +
              '<span class="tc-value">' + t.captain + '</span>' +
              '<span class="tc-label" style="margin-top:0.5rem;">Sélectionneur</span>' +
              '<span class="tc-value" style="font-size:1.05rem;color:var(--text-muted);">' + t.manager + '</span>' +
              '<span class="tc-label" style="margin-top:0.5rem;">Formation</span>' +
              '<span class="tc-value" style="font-family:var(--mono);color:var(--accent);">' + t.formation + '</span>' +
            '</div>' +
            '<div class="tc-block">' +
              '<span class="tc-label">Stade · Date</span>' +
              '<span class="tc-value" style="font-size:1rem;">' + t.stadium + '</span>' +
              '<span class="tc-value" style="font-size:0.92rem;color:var(--text-muted);">' + t.date + '</span>' +
              '<span class="tc-label" style="margin-top:0.5rem;">Âge moyen XI</span>' +
              '<span class="tc-value" style="font-family:var(--mono);">' + avgAge + ' ans</span>' +
            '</div>';
    }

    function renderPitch() {
        const t = getActive();
        const pitch = document.getElementById('pitch');
        const label = document.getElementById('pitchLabel');
        // Clear previous spots
        pitch.querySelectorAll('.player-spot').forEach(function (el) { el.remove(); });
        if (t.future) {
            label.textContent = 'FORMATION · 2026 — TBD';
            const note = document.createElement('div');
            note.className = 'player-spot';
            note.style.left = '50%';
            note.style.top = '50%';
            note.innerHTML = '<div class="player-bubble" style="background:#444;color:#aaa;width:auto;padding:8px 16px;border-radius:8px;font-size:0.78rem;font-family:var(--mono);">À venir — juillet 2026</div>';
            pitch.appendChild(note);
            return;
        }
        label.textContent = 'FORMATION · ' + t.formation;
        t.lineup.forEach(function (p) {
            const spot = document.createElement('div');
            spot.className = 'player-spot';
            spot.dataset.pos = p.pos;
            spot.dataset.player = p.name;
            spot.style.left = p.x + '%';
            spot.style.top = (100 - p.y) + '%'; // y inversé : but bas
            spot.innerHTML =
                '<div class="player-bubble">' + p.num + '</div>' +
                '<div class="player-name">' + (p.name.split(' ').pop()) + '</div>';
            spot.addEventListener('mouseenter', function () { highlightPlayer(p.name, true); });
            spot.addEventListener('mouseleave', function () { highlightPlayer(p.name, false); });
            spot.addEventListener('click', function () { highlightPlayer(p.name, true, true); });
            pitch.appendChild(spot);
        });
    }

    function renderLineupList() {
        const t = getActive();
        const list = document.getElementById('lineupList');
        const count = document.getElementById('lineupCount');
        // Remove old rows
        list.querySelectorAll('.player-row').forEach(function (r) { r.remove(); });
        if (t.future) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = 'Le XI titulaire de la finale 2026 sera renseigné après le coup de sifflet final.';
            list.appendChild(empty);
            count.textContent = '— TBD —';
            return;
        }
        let visible = 0;
        t.lineup.forEach(function (p) {
            const row = document.createElement('div');
            row.className = 'player-row';
            row.dataset.player = p.name;
            row.dataset.pos = p.pos;
            const matchPos = activePos === 'ALL' || p.pos === activePos;
            const search = (p.name + ' ' + p.club).toLowerCase();
            const matchSearch = !activeSearch || search.indexOf(activeSearch) !== -1;
            const visibleHere = matchPos && matchSearch;
            if (!visibleHere) row.dataset.hidden = '1';
            else visible++;
            row.innerHTML =
                '<span class="pr-num">' + p.num + '</span>' +
                '<span class="pr-name"><strong>' + p.name + '</strong><small>' + (p.pos === 'GK' ? 'Gardien' : p.pos === 'DF' ? 'Défenseur' : p.pos === 'MF' ? 'Milieu' : 'Attaquant') + '</small></span>' +
                '<span class="pr-pos" data-pos="' + p.pos + '">' + p.pos + '</span>' +
                '<span class="pr-age">' + p.age + ' a</span>' +
                '<span class="pr-club">' + p.club + '</span>';
            row.addEventListener('mouseenter', function () { highlightPlayer(p.name, true); });
            row.addEventListener('mouseleave', function () { highlightPlayer(p.name, false); });
            row.addEventListener('click', function () { highlightPlayer(p.name, true, true); });
            list.appendChild(row);
        });
        count.textContent = visible + ' joueur' + (visible > 1 ? 's' : '');
    }

    function highlightPlayer(name, on, scrollIntoView) {
        document.querySelectorAll('.player-spot').forEach(function (s) {
            const match = s.dataset.player === name;
            s.classList.toggle('is-active', match && on);
        });
        document.querySelectorAll('.player-row').forEach(function (r) {
            const match = r.dataset.player === name;
            r.classList.toggle('is-active', match && on);
            if (match && on && scrollIntoView) {
                r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    /* ============================================================
       INSIGHTS
       ============================================================ */
    function renderInsights() {
        const t = getActive();
        const grid = document.getElementById('insightsGrid');
        const yearLabel = document.getElementById('insightsYear');
        yearLabel.textContent = t.year;
        grid.innerHTML = '';

        if (t.future) {
            grid.innerHTML =
                '<div class="insight"><div class="insight-label">Édition</div><div class="insight-value">2026</div><div class="insight-sub">Première à 48 équipes</div></div>' +
                '<div class="insight"><div class="insight-label">Pays hôtes</div><div class="insight-value" style="font-size:1rem;color:var(--text);">USA · CAN · MEX</div><div class="insight-sub">Co-organisation inédite à 3</div></div>' +
                '<div class="insight"><div class="insight-label">Match d\'ouverture</div><div class="insight-value" style="font-size:1rem;color:var(--text);">11 juin 2026</div><div class="insight-sub">Estadio Azteca, Mexico</div></div>' +
                '<div class="insight"><div class="insight-label">Finale</div><div class="insight-value" style="font-size:1rem;color:var(--text);">19 juillet 2026</div><div class="insight-sub">MetLife Stadium, New Jersey</div></div>';
            return;
        }

        // Compute insights
        const youngest = t.lineup.reduce(function (a, b) { return a.age < b.age ? a : b; });
        const oldest = t.lineup.reduce(function (a, b) { return a.age > b.age ? a : b; });
        const clubCounts = {};
        t.lineup.forEach(function (p) { clubCounts[p.club] = (clubCounts[p.club] || 0) + 1; });
        const topClub = Object.keys(clubCounts).sort(function (a, b) { return clubCounts[b] - clubCounts[a]; })[0];
        const topClubCount = clubCounts[topClub];
        const avgAge = (t.lineup.reduce(function (s, p) { return s + p.age; }, 0) / t.lineup.length).toFixed(1);

        grid.innerHTML =
            '<div class="insight"><div class="insight-label">Plus jeune titulaire</div><div class="insight-value">' + youngest.age + ' ans</div><div class="insight-sub">' + youngest.name + ' (' + youngest.pos + ')</div></div>' +
            '<div class="insight"><div class="insight-label">Plus expérimenté</div><div class="insight-value">' + oldest.age + ' ans</div><div class="insight-sub">' + oldest.name + ' (' + oldest.pos + ')</div></div>' +
            '<div class="insight"><div class="insight-label">Âge moyen XI</div><div class="insight-value">' + avgAge + ' a</div><div class="insight-sub">Référence sur la finale</div></div>' +
            '<div class="insight"><div class="insight-label">Club le plus représenté</div><div class="insight-value" style="font-size:1.1rem;">' + topClub + '</div><div class="insight-sub">' + topClubCount + ' titulaire' + (topClubCount > 1 ? 's' : '') + ' sur 11</div></div>';
    }

    /* ============================================================
       CHARTS (Chart.js)
       ============================================================ */
    function renderCharts() {
        if (typeof window.Chart !== 'function') return;
        renderChartAge();
        renderChartPos();
        renderChartClubs();
        renderChartNations();
    }

    function renderChartAge() {
        const ctx = document.getElementById('chartAge');
        if (!ctx) return;
        const data = TOURNAMENTS
            .filter(function (t) { return !t.future; })
            .map(function (t) {
                const avg = t.lineup.reduce(function (s, p) { return s + p.age; }, 0) / t.lineup.length;
                return { year: t.year, avg: parseFloat(avg.toFixed(2)), winner: t.winner };
            });
        const activeIdx = data.findIndex(function (d) { return d.year === activeYear; });
        if (chartAge) chartAge.destroy();
        chartAge = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(function (d) { return d.year; }),
                datasets: [{
                    label: 'Âge moyen',
                    data: data.map(function (d) { return d.avg; }),
                    borderColor: '#d97757',
                    backgroundColor: 'rgba(217, 119, 87,0.10)',
                    pointBackgroundColor: data.map(function (d, i) { return i === activeIdx ? '#d97757' : '#fdfbf7'; }),
                    pointBorderColor: '#0a0a0a',
                    pointBorderWidth: 2,
                    pointRadius: data.map(function (d, i) { return i === activeIdx ? 8 : 5; }),
                    fill: true,
                    tension: 0.35,
                    borderWidth: 2.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#131313',
                        borderColor: '#303030',
                        borderWidth: 1,
                        titleColor: '#fff',
                        bodyColor: '#aaa',
                        padding: 12,
                        callbacks: {
                            title: function (items) {
                                const i = items[0].dataIndex;
                                return data[i].year + ' — ' + data[i].winner;
                            },
                            label: function (ctx) { return 'Âge moyen : ' + ctx.parsed.y + ' ans'; }
                        }
                    }
                },
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#777', font: { family: 'JetBrains Mono', size: 11 } } },
                    y: {
                        suggestedMin: 25, suggestedMax: 30,
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        ticks: { color: '#777', font: { family: 'JetBrains Mono', size: 11 }, callback: function (v) { return v + ' a'; } }
                    }
                }
            }
        });
    }

    function renderChartPos() {
        const ctx = document.getElementById('chartPos');
        if (!ctx) return;
        const t = getActive();
        const counts = { GK: 0, DF: 0, MF: 0, FW: 0 };
        t.lineup.forEach(function (p) { counts[p.pos]++; });
        if (chartPos) chartPos.destroy();
        chartPos = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Gardien', 'Défenseurs', 'Milieux', 'Attaquants'],
                datasets: [{
                    data: [counts.GK, counts.DF, counts.MF, counts.FW],
                    backgroundColor: ['#ffd23f', '#4ec9ff', '#74e09a', '#e89478'],
                    borderColor: '#0a0a0a',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '62%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#aaa', usePointStyle: true, padding: 14, font: { size: 12 } } },
                    tooltip: { backgroundColor: '#131313', borderColor: '#303030', borderWidth: 1, padding: 12 }
                }
            }
        });
    }

    function renderChartClubs() {
        const ctx = document.getElementById('chartClubs');
        if (!ctx) return;
        const counts = {};
        TOURNAMENTS.forEach(function (t) {
            if (t.future) return;
            t.lineup.forEach(function (p) { counts[p.club] = (counts[p.club] || 0) + 1; });
        });
        const top = Object.keys(counts)
            .sort(function (a, b) { return counts[b] - counts[a]; })
            .slice(0, 8);
        if (chartClubs) chartClubs.destroy();
        chartClubs = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: top,
                datasets: [{
                    label: 'Titulaires fournis',
                    data: top.map(function (k) { return counts[k]; }),
                    backgroundColor: top.map(function (_, i) {
                        return i === 0 ? '#d97757' : 'rgba(217, 119, 87,' + (0.85 - i * 0.08) + ')';
                    }),
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: '#131313', borderColor: '#303030', borderWidth: 1, padding: 12 }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        ticks: { color: '#777', stepSize: 1, font: { family: 'JetBrains Mono', size: 11 } }
                    },
                    y: { grid: { display: false }, ticks: { color: '#aaa', font: { size: 11 } } }
                }
            }
        });
    }

    function renderChartNations() {
        const ctx = document.getElementById('chartNations');
        if (!ctx) return;
        const counts = {};
        TOURNAMENTS.forEach(function (t) {
            if (t.future) return;
            counts[t.winner] = (counts[t.winner] || 0) + 1;
        });
        const labels = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; });
        if (chartNations) chartNations.destroy();
        chartNations = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Titres',
                    data: labels.map(function (k) { return counts[k]; }),
                    backgroundColor: labels.map(function (n) {
                        const colors = { 'France': '#0055A4', 'Brésil': '#009C3B', 'Italie': '#008C45', 'Espagne': '#AA151B', 'Allemagne': '#FFCE00', 'Argentine': '#74ACDF' };
                        return colors[n] || '#d97757';
                    }),
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: '#131313', borderColor: '#303030', borderWidth: 1, padding: 12, callbacks: { label: function (ctx) { return ctx.parsed.y + ' titre' + (ctx.parsed.y > 1 ? 's' : ''); } } }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#aaa', font: { size: 11 } } },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        ticks: { color: '#777', stepSize: 1, font: { family: 'JetBrains Mono', size: 11 } }
                    }
                }
            }
        });
    }

    /* ============================================================
       CONTROLS
       ============================================================ */
    function wirePosFilter() {
        const wrap = document.getElementById('posFilter');
        wrap.querySelectorAll('.pos-btn').forEach(function (b) {
            b.addEventListener('click', function () {
                wrap.querySelectorAll('.pos-btn').forEach(function (x) { x.classList.remove('active'); });
                b.classList.add('active');
                activePos = b.dataset.pos;
                renderLineupList();
            });
        });
    }

    function wireSearch() {
        const input = document.getElementById('searchInput');
        let debounce;
        input.addEventListener('input', function () {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                activeSearch = input.value.trim().toLowerCase();
                renderLineupList();
            }, 120);
        });
    }

})();
