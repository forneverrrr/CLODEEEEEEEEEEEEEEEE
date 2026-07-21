# NordIndsigt — 6 образовательных постов + 2 рилс-скрипта для FB/Insta
## (привязаны к двум новым статьям на сайте: bydel + elrapport)

Калибровка тона та же, что в предыдущей серии: манипуляция 3-4/10, страх 5/10,
юр.строгость 9/10 — факты общедоступны (plandata.dk, miljoeportal.dk, sik.dk),
без выдуманных цифр. Каждый пост ведёт на конкретную статью сайта — это и есть
петля "соцсети → сайт → цитируемость в AI-поиске" из бифа для Codex.

---

## ПОСТ 1 — Открывашка серии "Bydel" (карусель, 1 слайд можно расширить до 4-5)

**Слайд 1 (обложка):**
«Boligen er kun halvdelen af historien.»

**Слайд 2:**
«5 gratis værktøjer, du bør tjekke, før du byder — ikke efter.»

**Слайд 3-4 (список, коротко):**
Plandata.dk — fremtidigt byggeri · Miljøportalens støjkort · Jordforurening.dk ·
Kommunens skoledistrikt · Rejseplanen — reel transporttid.

**Слайд 5 (CTA):**
«Vi tjekker det for dig — sammen med selve boligen. Læs guiden på nordindsigt.dk/viden»

**Nano Banana Pro (обложка):** промпт batch2 #2 (геометка с высоты, золотой час) —
уже готов, референс `feed-prompts-nanobanana-batch2-library.md`.

**Хэштеги:** #boligkøb #boligkøber #danmark (адаптировать под текущий список хэштегов кампании)

---

## ПОСТ 2 — "Skoledistrikt ≠ nærmeste skole"

**Текст:**
«Den nærmeste skole er ikke altid jeres skole. Skoledistriktet afgør det —
og det står ikke i salgsopstillingen. Tjek kommunens eget distriktskort, før
I forelsker jer i et kvarter for skolens skyld.»

**Визуал:** промпт batch2 #3 (карта инфраструктуры с временем в пути) — заменить
геометки датских объектов на «skole / station / indkøb» вручную.

**CTA:** «Fuld guide til kvarter-tjek: link i bio / nordindsigt.dk/viden-bydel»

---

## ПОСТ 3 — "Det, mægleren ikke er forpligtet til at nævne"

**Текст:**
«En planlagt vejomlægning 200 meter fra terrassen. Et kommende byggeri på
naboarealet. Intet af det er ulovligt at udelade i en salgsopstilling —
mægleren skal beskrive boligen, ikke kommunens fremtidsplaner. Det er derfor,
vi selv tjekker plandata.dk, hver gang.»

**Визуал:** batch1 промпт #3 (карта района с иконками инфраструктуры) или
batch2 #2 (аэросъёмка + геометка).

**Дисклеймер (§2, если пост звучит как утверждение о конкретном кейсе):** не
требуется — текст общий, не про конкретный адрес.

---

## ПОСТ 4 — Открывашка серии "Elrapport" — домино-метафора

**Текст:**
«Én linje i elinstallationsrapporten: "ulovligt forhold, ikke sikkerhedsmæssig
risiko." Lyder ikke farligt. Men "ikke farligt" og "gratis at rette" er ikke
det samme.»

**Nano Banana Pro:** batch1 промпт #18 (домино, маленькая деталь → большое
последствие) — идеально подходит под эту тему, ещё не использован.

**CTA:** «Vi oversætter rapportens kategorier til, hvad de reelt betyder —
link i bio / nordindsigt.dk/viden-elrapport»

---

## ПОСТ 5 — "SORT/Ikke undersøgt ≠ frikendt"

**Текст:**
«"Ikke undersøgt" i en el- eller tilstandsrapport betyder ikke "nok i orden".
Det betyder: den sagkyndige kunne ikke se det. Det er ikke det samme som et
grønt lys — det er en ukendt størrelse, I selv skal forholde jer til.»

**Визуал:** batch1 промпт #14 (лупа над печатью документа) или новый вариант
с домино (переиспользование поста 4 под другим углом).

---

## ПОСТ 6 — Чек-лист/сохраняемый пост "Elrapport i 3 kategorier"

**Текст (флэтлей-чек-лист формат, аналог поста 8/12 из прошлой серии):**
«3 kategorier i elinstallationsrapporten — gem denne:
🔴 Ulovligt + sikkerhedsrisiko → afklar altid.
🟡 Ulovligt, ikke sikkerhedsrisiko → kan stadig koste ved salg/ombygning.
⚫ Ikke undersøgt → ukendt, ikke godkendt.»

**Визуал:** batch2 промпт #9 (чек-лист с крупной цифрой) — заменить 5 на 3,
или batch1 #12 (флэтлей стол).

**CTA:** «Fuld forklaring + hvad det koster at rette: nordindsigt.dk/viden-elrapport»

---

## РИЛС/STORIES 1 — "5 sites, 2 minutter" (screen-recording формат)

**Скрипт (10-15 сек, без диктора, только текст-оверлей на скринкасте):**
1. (0-3с) Экран: Google → "plandata.dk" → ввод адреса → пауза на результате.
   Оверлей: «1. Fremtidigt byggeri?»
2. (3-6с) Экран: miljoeportal.dk, включен слой støj.
   Оверлей: «2. Støjniveau?»
3. (6-9с) Экран: Rejseplanen, поездка в час пик.
   Оверлей: «3. Reel transporttid — ikke søndag morgen»
4. (9-13с) Финальный кадр — лого/CTA.
   Оверлей: «5 gratis værktøjer. Fuld liste: link i bio»

**Правило видео (из скилла `video`/`watch`):** не доверять AI-модели текст в
кадре — оверлеи накладываются отдельно в редакторе (CapCut/Canva), не через
генератор.

---

## РИЛС/STORIES 2 — "Ulovligt ≠ farligt ≠ gratis" (текстовый рилс, talking-points)

**Скрипт (3 текстовых карточки, быстрая смена, без лица в кадре):**
1. «"Ulovligt forhold" i en elrapport lyder slemt.»
2. «Men der er stor forskel på "sikkerhedsrisiko" og "ikke sikkerhedsrisiko".»
3. «Begge dele bør du kende prisen på, før du byder — ikke bagefter.»

**Визуал-фон:** домино-промпт (batch1 #18), looped slow-motion, если генератор/
Flow может дать короткую петлю.

---

## Что важно перед публикацией (не забыть)

- Прогнать все 6 текстов через `copy-editing`/`humanizer`, если тон покажется
  слишком «AI-ровным».
- Проверить актуальность ссылок (plandata.dk, miljoeportal.dk, sik.dk) —
  их структура URL иногда меняется у датских госорганов.
- AI-метка Meta: скриншот вместо экспорта из генератора, либо exiftool перед
  загрузкой — правило то же, что и в предыдущей серии.
- Публикация — только вручную, без автопостинга (принцип из
  `strategy-15-cases-and-promotion.md`, §2.2).
