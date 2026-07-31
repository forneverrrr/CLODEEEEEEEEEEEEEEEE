# Veo 3.1 Lite — 32 финальных промпта под 410 кредитов

**Дата:** 31 июля 2026
**Баланс:** 410 кредитов · Veo 3.1 - Lite = **10 кредитов за генерацию**
**План:** 32 клипа × 10 = **320**, остаётся **90 = 9 перегенераций брака**
**Формат:** 9:16, 8 сек, x1, **текста в кадре нет ни в одном клипе**

> Не гони все 32 подряд. Сначала три пробных — **01, 08, 16** (разные направления
> и разный масштаб, 30 кредитов). Если попадание есть — гонишь остальные.
> Если нет — правим структуру промпта, пока не потрачено 300.

---

## Как читать промпт

Каждый блок в цитате копируется в Veo **целиком, одним куском**. Девять строк,
и каждая закрывает свою дыру, на которой Veo раньше ломался:

| Строка | Что чинит |
|---|---|
| `SHOT` | план и оптика — иначе Veo даёт средний план по умолчанию |
| `SUBJECT` | материал и фактура. Не «документ», а «плотная кремовая бумага 120 г». Veo цепляется именно за материал |
| `ACTION` по секундам | **главное.** Раньше Veo сам решал, когда что происходит, и тратил 5 секунд на раскачку |
| `CAMERA` | отдельной строкой, включая `locked off` там, где камера не должна двигаться |
| `LIGHT` | источник, направление, жёсткость, что бликует |
| `PALETTE` | хексы бренда + одна акцентная точка |
| `AUDIO` | без неё Veo лепит закадровый голос. Звук мы всё равно снимаем при монтаже |
| `FINAL FRAME` | проверено на прошлых клипах — без неё концовка разваливается |
| `NEGATIVE` | текст, лица, номера, вывески, логотипы |

**Пять правил, зашитых во все 32:** движение с первого кадра · событие
физическое и необратимое · один резкий акцент на почти чёрном · жёсткий
направленный свет · явный финальный кадр.

**Человек в кадре — только со спины или силуэтом.** Лица нет ни в одном клипе.
Это не стиль, это ограничение по анонимизации.

---

## Порядок генерации

Если кредиты кончатся раньше — эти 12 закрывают самые частые тезисы:

`01 · 02 · 06 · 07 · 12 · 13 · 21 · 23 · 25 · 27 · 30 · 32`

---

## Чек-лист приёмки — что считать браком

Перегенерируй, если: появился текст или буквы · видно лицо · руки с шестью
пальцами в фокусе · событие произошло позже 2-й секунды · камера уехала там, где
`locked off` · финальный кадр не тот, что описан.

Оставь как есть, если: чуть другой цвет · движение чуть медленнее · объект не
идеальной формы. Это не видно в ленте на скорости 1,5 сек на кадр.

---

# 1. ЦЕНА ОШИБКИ

### 01 — Купюры сдувает со стола
**Назначение:** 299 kr против 30 000 kr · любой пост про цену ошибки
**Масштаб:** предмет · **Файл:** `01-sedler-blaeser-vaek.mp4`

> SHOT: overhead top-down shot, 35mm, camera 60cm above a matte near-black oak table.
> SUBJECT: a small unpainted birch house model, 12cm tall, sharp roof edges; beside it a neat fan of twenty crisp paper banknotes, warm cream paper with visible fibre texture, laid in an overlapping arc.
> ACTION: 0.0–1.0s — a violent gust hits from frame left on the very first frame; the outer notes lift and peel away instantly. 1.0–4.0s — the whole fan explodes upward, notes tumbling and spinning, several whipping close past the lens in motion blur. 4.0–8.0s — the last notes drift out of frame; the house model has not moved at all.
> CAMERA: locked off, no pan, no zoom, no drift.
> LIGHT: single hard warm key from frame right at 30 degrees, deep unlit shadows, strong specular edge on the paper.
> PALETTE: near-black #0F1E30 background, warm cream #E8DED1 paper, one rust-red #C4533F object at frame edge as accent.
> AUDIO: ambient only — wind and paper flutter. No music, no dialogue, no voiceover.
> FINAL FRAME: bare dark table, the birch house model alone in the centre, two banknotes left flat near the frame edge, everything motionless.
> NEGATIVE: no text of any kind, no captions, no subtitles, no numbers, no logos, no watermark, no readable documents, no visible faces, no house numbers, no street signs.

### 02 — Монеты засыпают документ
**Назначение:** скрытые расходы · любая находка с ценником
**Масштаб:** макро · **Файл:** `02-mynter-begraver-dokument.mp4`

> SHOT: tight overhead macro, 50mm, camera 30cm above the surface, shallow depth of field.
> SUBJECT: a single sheet of heavy cream 120gsm paper lying flat on black slate, one soft crease across it, edges slightly raised.
> ACTION: 0.0–0.8s — coins hammer down into frame from above immediately, no pause, striking the paper and bouncing. 0.8–5.0s — the stream thickens into a continuous fall of brass and steel coins, ringing, piling and sliding across the sheet. 5.0–8.0s — the fall stops abruptly; one last coin spins on its edge on top of the pile and topples flat.
> CAMERA: locked off.
> LIGHT: hard overhead key slightly behind, coins throwing sharp individual shadows, strong specular flashes on brass.
> PALETTE: black slate, cream paper, warm brass highlights, deep navy #0F1E30 shadows.
> AUDIO: ambient only — metal impacts on stone. No music, no dialogue, no voiceover.
> FINAL FRAME: the paper almost entirely buried under a low mound of coins, only one cream corner visible, nothing moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no readable numbers on the coins, no logos, no watermark, no readable documents, no visible faces, no house numbers, no street signs.

### 03 — Ценник разрывают
**Назначение:** «цена не равна стоимости» · торг, снижение цены
**Масштаб:** макро · **Файл:** `03-prisskilt-rives.mp4`

> SHOT: macro, 85mm, camera level with the object, extremely shallow depth of field, background falling to black.
> SUBJECT: a small blank kraft-paper price tag on a coarse cotton string, hanging still; visible paper grain and a punched eyelet.
> ACTION: 0.0–0.7s — two hands enter fast from both sides and grip the tag on the first frame. 0.7–2.0s — they snap it apart in one violent pull; individual paper fibres stretch and separate in macro detail. 2.0–5.0s — the two halves whip out of frame in opposite directions. 5.0–8.0s — the bare string swings, slowing.
> CAMERA: locked off, focus fixed on the string.
> LIGHT: single hard key from frame left, rim light on the string, background completely dark.
> PALETTE: near-black background, warm kraft paper, one rust-red #C4533F thread woven in the string.
> AUDIO: ambient only — a single sharp paper tear. No music, no dialogue, no voiceover.
> FINAL FRAME: the empty string alone against black, barely swinging, both halves gone.
> NEGATIVE: no text of any kind, no captions, no subtitles, no price numbers, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 04 — Счета сыплются в прорезь двери
**Назначение:** будущие счета · «расходы приходят потом»
**Масштаб:** комната · **Файл:** `04-regninger-i-brevsprakke.mp4`

> SHOT: low angle, 24mm, camera on the floor 40cm from a doormat, looking up at a dark panelled front door from inside a dim hallway.
> SUBJECT: a coarse coir doormat on wide oak boards; a brass letter slot in the door above it; dust visible in the light beam.
> ACTION: 0.0–1.0s — the slot snaps open and a white envelope shoots through, landing hard on the mat. 1.0–5.0s — envelope after envelope fires through, faster and faster, sliding and scattering across the floor toward the lens. 5.0–8.0s — the flap slaps shut; the last envelope skids to a halt in the foreground.
> CAMERA: locked off, wide, slight lens distortion at the edges.
> LIGHT: one hard shaft of daylight through the slot cutting across the dark hallway, everything else in deep shadow.
> PALETTE: near-black interior, cold white paper, warm oak floor, deep navy #0F1E30 walls.
> AUDIO: ambient only — the metal flap and paper hitting the floor. No music, no dialogue, no voiceover.
> FINAL FRAME: a spread of white envelopes covering the mat and the floor around it, slot closed, nothing moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no addresses, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 05 — Бумаги уносит по пустой улице
**Назначение:** масштабный открывающий кадр · «деньги ушли»
**Масштаб:** город · **Файл:** `05-papirer-i-gaden.mp4`

> SHOT: wide low-angle, 28mm, camera 30cm above wet cobblestones, looking down a narrow street of Danish terraced houses in yellow and ochre brick.
> SUBJECT: an empty street at dusk, wet stone reflecting the sky; a scatter of loose cream paper sheets on the ground in the foreground.
> ACTION: 0.0–1.0s — a hard gust sweeps down the street immediately, lifting every sheet at once. 1.0–5.0s — the papers race away from the lens down the street, tumbling and rising between the facades, some spinning up past the rooflines. 5.0–8.0s — the wind drops; the last sheets settle far down the street.
> CAMERA: locked off, deep focus front to back.
> LIGHT: low hard side light from the end of the street, long shadows between houses, wet stone specular.
> PALETTE: deep navy #0F1E30 dusk sky, warm ochre brick, cream paper, one rust-red #C4533F door far down the street.
> AUDIO: ambient only — wind between buildings. No music, no dialogue, no voiceover.
> FINAL FRAME: the empty wet street, papers scattered far in the distance, nothing moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no shop signs, no logos, no watermark, no visible faces, no house numbers, no street name signs, no car number plates.

---

# 2. СКРЫТОЕ ПОД ПОВЕРХНОСТЬЮ

### 06 — Пыль сметают, под ней трещина
**Назначение:** главный сюжет бренда · «выглядело нормально»
**Масштаб:** макро · **Файл:** `06-stoev-og-revne.mp4`

> SHOT: macro, 100mm, camera parallel to the wall at 20cm, raking angle.
> SUBJECT: old lime plaster covered in a fine layer of grey dust, coarse granular surface, tiny sand particles catching the light.
> ACTION: 0.0–0.6s — a bare hand sweeps across the surface fast on the very first frame. 0.6–3.0s — the dust bursts into the air and hangs in the light beam; beneath it a dark hairline crack is revealed running diagonally across the frame. 3.0–8.0s — the hand withdraws; the dust drifts and slowly settles while the crack stays sharp in focus.
> CAMERA: locked off, focus fixed on the plaster.
> LIGHT: single hard raking key from frame left, almost parallel to the wall, making every grain and the crack throw a shadow.
> PALETTE: cool grey plaster, near-black crack, warm cream #E8DED1 dust in the light beam.
> AUDIO: ambient only — a dry scrape. No music, no dialogue, no voiceover.
> FINAL FRAME: the crack sharply lit and fully exposed, dust still hanging in the beam, hand gone.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 07 — Краска отходит, под ней сырость
**Назначение:** влага, скрытые дефекты · красный флаг
**Масштаб:** макро · **Файл:** `07-maling-skaller-af.mp4`

> SHOT: extreme close-up, 100mm macro, camera 15cm from the wall, very shallow depth of field.
> SUBJECT: a painted interior wall in aged off-white, the paint slightly bubbled, one edge already lifting.
> ACTION: 0.0–0.8s — a fingernail catches the lifted edge on the first frame. 0.8–3.5s — a long strip of paint is torn away in one fast pull, curling as it comes; underneath, dark grey-green damp discolouration is exposed, spreading in irregular blooms. 3.5–8.0s — the strip hangs and stops swinging; the damp patch fills the frame.
> CAMERA: very slow push in, 5 percent over the full shot, nothing more.
> LIGHT: hard key from frame right at a steep angle, making the curled paint cast a strong shadow across the damp patch.
> PALETTE: off-white paint, dark damp grey-green, near-black shadow, one rust-red #C4533F stain at the edge of the damp.
> AUDIO: ambient only — a dry crackling peel. No music, no dialogue, no voiceover.
> FINAL FRAME: the torn strip hanging still, the damp patch fully exposed and sharply lit, hand out of frame.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 08 — Штору отдёргивают, вокруг окна пятна
**Назначение:** «посмотрели глазами — не увидели» · осмотр объекта
**Масштаб:** комната · **Файл:** `08-gardin-traekkes-fra.mp4`

> SHOT: medium wide, 35mm, camera at chest height in a dim empty room, facing a single tall window with heavy closed curtains.
> SUBJECT: an unfurnished room, bare wooden floor, pale walls; floor-length curtains in heavy cream linen, completely closed; the room almost black.
> ACTION: 0.0–1.0s — the curtain is ripped aside from frame right on the very first frame. 1.0–4.0s — hard daylight floods in and blows out the exposure for a moment before settling; as it does, dark damp staining and blistered paint around the window reveal becomes visible. 4.0–8.0s — the curtain swings twice and stills; dust turns slowly in the light shaft.
> CAMERA: locked off, no exposure ramp beyond the natural adjustment.
> LIGHT: hard cold daylight from outside as the only source, deep black shadows in the rest of the room.
> PALETTE: near-black room, cold white daylight, warm cream linen, dark grey-green damp stains.
> AUDIO: ambient only — curtain rings on a rail. No music, no dialogue, no voiceover.
> FINAL FRAME: curtain fully open, the window reveal harshly lit with the staining clearly visible, dust drifting in the beam.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no view of house numbers or street signs through the window.

### 09 — Люк в траве вскрывают
**Назначение:** масляный бак, скрытые обязательства
**Масштаб:** предмет · **Файл:** `09-tankdaeksel-i-graesset.mp4`

> SHOT: low close-up, 50mm, camera 15cm above the ground in long grass, late afternoon.
> SUBJECT: overgrown garden grass, dense and slightly dry, blades catching hard low sun; nothing visible beneath.
> ACTION: 0.0–0.8s — a hand sweeps the grass violently aside on the first frame. 0.8–3.0s — a rusted steel tank cap is uncovered, orange corrosion and flaking paint on its surface, sunk slightly into the soil. 3.0–8.0s — the hand withdraws; the grass springs back partway and trembles, but the cap stays exposed.
> CAMERA: locked off, shallow focus resolving onto the cap.
> LIGHT: hard low sun from frame left, long grass shadows striping the cap, strong rim light on the blades.
> PALETTE: dried green and gold grass, rust-orange metal, deep shadow.
> AUDIO: ambient only — grass and a faint metallic ring. No music, no dialogue, no voiceover.
> FINAL FRAME: the rusted cap fully exposed in hard light, grass settled around it, no movement.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 10 — Щиток распахивают
**Назначение:** elinstallationsrapport · электрика
**Масштаб:** предмет · **Файл:** `10-eltavle-aabnes.mp4`

> SHOT: close-up, 35mm, camera square on to a closed electrical panel on a wall, slightly below centre.
> SUBJECT: an old painted metal panel cover, scratched, with a simple latch; the wall around it slightly discoloured.
> ACTION: 0.0–0.7s — the latch flips and the cover is flung open in one fast arc on the first frame. 0.7–3.0s — behind it, a dense tangle of old wiring is revealed, cloth-covered cables in faded colours, dust on every surface. 3.0–8.0s — the cover comes to rest against the wall and stops; one loose wire swings and stills.
> CAMERA: locked off.
> LIGHT: hard key from frame right raking across the open panel, deep shadow inside the box, strong highlight on the swinging cover.
> PALETTE: near-black interior, faded cloth wiring in muted red and ochre, cool grey metal.
> AUDIO: ambient only — a metal latch and hinge. No music, no dialogue, no voiceover.
> FINAL FRAME: panel wide open, wiring lit hard and fully visible, cover motionless.
> NEGATIVE: no text of any kind, no captions, no subtitles, no labels on the panel, no logos, no watermark, no visible faces, no brand markings.

### 11 — Луч фонаря по стропилам чердака
**Назначение:** крыша, самая дорогая находка
**Масштаб:** здание · **Файл:** `11-lygte-paa-spaer.mp4`

> SHOT: wide, 24mm, camera low inside a dark unfinished loft, looking up along the ridge between rough timber rafters.
> SUBJECT: an unlit roof space, old timber rafters and battens, cobwebs, insulation sagging between beams; total darkness beyond the beam.
> ACTION: 0.0–1.0s — a hard torch beam swings into frame from below on the first frame and sweeps fast along the rafters. 1.0–5.0s — the beam travels the length of the ridge, picking out dust in the air and then holding on a dark water stain spreading across the underside of the boards. 5.0–8.0s — the beam stops moving and holds steady on the stain; dust drifts through it.
> CAMERA: locked off; only the light moves.
> LIGHT: a single hard moving torch beam as the only source; everything outside it is pure black.
> PALETTE: pure black, warm timber, cold white beam, dark grey-brown water staining.
> AUDIO: ambient only — faint wind in the roof space. No music, no dialogue, no voiceover.
> FINAL FRAME: the beam locked on the dark stain on the boards, dust turning slowly in the light, nothing else visible.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

---

# 3. ДВА ВАРИАНТА

### 12 — Две двери открываются одновременно
**Назначение:** прямая витрина Sammenlign 3 за 599 kr
**Масштаб:** предмет · **Файл:** `12-to-doere.mp4`

> SHOT: symmetrical wide, 35mm, camera centred and square on to two identical closed doors side by side, equal distance apart.
> SUBJECT: two identical deep navy panelled doors in a plain plastered wall, matching brass handles, no markings of any kind.
> ACTION: 0.0–1.0s — both doors swing open simultaneously on the very first frame, away from camera, at the same speed. 1.0–4.0s — the left opening fills with warm golden light spilling across the floor toward the lens; the right opening stays completely black, no light at all. 4.0–8.0s — both doors come to rest fully open; the contrast between the two openings is total.
> CAMERA: locked off, perfectly centred, no drift.
> LIGHT: warm hard light from deep behind the left door only; the room the camera sits in lit dimly from above.
> PALETTE: deep navy #0F1E30 doors, warm gold #D4975A light left, pure black right, cool grey wall.
> AUDIO: ambient only — two hinges and a soft air movement. No music, no dialogue, no voiceover.
> FINAL FRAME: both doors fully open and motionless, left opening bright and warm, right opening pure black.
> NEGATIVE: no text of any kind, no captions, no subtitles, no numbers on the doors, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 13 — Два ключа под скользящим светом
**Назначение:** «одинаковая цена, разное состояние»
**Масштаб:** макро · **Файл:** `13-to-noegler.mp4`

> SHOT: overhead macro, 100mm, camera 20cm above black slate, both objects in the same focal plane.
> SUBJECT: two keys of identical shape lying parallel, 5cm apart — the left polished brass with mirror-bright edges, the right heavily corroded with orange scale and pitted metal.
> ACTION: 0.0–0.8s — a hard light source begins sweeping across the frame from left on the first frame. 0.8–4.0s — as it crosses the polished key, the metal flares into a bright specular streak; as it crosses the corroded key, nothing happens, the surface stays dead and matte. 4.0–8.0s — the light settles at frame right and holds.
> CAMERA: locked off; only the light moves.
> LIGHT: a single hard directional source sweeping laterally, everything outside its path near-black.
> PALETTE: black slate, warm brass, rust-orange corrosion, deep navy #0F1E30 shadow.
> AUDIO: ambient only, near silence. No music, no dialogue, no voiceover.
> FINAL FRAME: both keys still, the polished one holding a bright highlight, the corroded one flat and dull.
> NEGATIVE: no text of any kind, no captions, no subtitles, no numbers stamped on the keys, no logos, no watermark, no visible faces.

### 14 — Весы срываются в одну сторону
**Назначение:** «что перевесило» · вывод отчёта
**Масштаб:** предмет · **Файл:** `14-vaegt-tipper.mp4`

> SHOT: low angle close-up, 50mm, camera level with the pans, dark background falling to black.
> SUBJECT: a brass balance scale, patinated and heavy; the left pan holding a loose heap of coins, the right pan holding a folded stack of cream paper tied with coarse string.
> ACTION: 0.0–0.6s — the beam breaks its balance on the very first frame and the coin side drops fast. 0.6–3.0s — the pan slams down and bounces, coins jumping and scattering off the edge onto the surface below. 3.0–8.0s — the beam oscillates twice, decreasing, and locks fully tipped.
> CAMERA: locked off.
> LIGHT: hard key from frame left, strong specular on the brass, background completely unlit.
> PALETTE: warm brass, cream paper, black background, one rust-red #C4533F thread on the string.
> AUDIO: ambient only — brass impact and coins on stone. No music, no dialogue, no voiceover.
> FINAL FRAME: scale fully tipped and motionless, several coins scattered on the surface beside it.
> NEGATIVE: no text of any kind, no captions, no subtitles, no readable coin faces, no logos, no watermark, no visible faces.

### 15 — Тень проходит по двум фасадам
**Назначение:** «два дома, одна цена» · кейс
**Масштаб:** здание · **Файл:** `15-skygge-over-to-facader.mp4`

> SHOT: wide static, 35mm, camera square on to the junction of two adjoining house facades filling the frame equally.
> SUBJECT: left — a clean modern facade in dark grey brick with large flush windows; right — an older facade in worn ochre render with small deep-set windows and visible cracking. Both fully lit at the start.
> ACTION: 0.0–1.0s — a hard shadow edge enters from frame left and begins sweeping across at speed. 1.0–5.0s — it swallows the modern facade completely while the old facade blazes in full hard sun, every crack throwing a shadow. 5.0–8.0s — the shadow edge stops at the junction and holds; the two halves are now maximally different.
> CAMERA: locked off, no drift.
> LIGHT: hard directional low sun, no fill, deep black shadow side.
> PALETTE: dark grey brick, warm ochre render, near-black shadow, deep navy #0F1E30 sky.
> AUDIO: ambient only — faint outdoor air. No music, no dialogue, no voiceover.
> FINAL FRAME: left facade in full black shadow, right facade in hard sun, shadow edge exactly on the junction, nothing moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no shop signs, no logos, no watermark, no visible faces, no house numbers, no street name signs.

### 16 — Два одинаковых ряда домов, разный свет
**Назначение:** «выглядят одинаково» · главный тезис скрининга
**Масштаб:** город · **Файл:** `16-to-husraekker.mp4`

> SHOT: elevated wide, 28mm, camera 6 metres up looking down a street where two identical terraced rows face each other.
> SUBJECT: two mirror-image rows of Danish brick terraced houses, same rooflines, same window rhythm, wet asphalt between them reflecting the sky.
> ACTION: 0.0–1.0s — heavy cloud shadow is racing across both rows from the first frame. 1.0–5.0s — the shadow clears the left row and it lights up in hard warm sun while the right row falls into deep cold shade; wet asphalt splits the difference down the middle. 5.0–8.0s — the light stabilises and holds; the two identical rows now read completely differently.
> CAMERA: locked off, deep focus.
> LIGHT: fast-moving hard sunlight through broken cloud, no artificial fill.
> PALETTE: warm red-ochre brick lit, cold blue-grey brick shaded, deep navy #0F1E30 sky, silver wet asphalt.
> AUDIO: ambient only — distant outdoor air. No music, no dialogue, no voiceover.
> FINAL FRAME: left row in warm hard sun, right row in cold deep shade, street empty, nothing moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no shop signs, no logos, no watermark, no visible faces, no house numbers, no street name signs, no car number plates.

---

# 4. ВРЕМЯ И БУДУЩИЕ СЧЕТА

### 17 — Песочные часы на чертеже
**Назначение:** «решение принимается быстро, платишь долго»
**Масштаб:** макро · **Файл:** `17-timeglas-paa-tegning.mp4`

> SHOT: close-up, 85mm, camera level with the object, shallow depth of field.
> SUBJECT: a heavy brass hourglass standing on an unfolded architectural drawing in faded blue line on cream paper, the paper creased along old fold lines.
> ACTION: 0.0–0.8s — the sand is already pouring hard at full rate on the first frame, not starting slowly. 0.8–5.5s — the upper chamber empties visibly and fast, the falling column of sand catching the light, the lower cone building and collapsing on itself. 5.5–8.0s — the last grains fall and stop.
> CAMERA: extremely slow push in, 5 percent total, no more.
> LIGHT: hard backlight from frame right making the falling sand glow, deep shadow on the near side of the brass.
> PALETTE: warm brass, glowing pale sand, cream paper, faded blue line, near-black background.
> AUDIO: ambient only — fine sand falling. No music, no dialogue, no voiceover.
> FINAL FRAME: upper chamber completely empty, sand at rest in the lower chamber, everything still.
> NEGATIVE: no text of any kind, no captions, no subtitles, no readable drawing labels or dimensions, no logos, no watermark, no visible faces, no house numbers.

### 18 — Стопка счетов растёт
**Назначение:** ejerudgift, накопительные расходы
**Масштаб:** предмет · **Файл:** `18-bunken-vokser.mp4`

> SHOT: overhead, 50mm, camera 50cm above a black desk surface, slight angle.
> SUBJECT: a bare black desk, one plain white envelope lying alone in the centre.
> ACTION: 0.0–0.8s — envelopes start slamming down into frame from above immediately, one after another. 0.8–5.5s — the rate accelerates sharply; the pile builds, slides, spreads sideways, envelopes sliding off the top and onto the desk. 5.5–8.0s — the fall stops; the top envelope slides down the side of the pile and comes to rest.
> CAMERA: locked off.
> LIGHT: hard key from frame left, each envelope throwing a distinct hard shadow, background falling to black.
> PALETTE: black desk, cold white paper, deep navy #0F1E30 shadows, one rust-red #C4533F envelope in the pile as accent.
> AUDIO: ambient only — paper impacts. No music, no dialogue, no voiceover.
> FINAL FRAME: a tall spilling pile of envelopes filling the frame, the last one at rest on the desk, nothing moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no addresses, no stamps, no logos, no watermark, no visible faces.

### 19 — Ржавчина расползается по металлу
**Назначение:** отложенный ремонт · «само не пройдёт»
**Масштаб:** макро · **Файл:** `19-rust-breder-sig.mp4`

> SHOT: extreme macro, 100mm, camera 10cm from a flat metal surface, frame filled edge to edge.
> SUBJECT: clean brushed steel with fine directional grain, a few water droplets sitting on it.
> ACTION: 0.0–0.8s — rust blooms outward from a single point on the very first frame. 0.8–5.5s — the corrosion spreads across the surface in accelerated time, branching into the grain, orange scale lifting and flaking at the edges. 5.5–8.0s — the spread stops; the surface is fully corroded and static.
> CAMERA: locked off, focus fixed.
> LIGHT: hard raking key from frame right catching every flake and pit, deep micro-shadows.
> PALETTE: cool steel, saturated rust-orange #C4533F, near-black shadows in the pitting.
> AUDIO: ambient only, near silence. No music, no dialogue, no voiceover.
> FINAL FRAME: the entire surface corroded and flaking, no further change, no movement.
> NEGATIVE: no text of any kind, no captions, no subtitles, no stamped markings, no logos, no watermark, no visible faces.

### 20 — Фасад под сменой погоды
**Назначение:** «дом переживёт несколько зим» · масштабная подводка
**Масштаб:** здание · **Файл:** `20-facade-gennem-vejr.mp4`

> SHOT: wide static, 28mm, camera on the ground looking up slightly at a single Danish brick house facade filling the frame.
> SUBJECT: a plain two-storey red-brick facade with a tiled roof, small windows, a gutter along the eaves; no ornament.
> ACTION: 0.0–1.5s — hard rain is already lashing the facade on the first frame, water sheeting off the tiles and overflowing the gutter. 1.5–4.0s — the rain cuts to driving snow, settling fast on the roof and window ledges. 4.0–6.5s — the snow clears in accelerated time and hard low sun breaks across the brick, meltwater streaming down the wall. 6.5–8.0s — the water slows to a drip and stops.
> CAMERA: locked off, no zoom, deep focus.
> LIGHT: changing with the weather — flat grey in rain, cold blue in snow, hard warm raking sun at the end.
> PALETTE: red-ochre brick, cold blue-grey snow, warm gold #D4975A final light, deep navy #0F1E30 sky.
> AUDIO: ambient only — rain, then wind, then dripping. No music, no dialogue, no voiceover.
> FINAL FRAME: the facade in hard low sun, wet brick, a single drip falling from the gutter, otherwise still.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

---

# 5. РАЗРУШЕНИЕ

### 21 — Вода расплывается по документу
**Назначение:** самый сильный стоп-скролл · любая находка
**Масштаб:** макро · **Файл:** `21-vand-paa-dokument.mp4`

> SHOT: overhead macro, 100mm, camera 20cm above the surface, extremely shallow depth of field.
> SUBJECT: a single sheet of cream 120gsm paper on wet black slate, dense blocks of unreadable printed lines and one dark stamp shape, paper fibres visible.
> ACTION: 0.0–0.6s — a heavy water drop hits the centre of the sheet on the very first frame; the paper darkens instantly around the impact. 0.6–4.5s — the ink bleeds outward in visible tendrils, letters dissolving into grey blooms; three more drops land in quick succession and the wet patches merge. 4.5–8.0s — the spread slows and stops; the paper cockles and lifts slightly at one corner.
> CAMERA: locked off, focus on the impact point.
> LIGHT: hard key from frame right, strong specular sheen on the wet paper, black background.
> PALETTE: cream paper, near-black ink bleeding to grey, black wet slate, deep navy #0F1E30 shadow.
> AUDIO: ambient only — water drops on paper. No music, no dialogue, no voiceover.
> FINAL FRAME: a large soaked patch with the ink dissolved into a dark bloom, the corner curled, no new drops, no movement.
> NEGATIVE: no text of any kind, no readable words or letters, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers.

### 22 — Башня из карт рушится
**Назначение:** «конструкция не держится» · плохая сделка
**Масштаб:** предмет · **Файл:** `22-korthus-falder.mp4`

> SHOT: close-up, 50mm, camera level with the structure on a black surface, shallow depth of field.
> SUBJECT: a three-tier house of cards built from plain unmarked cream cards, standing on polished black stone.
> ACTION: 0.0–0.5s — the base card slips on the very first frame. 0.5–2.5s — the whole structure collapses in one motion, cards fanning outward and sliding across the polished stone in different directions. 2.5–8.0s — the movement decays; one card spins flat on the stone and stops.
> CAMERA: locked off.
> LIGHT: single hard key from frame left, each card throwing a long shadow across the stone, background black.
> PALETTE: cream cards, polished black stone, deep navy #0F1E30 shadows, one rust-red #C4533F card in the collapse.
> AUDIO: ambient only — card slide and impact. No music, no dialogue, no voiceover.
> FINAL FRAME: a flat scatter of cards across the stone, nothing standing, nothing moving.
> NEGATIVE: no text of any kind, no card faces or suits, no captions, no subtitles, no logos, no watermark, no visible faces.

### 23 — Ключ ломается в замке
**Назначение:** «поздно передумывать» · fortrydelse 1%
**Масштаб:** макро · **Файл:** `23-noegle-knaekker.mp4`

> SHOT: extreme macro, 100mm, camera level with the lock cylinder, frame filled by the lock face.
> SUBJECT: an old brass lock cylinder set in a dark painted door, worn scratches around the keyway, a plain brass key inserted.
> ACTION: 0.0–0.8s — the key begins turning under force on the first frame, the metal visibly straining. 0.8–2.5s — it resists, twists, and snaps — the head comes away in the hand and moves out of frame, the broken shaft staying in the cylinder. 2.5–8.0s — the hand withdraws completely; the broken end sits motionless in the keyway.
> CAMERA: locked off, focus fixed on the keyway.
> LIGHT: hard key from frame right, strong specular on the brass, deep black around the door.
> PALETTE: warm brass, near-black door, cool metal fracture surface, deep navy #0F1E30 shadow.
> AUDIO: ambient only — metal strain and a sharp snap. No music, no dialogue, no voiceover.
> FINAL FRAME: the broken shaft alone in the lock, freshly fractured metal catching the light, no hand, no movement.
> NEGATIVE: no text of any kind, no captions, no subtitles, no brand stamps on the lock, no logos, no watermark, no visible faces, no house numbers.

### 24 — Потолок протекает в комнате
**Назначение:** крыша · самая дорогая находка, масштабный кадр
**Масштаб:** комната · **Файл:** `24-utaethed-i-loftet.mp4`

> SHOT: wide low angle, 24mm, camera on the floor of an empty room looking up at the ceiling and one corner of the wall.
> SUBJECT: an unfurnished room with bare boards and pale walls; a dark irregular damp patch spreading across the plaster ceiling, the plaster visibly sagging at its centre.
> ACTION: 0.0–1.0s — a drop is already falling toward the lens on the first frame and hits the floor with a visible splash. 1.0–4.5s — the patch darkens and widens; drops fall faster from three separate points, splashing on the bare boards below. 4.5–8.0s — a fragment of wet plaster detaches and falls; the drips continue steadily.
> CAMERA: locked off, wide, slight distortion at frame edges.
> LIGHT: one hard shaft of cold daylight from a window out of frame, cutting across the ceiling and making the wet plaster shine; the rest in deep shadow.
> PALETTE: pale plaster, dark grey-brown damp, warm bare boards, deep navy #0F1E30 shadow.
> AUDIO: ambient only — water dripping onto wood. No music, no dialogue, no voiceover.
> FINAL FRAME: a wet dark patch on the ceiling, a fallen plaster fragment on the floor, one drop caught mid-fall.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

### 25 — Ливень по окну изнутри тёмной комнаты
**Назначение:** атмосферный стоп-скролл · открывающий кадр рилса
**Масштаб:** комната · **Файл:** `25-regn-paa-ruden.mp4`

> SHOT: medium, 50mm, camera inside a completely dark room 1 metre from a large window, focus on the glass surface.
> SUBJECT: a bare window pane, no curtains; outside, an out-of-focus street at dusk reduced to soft dark shapes and one warm light source.
> ACTION: 0.0–1.0s — heavy rain is already hammering the glass on the first frame, droplets bursting on impact. 1.0–5.0s — the water builds into fast running rivulets racing down the pane, merging and accelerating; the outside light refracts and breaks in each stream. 5.0–8.0s — the downpour eases slightly; the rivulets slow but keep running.
> CAMERA: locked off, focus locked on the glass, background permanently out of focus.
> LIGHT: only the single warm out-of-focus light outside, refracting through the water; the room interior pure black.
> PALETTE: pure black interior, cold blue-grey water, one warm gold #D4975A refracted light source.
> AUDIO: ambient only — rain on glass. No music, no dialogue, no voiceover.
> FINAL FRAME: rivulets still running down the pane, the warm light broken across them, room black.
> NEGATIVE: no text of any kind, no captions, no subtitles, no readable signs outside, no logos, no watermark, no visible faces, no house numbers, no car number plates.

### 26 — Вода хлещет через жёлоб по фасаду
**Назначение:** дренаж, водоотвод · масштабная находка
**Масштаб:** здание · **Файл:** `26-tagrende-loeber-over.mp4`

> SHOT: low wide, 28mm, camera on wet ground looking steeply up at the eaves of a brick house.
> SUBJECT: a blocked cast-iron gutter along the eaves, already brimming; red-brick wall below it with a dark vertical damp streak.
> ACTION: 0.0–1.0s — water is already pouring over the gutter lip in a continuous sheet on the first frame. 1.0–5.0s — the flow increases, sheeting straight down the brick face toward the lens, splashing hard off a stone sill halfway down. 5.0–8.0s — the flow thins to heavy dripping; the wet damp streak on the brick is now much wider and darker.
> CAMERA: locked off, wide, deep focus.
> LIGHT: flat hard overcast daylight, strong specular on all wet surfaces, no warm light anywhere.
> PALETTE: red-ochre brick darkened by water, cold grey sky, near-black wet stone, silver water.
> AUDIO: ambient only — running and splashing water. No music, no dialogue, no voiceover.
> FINAL FRAME: gutter dripping heavily, a wide dark wet streak down the brick, water pooling on the ground.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no street signs.

---

# 6. РАЗРЕШЕНИЕ И ЗЕЛЁНЫЙ ФЛАГ

Эти шесть идут **в конец рилса**, под CTA. Движение здесь спокойнее намеренно.

### 27 — Галочки проставляются по полю
**Назначение:** проверка пройдена · финал с ценой
**Масштаб:** макро · **Файл:** `27-fluebentegn.mp4`

> SHOT: overhead macro, 85mm, camera 25cm above the page at a slight angle.
> SUBJECT: the wide margin of a cream paper document, ruled faint lines, no readable text; a fountain pen nib entering from frame right.
> ACTION: 0.0–0.6s — the first checkmark is struck on the very first frame, ink flowing wet into the paper. 0.6–5.0s — five more marks are struck down the margin at a steady confident pace, each one slightly bleeding into the fibres. 5.0–8.0s — the pen lifts and leaves frame; the wet ink catches the light and begins to dull as it dries.
> CAMERA: locked off.
> LIGHT: soft-hard key from frame left, strong sheen on the wet ink, gentle shadow in the paper texture.
> PALETTE: cream #E8DED1 paper, deep navy #0F1E30 ink, warm gold #D4975A highlight on the nib.
> AUDIO: ambient only — nib on paper. No music, no dialogue, no voiceover.
> FINAL FRAME: a clean vertical column of six checkmarks in the margin, pen gone, ink settling, nothing moving.
> NEGATIVE: no text of any kind, no letters, no words, no captions, no subtitles, no logos, no watermark, no visible faces.

### 28 — Папка закрывается
**Назначение:** отчёт готов · закрытие темы
**Масштаб:** предмет · **Файл:** `28-mappen-lukkes.mp4`

> SHOT: close-up, 50mm, camera at a low three-quarter angle to a dark wooden desk.
> SUBJECT: a loose stack of cream paper on a kraft-card folder, edges uneven; hands entering from frame right.
> ACTION: 0.0–0.8s — the hands square the stack with one sharp tap against the desk on the first frame. 0.8–3.5s — the kraft cover is folded over the stack in one continuous motion and pressed flat with the palm. 3.5–8.0s — the hands withdraw fully out of frame; the folder sits closed and completely still.
> CAMERA: very slow push in, 5 percent total.
> LIGHT: warm hard key from frame left, long shadow of the folder across the desk, background dropping to black.
> PALETTE: warm kraft brown, cream #E8DED1 paper edges, dark oak desk, deep navy #0F1E30 shadow.
> AUDIO: ambient only — paper tap and a soft fold. No music, no dialogue, no voiceover.
> FINAL FRAME: the closed folder alone on the desk, edges square, no hands, no movement.
> NEGATIVE: no text of any kind, no captions, no subtitles, no labels on the folder, no logos, no watermark, no visible faces.

### 29 — Ключ вешают на крючок
**Назначение:** сделка закрыта · спокойный финал
**Масштаб:** макро · **Файл:** `29-noeglen-paa-krogen.mp4`

> SHOT: close-up, 85mm, camera level with a wooden wall hook, shallow depth of field.
> SUBJECT: a simple brass hook screwed into an oak board, wood grain visible; a plain brass key on a leather fob entering from above.
> ACTION: 0.0–0.8s — the key is placed onto the hook on the first frame and released. 0.8–4.0s — it swings twice, each arc smaller than the last, the leather fob turning slowly. 4.0–8.0s — the movement stops completely; the key hangs still.
> CAMERA: locked off.
> LIGHT: warm hard key from frame right, strong specular on the brass, background falling to near-black.
> PALETTE: warm oak, brass, rust-red #C4533F leather fob, deep navy #0F1E30 background.
> AUDIO: ambient only — a small metal contact. No music, no dialogue, no voiceover.
> FINAL FRAME: the key hanging motionless on the hook, one bright specular highlight on the brass.
> NEGATIVE: no text of any kind, no captions, no subtitles, no numbers on the fob, no logos, no watermark, no visible faces.

### 30 — Дверь открывается в свет
**Назначение:** самый сильный финальный кадр под CTA
**Масштаб:** здание · **Файл:** `30-doeren-aabner.mp4`

> SHOT: static wide, 35mm, camera outside at chest height, square on to a closed front door at the top of two stone steps.
> SUBJECT: a deep navy panelled front door in a brick facade, brass handle, a thin blade of warm light already visible at its edge; stone steps worn smooth.
> ACTION: 0.0–1.0s — the door begins swinging open away from camera on the very first frame, one continuous arc. 1.0–5.0s — warm interior light widens across the threshold and spills down the stone steps toward the lens, the brick around the doorway catching the glow. 5.0–8.0s — the door reaches full open and stops; the light steadies and holds.
> CAMERA: locked off, no zoom, no drift.
> LIGHT: warm hard interior light as the door opens, cool overcast daylight outside, strong contrast between the two.
> PALETTE: deep navy #0F1E30 door, red-ochre brick, warm gold #D4975A interior light, cool grey stone.
> AUDIO: ambient only — one hinge and outdoor air. No music, no dialogue, no voiceover.
> FINAL FRAME: door fully open and motionless, warm light steady across the threshold and steps, nothing else moving.
> NEGATIVE: no text of any kind, no captions, no subtitles, no logos, no watermark, no visible faces, no house numbers, no nameplates, no street signs.

### 31 — Фигура у окна в пустой комнате
**Назначение:** эмоция и масштаб · «это твой дом»
**Масштаб:** комната · **Файл:** `31-figur-ved-vinduet.mp4`

> SHOT: wide, 35mm, camera at the far end of an empty room, subject small in frame at the far window.
> SUBJECT: an unfurnished room with bare boards and pale walls; a single person standing at the window **seen only from behind**, dark coat, unlit, reduced almost to a silhouette against the bright glass.
> ACTION: 0.0–1.0s — the figure walks into frame from the left and crosses toward the window on the first frame. 1.0–5.0s — they reach the glass and stop, one hand rising to rest against the frame; dust turns in the shaft of light around them. 5.0–8.0s — they stay completely still, facing away; only the dust moves.
> CAMERA: extremely slow push in, 5 percent total.
> LIGHT: hard cold daylight from the window as the only source, the figure fully backlit and dark, the room falling to black at the edges.
> PALETTE: cold white daylight, near-black silhouette, pale grey walls, warm bare boards.
> AUDIO: ambient only — footsteps on bare boards, then silence. No music, no dialogue, no voiceover.
> FINAL FRAME: the figure standing motionless at the window seen from behind, hand on the frame, dust drifting in the light.
> NEGATIVE: no text of any kind, no captions, no subtitles, no visible face, no profile, no reflection of a face in the glass, no logos, no watermark, no house numbers, no street signs visible outside.

### 32 — Окна загораются над крышами
**Назначение:** финальный кадр серии · бренд-концовка
**Масштаб:** город · **Файл:** `32-lys-over-tagene.mp4`

> SHOT: elevated wide, 35mm, camera above roof height looking across a Danish town skyline at dusk.
> SUBJECT: rows of tiled rooftops, chimneys and dormers receding into distance, all windows dark; a deep blue sky with the last light at the horizon.
> ACTION: 0.0–1.0s — one window in the near distance lights up warm on the first frame. 1.0–5.5s — windows light up one after another across the frame, near then far, the rhythm building until a dozen are glowing. 5.5–8.0s — the last one lights; everything holds steady.
> CAMERA: extremely slow lateral drift to the right, 3 percent of frame width over the shot.
> LIGHT: fading natural dusk plus the warm practical window lights; no artificial fill.
> PALETTE: deep navy #0F1E30 sky, near-black rooftops, warm gold #D4975A window light.
> AUDIO: ambient only — faint distant town air. No music, no dialogue, no voiceover.
> FINAL FRAME: a dozen warm lit windows scattered across dark rooftops, sky unchanged, drift stopped.
> NEGATIVE: no text of any kind, no captions, no subtitles, no illuminated signs, no logos, no watermark, no visible faces, no house numbers, no street signs.

---

## Пары «до/после» — если гонишь через «Кадры»

Режим Кадры (Veo 3.1 Lite, те же 10 кредитов) даёт точный контроль над началом и
концом. Требует двух картинок на клип, сгенерированных отдельно. Эти шесть —
самые выигрышные кандидаты:

| Клип | Первый кадр | Последний кадр |
|---|---|---|
| 06 | пыльная штукатурка, ровная поверхность | та же стена, пыль убрана, трещина открыта |
| 07 | целая крашеная стена | сорванная полоса краски, тёмное пятно сырости |
| 19 | чистая брашированная сталь | та же поверхность, полностью в ржавчине |
| 21 | сухой документ на сланце | тот же документ, чернила расплылись |
| 22 | башня из карт стоит | те же карты плашмя на камне |
| 30 | закрытая дверь, полоска света | дверь открыта, свет на ступенях |

**Критично:** оба кадра — одна сцена в двух состояниях. Та же камера, тот же
свет, изменился только объект. Разные сцены Veo не соединит, а сморфит.

---

## Как собирается рилс

1. **0,0–0,8 сек** — клип из §5 (разрушение). Без подводки.
2. **0,8–4 сек** — 2–3 куска из §2 или §4, резы на движении.
3. **4–6 сек** — конфликт из §3. Здесь ложится главный тезис.
4. **6–8 сек** — один клип из §6 + CTA с ценой.

Крупный масштаб (05, 08, 11, 15, 16, 20, 24, 25, 26, 30, 31, 32) — на открытие и
финал. Макро — в середину. Подряд два макро не ставить, глаз устаёт.
