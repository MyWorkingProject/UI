//  Highlight Term

angular.module("budgeting").directive('highlightTerm', [
    function () {
        function link(scope, elem, attrs) {
            var s = {};

            s.insertHighlight = function () {
                var text = elem.text(),
                    term = attrs.highlightTerm,
                    terms = term.split(' ');

                function insert(term) {
                    var out = '',
                        exp = new RegExp(term, 'ig'),
                        matches = text.match(exp),
                        pieces = text.split(exp);

                    if (!matches) {
                        return;
                    }

                    function join(piece, key) {
                        if (key < matches.length) {
                            out += piece + '<>' + matches[key] + '</>';
                        }
                        else {
                            out += piece;
                        }
                    }

                    pieces.forEach(join);

                    text = out;
                }

                terms.forEach(insert);

                var s1 = new RegExp('<>', 'ig'),
                    s2 = new RegExp('</>', 'ig');

                text = text
                    .replace(s1, '<span class="highlight">')
                    .replace(s2, '</span>');

                elem.html(text);
            };

            setTimeout(s.insertHighlight);

            scope.highlightTerm = s;
        }

        return {
            link: link,
            restrict: 'A'
        };
    }
]);
