# NordIndsigt — 6 постов + 1 рилс по кейсу «Два дома, одна цена»
## (первый реальный кейс из партии ~10 домов; анонимизировано)

**Визуальный стиль зафиксирован: реализм / полуфото (mixed media), НЕ плоский
вектор старой карусельной серии.** Все промпты ниже — уже в этом стиле
(следуют формуле из batch1/batch2: identity anchor → subject → composition →
consistency lock, где применимо). Если для этих постов уже сгенерирован
эталонный референс-кадр в Nano Banana Pro — используй его как reference-image
для всех промптов ниже, чтобы серия была визуально единой.

Калибровка тона та же: манипуляция 3-4/10, страх 5/10, юр.строгость 9/10.
Оба дома анонимизированы — без адресов, без опознаваемых деталей (сравни с
`viden-case-to-huse-samme-pris.html`, который уже прошёл эту анонимизацию).

---

## ПОСТ 1 — Открывашка кейса (карусель, слайд 1)

**Текст:**
«Два дома. Почти одна и та же цена. Совершенно разный риск.»

**Nano Banana Pro (реализм):**
```
Photorealistic split-frame composition: on the left, a bright modern Danish
rækkehus facade (2021-style new build, brick and large windows), on the right,
a charming historic Danish townhouse facade (late 1800s, restored, cobblestone
street visible), both photographed in the same warm late-afternoon light,
seamless vertical division down the center, no visible house numbers or street
signs, no people, no text, no logo, editorial real estate photography.
```

**CTA:** «Разбор кейса на сайте: nordindsigt.dk/viden → «To huse, samme pris»»

---

## ПОСТ 2 — Энергометка блока, а не дома

**Текст:**
«Красивая цифра на обложке энергометки. Проблема: она может относиться ко
ВСЕЙ секции домов, а не к твоему. Так было в одном из наших разборов — цифра
на видном месте, реальная доля — совсем другая после пересчёта.»

**Nano Banana Pro (реализм):**
```
Photorealistic close-up of a hand holding an energy label certificate (blurred
generic Danish energy rating document, not readable text), out of focus in the
background a row of identical modern townhouses under warm afternoon light,
shallow depth of field, calm investigative mood, no readable text, no logo.
```

---

## ПОСТ 3 — «Ещё нет отчётов» ≠ «нет проблем»

**Текст:**
«Объявление уже активно. Отчёт о состоянии дома — ещё нет. Это законно. Но
значит, что решение о покупке в моменте принимается без части картины.»

**Nano Banana Pro (реализм, переиспользуем batch1 #4):**
```
Close-up photorealistic shot of a hand holding a pen, hovering just above the
signature line of a paper contract on a wooden desk, warm afternoon window
light, shallow depth of field, a folded property document softly blurred in
the background, calm and deliberate mood, no visible text, no logo.
```

---

## ПОСТ 4 — Vurdering в обе стороны (data-пост)

**Текст:**
«Один дом стоил дешевле официальной оценки. Другой — почти на треть дороже.
Оба случая из одной и той же нашей проверки, один и тот же город. Оценка —
не приговор, а один из вопросов, которые стоит задать до задатка.»

**Nano Banana Pro (реализм, весы):**
```
Photorealistic simple balance scale on a wooden table, one side holding a
small price tag icon, the other holding a small official document/stamp icon,
subtle imbalance leaning slightly, warm studio lighting, minimal and clean
composition, no text, no logo.
```

---

## ПОСТ 5 — Bevaringsværdig: скрытое ограничение, не ошибка

**Текст:**
«Красивый, отремонтированный старый дом в центре. Статус охраны наследия
означает: изменения фасада согласовываются с муниципалитетом — даже там,
где обычный владелец просто перекрасил бы стену. Не минус, но то, что нужно
знать заранее.»

**Nano Banana Pro (реализм):**
```
Photorealistic close-up of a weathered but charming historic Danish townhouse
facade with slightly worn plaster, warm late-afternoon light, cobblestone
street partially visible in foreground, shallow depth of field, calm and
authentic mood, no visible address numbers, no people, no text, no logo.
```

---

## ПОСТ 6 — Чек-лист/сохраняемый пост «Одна цена — два разных риска»

**Текст (флэтлей-чек-лист, сохраняемый формат):**
«Тот же бюджет — не тот же риск. Сохрани:
🏗️ Новый дом → ниже цена за м², но отчёты могут ещё не быть готовы.
🏛️ Исторический дом → полное досье готово, но премия к цене и ограничения на
ремонт фасада.
Оба — не плохой выбор. Просто разные.»

**Nano Banana Pro (реализм, флэтлей):**
```
Overhead flat-lay photograph of a wooden desk with two sets of documents side
by side — one stack crisp and new-looking, the other slightly aged with a
vintage feel — a pen and a cup of coffee nearby, warm natural window light,
soft shadows, calm and organized mood, no visible text, no logo.
```

---

## РИЛС — «Один и тот же бюджет, разные вопросы» (без диктора, текст-оверлей)

**Скрипт (12-15 сек):**
1. (0-4с) Реалистичный кадр нового дома (см. промпт поста 1, левая половина).
   Оверлей: «Дом А: дешевле за м². Отчётов ещё нет.»
2. (4-8с) Реалистичный кадр старого дома (правая половина).
   Оверлей: «Дом Б: полное досье. Цена выше рынка.»
3. (8-12с) Кадр с весами (пост 4) или лупой.
   Оверлей: «Один бюджет. Два разных вопроса, которые стоит задать.»
4. (12-15с) Финал/CTA.
   Оверлей: «Разбор на сайте: link in bio»

**Правило:** текст-оверлей накладывается в редакторе (CapCut/Canva), не
генератором — та же логика, что и раньше.

---

## Важно перед публикацией

- Все прогнать через `copy-editing`/`humanizer` при необходимости.
- Ещё раз сверить, что ни один текст/промпт не содержит опознаваемых деталей
  (улица, застройщик, страховая компания, точные даты осмотра) — в этой партии
  таких деталей уже нет, но перепроверка не помешает перед публикацией.
- AI-метка Meta: скриншот/exiftool перед загрузкой — правило не меняется.
- Ждём остальные ~8 домов из партии — следующий батч постов и статей Viden
  собираем вместе с этими двумя, единым массивом, как ты и просил.
