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
