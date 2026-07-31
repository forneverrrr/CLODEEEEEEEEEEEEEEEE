# Как обновить viden.html — точный патч

Я не могу запушить это напрямую: репозиторий сайта nordindsigt.dk не подключён
к этой сессии (в scope только `forneverrrr/clodeeeeeeeeeeeeeeee` — репо со
скиллами). Скопируй ниже вручную в код сайта (или дай доступ к репо сайта
через `add_repo`, если он на GitHub — тогда в следующем чате смогу закоммитить
сам).

## 1. Новые файлы — залить как есть

- `viden-bydel.html` → `/viden-bydel.html`
- `viden-elrapport.html` → `/viden-elrapport.html`

Оба сделаны 1-в-1 по текущему шаблону сайта (тот же CSS, шрифт, nav/footer,
Article + FAQPage JSON-LD, canonical/OG-теги). EN-версии пока не сделаны —
хрефланг оставлен только на `da` + `x-default`, поэтому не будет битых ссылок
на несуществующий `/en/...`.

## 2. Правки в viden.html

### Добавить два новых `.item` (после блока asbesttag, перед tjekliste.html):

```html
<a class="item" href="/viden-bydel.html">
  <div class="tag">Kvarter</div>
  <h2>Sådan tjekker du selv en bydel — før du byder</h2>
  <p>5 gratis offentlige værktøjer: lokalplan, støjkort, jordforurening, skoledistrikt og reel transporttid.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>

<a class="item" href="/viden-elrapport.html">
  <div class="tag">Dokumenter</div>
  <h2>Elinstallationsrapporten oversat: hvad koster fundene reelt?</h2>
  <p>Ulovligt forhold, sikkerhedsrisiko, ikke undersøgt — kategorierne forklaret, og hvordan du vurderer omfang før du forhandler pris.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

### Добавить ещё два новых `.item` (batch 5 — andelsbolig + skjulte udgifter):

```html
<a class="item" href="/viden-andelsbolig.html">
  <div class="tag">Andelsbolig</div>
  <h2>Andelsbolig: den lave pris fortæller ikke, hvad du kommer til at betale</h2>
  <p>Andelsværdi er ikke en ejerboligs pris. Boligafgiften og foreningens fælleslån afgør din reelle månedlige udgift — samme pris kan skjule tre helt forskellige økonomier.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>

<a class="item" href="/viden-skjulte-udgifter.html">
  <div class="tag">Økonomi</div>
  <h2>De skjulte langtidsudgifter — det annoncen ikke fremhæver</h2>
  <p>Olietank, servitutter med økonomiske forpligtelser, privat vand, separatkloakering og BBR-efterslæb — fem regninger, der først kommer år efter overtagelsen.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

### Opdater "På vej"-boksen (fjern de to punkter, der nu er udgivet):

Erstat:
```html
<div class="soon">
  <div class="tag">På vej</div>
  <p>Kommende guides: sådan tjekker du selv en bydel (støj, skoler, planer) · elrapportens fund oversat til håndværkerregninger · fund fra vores analyser som cases.</p>
</div>
```
med:
```html
<div class="soon">
  <div class="tag">På vej</div>
  <p>Kommende guides: fund fra vores analyser som anonymiserede cases (villa, ejerlejlighed, andelsbolig) · andelsboligens maksimumpris og andelskrone forklaret.</p>
</div>
```

## 3. Валидация перед публикацией

1. Тест JSON-LD обеих новых страниц в [Google Rich Results Test].
2. Проверить, что `/viden-bydel.html` и `/viden-elrapport.html` реально
   отдают 200 после деплоя.
3. Добавить обе новые страницы (плюс существующие 3) в `sitemap.xml`, если он
   генерируется вручную, а не автоматически Vercel-ом.
4. Как только страницы будут в реальном виде на сайте — `ai-seo` скилл может
   сгенерировать/обновить `llms.txt` с ссылками на все guides (обсуждали в
   `codex-research-brief.md`, п.3) — это то, что даёт ChatGPT/Perplexity/Google
   AI Overviews ссылаться на нас как источник.

---

## Batch 7 — «Hvem arbejder for dig» (28.07.2026)

### Новый файл

- `viden-hvem-arbejder-for-dig.html` → `/viden-hvem-arbejder-for-dig.html`

Сделан по тому же шаблону (nav v3, footer v3, Article + FAQPage JSON-LD с 5 вопросами,
hreflang da + x-default). JSON-LD провалидирован.

**Отличие от предыдущих:** CTA ведёт не на `/bestil.html` (299 kr), а на
`/sammenlign-3.html` (599 kr) — статья про сравнение, поэтому продаёт сравнение.
Это первый материал, который вообще продаёт «Sammenlign 3».

### Добавить `.item` в viden.html

```html
<a class="item" href="/viden-hvem-arbejder-for-dig.html">
  <div class="tag">Roller</div>
  <h2>Hvem arbejder for dig, når du køber bolig?</h2>
  <p>Mægleren skal varetage sælgers interesser — det står i loven. Se hvad hver part tjener, af hvad, og hvornår de kommer ind i processen.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

### Проверить перед публикацией

- Страница `/sammenlign-3.html` существует и принимает трафик (CTA ведёт туда).
- Ссылки в блоке «Læs også» ведут на реально существующие страницы.
