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

---

## Batch 8 — цифры, источники, две новые статьи, pricing.md (28.07.2026)

### A. Обновлены 5 существующих страниц (перезалить целиком)

`viden-bydel.html` · `viden-elrapport.html` · `viden-case-to-huse-samme-pris.html`
`viden-andelsbolig.html` · `viden-skjulte-udgifter.html`

В каждую добавлен блок `.note` с конкретными цифрами и указанием источника.
В `viden-case-to-huse-samme-pris.html` дополнительно добавлена строка `kilder`,
которой раньше не было вообще.

Зачем: по исследованию Принстона (GEO, KDD 2024) ссылки на источники дают +40%
к цитируемости в AI-поиске, статистика с цифрами +37%. Это самый дешёвый прирост
из доступных — текст статей не переписывался.

### B. Две новые страницы

- `viden-hvornaar-ikke-koebe.html` → `/viden-hvornaar-ikke-koebe.html`
- `viden-hvad-koster-hvad.html` → `/viden-hvad-koster-hvad.html`

Обе по шаблону, JSON-LD провалидирован (Article + FAQPage, 5 и 6 вопросов).

```html
<a class="item" href="/viden-hvornaar-ikke-koebe.html">
  <div class="tag">Beslutning</div>
  <h2>Hvornår skal du IKKE købe boligen?</h2>
  <p>Fem situationer, hvor det rigtige svar er nej — også når boligen er god, papirerne er i orden og prisen er fair.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>

<a class="item" href="/viden-hvad-koster-hvad.html">
  <div class="tag">Priser</div>
  <h2>Hvad koster hvad, når du køber bolig?</h2>
  <p>Mæglersalær, advokat, tinglysning, fortrydelsesret og hvad de typiske fund som tag og el reelt koster at udbedre.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

### B2. Третья новая страница (31.07)

- `viden-fejl-efter-koeb.html` → `/viden-fejl-efter-koeb.html`

Кластер, который не занят ни одним конкурентом: пост-покупка. Выдачу по нему
держат юристы и банки. Статья даёт пошаговый алгоритм, а CTA ведёт не на
проверку уже купленного дома (поздно), а на пересылку тому, кто ещё выбирает.

```html
<a class="item" href="/viden-fejl-efter-koeb.html">
  <div class="tag">Efter handlen</div>
  <h2>Du har købt huset. Nu dukker fejlen op.</h2>
  <p>10 års frist lyder trygt. Her er hvorfor de fleste fund alligevel ikke kan kræves erstattet — og hvad du så gør, trin for trin.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

### B3. Ещё три страницы (31.07) — методология закрыта полностью

- `viden-roede-groenne-flag.html` → `/viden-roede-groenne-flag.html`
- `viden-bolig-som-investering.html` → `/viden-bolig-som-investering.html`
- `viden-koeb-eller-leje.html` → `/viden-koeb-eller-leje.html`

Все три по шаблону, Article + FAQPage по 5 вопросов, источники внизу.

```html
<a class="item" href="/viden-roede-groenne-flag.html">
  <div class="tag">Vurdering</div>
  <h2>Røde og grønne flag — sorteret efter hvad de koster</h2>
  <p>Tre vægtklasser i stedet for en flad liste: hvad der dræber handlen, hvad der er et prisargument, og hvad du bare skal spørge om.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>

<a class="item" href="/viden-bolig-som-investering.html">
  <div class="tag">Økonomi</div>
  <h2>Boligen som investering</h2>
  <p>Hvad der reelt påvirker gensalget, hvad der ikke gør, og de fire ulemper der sjældent nævnes samlet.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>

<a class="item" href="/viden-koeb-eller-leje.html">
  <div class="tag">Økonomi</div>
  <h2>Købe eller leje? Regnestykket over 5, 10 og 20 år</h2>
  <p>Handelsomkostningerne ind og ud ligger typisk på 2-4 % af prisen. Fordelt over ejertiden ændrer det svaret fuldstændigt.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

### B3b. Восьмая новая страница — Boligsøgning (31.07)

- `viden-soege-selv-eller-hjaelp.html` → `/viden-soege-selv-eller-hjaelp.html`

Закрывает пробел: самый дорогой продукт линейки (2.999 kr) не имел ни одного
материала. Статья не продаёт в лоб — она честно говорит, что большинство может
искать само, и называет четыре ситуации, где это перестаёт работать.
CTA двойной: Boligsøgning 2.999 kr либо Sammenlign 3 за 599 kr, если кандидаты
уже найдены.

```html
<a class="item" href="/viden-soege-selv-eller-hjaelp.html">
  <div class="tag">Søgning</div>
  <h2>Hvornår giver det ikke længere mening at søge selv?</h2>
  <p>At søge selv er gratis i kroner og dyrt i timer. Fire situationer, hvor regnestykket vender.</p>
  <span class="go">Læs guiden →</span>
  <div class="lang-note">DA</div>
</a>
```

⚠️ В статье намеренно **не** названо, сколько объектов смотрит покупатель перед
покупкой: официальной датской статистики по этому нет, и в тексте это сказано
прямо. Не подставляй туда число из головы.

---

### B4. Переводы — 21 страница (31.07)

Все 7 новых статей переведены на EN / UK / AR. Схема URL как у существующих
восьми статей сайта: `/en/<тот же файл>.html`, `/uk/…`, `/ar/…`.

| Папка в репозитории | Куда заливать |
|---|---|
| `viden-content/pages/en/*.html` | `https://nordindsigt.dk/en/` |
| `viden-content/pages/uk/*.html` | `https://nordindsigt.dk/uk/` |
| `viden-content/pages/ar/*.html` | `https://nordindsigt.dk/ar/` |

Собраны по **живым шаблонам, снятым с сайта**, а не по датским файлам —
навигация, подвал и переключатель языков совпадают со страницами, которые уже
опубликованы. У каждой страницы: `lang`, `dir="rtl"` для арабского, полный
кластер hreflang из пяти ссылок (da/en/uk/ar/x-default), Article + FAQPage +
BreadcrumbList.

⚠️ **Найденный баг шаблона.** В живых переведённых страницах зашит
`BreadcrumbList`, указывающий на ту статью, с которой шаблон копировался.
Генератор его вырезает и собирает корректный для каждой страницы. Если будешь
делать переводы вручную копированием — проверь этот блок, иначе на страницу
попадут чужие структурные данные.

Карточки для `/en/viden.html`, `/uk/viden.html`, `/ar/viden.html` — заголовки
и описания брать из `<title>` и `<meta name="description">` самих страниц.

---

⚠️ В `viden-koeb-eller-leje.html` намеренно **не** моделируются проценты по
ипотеке, налоги и ежемесячные ejerudgifter — актуальной ставки у нас нет, и
выдумывать её нельзя. В статье это заявлено открытым блоком «что НЕ учтено».
Считаются только транзакционные издержки, которые не зависят от ставки.

### C. Новый файл в корень сайта: `pricing.md`

Файл `viden-content/pricing.md` → залить как **`https://nordindsigt.dk/pricing.md`**
(именно в корень, plain markdown, отдаваться должен как text/plain или text/markdown,
не как HTML).

Зачем: AI-агенты всё чаще сравнивают услуги за пользователя, и непрозрачные цены
выпадают из сравнения. Ни одна крупная сеть мэглеров и ни один из найденных
køberrådgivere цен машиночитаемо не публикует. У нас опубликованы все три.

**Проверить после заливки:** открыть `https://nordindsigt.dk/pricing.md` и
убедиться, что отдаётся сам markdown, а не HTML главной страницы (SPA-фолбэк).
Той же проверки требует `/llms.txt` — сейчас неясно, существует ли он реально.

### D. Проверить перед публикацией

- `/sammenlign-3.html` существует — на неё ведёт CTA из `viden-hvornaar-ikke-koebe`.
- Ссылки в блоках «Læs også» на новых страницах ведут на существующие адреса.
