"""Comprueba integridad de páginas y recursos sin dependencias externas."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parent.parent

class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.links, self.ids = path, [], set()
        self.activities = self.reviews = 0
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f'{self.path}: id duplicado {a["id"]}'
            self.ids.add(a['id'])
        for key in ('href', 'src', 'poster'):
            if key in a: self.links.append(a[key])
        if 'data-category' in a: self.activities += 1
        if tag == 'figure' and 'review' in a.get('class', '').split(): self.reviews += 1

pages = {p.name: Document(p) for p in ROOT.glob('*.html')}
assert len(pages) == 7, 'Se requieren siete páginas'
count = 0
for doc in pages.values():
    for link in doc.links:
        u = urlsplit(link)
        if u.scheme or u.netloc: continue
        target = ROOT / unquote(u.path) if u.path else doc.path
        assert target.is_file(), f'{doc.path.name}: recurso faltante {link}'
        if target.suffix == '.html' and u.fragment:
            assert unquote(u.fragment) in pages[target.name].ids, f'Ancla faltante: {link}'
        count += 1
assert pages['actividades.html'].activities == 8
assert pages['opiniones.html'].reviews == 8
print(f'Correcto: {len(pages)} páginas, {count} enlaces y recursos, 8 actividades y 8 opiniones.')
