# 32 клипа — START / END / ВИДЕО

> **Рабочая версия — `video/veo-broll-32.html`.** Там те же 32 клипа, но хвосты
> уже вклеены в каждый из 96 промптов: копируешь блок целиком, ничего не
> дописываешь. Этот markdown остаётся исходником для правок.

**Дата:** 31 июля 2026
**Баланс:** 410 кредитов · **Кадры (Veo 3.1 Lite) = 10 кредитов**
**План:** 32 клипа × 10 = 320, буфер 90 = 9 перегенераций
**Формат:** 9:16, 8 сек, **без текста в кадре**

---

## Как это работает — прочитай один раз

На каждый клип три промпта:

1. **① START** — стартовый кадр. Генеришь **4 штуки**, выбираешь лучший.
2. **② END** — финальный кадр. **Не генерится с нуля.** Это правка выбранного
   старта: «возьми эту картинку и измени только вот это».
3. **③ ВИДЕО** — режим **Кадры**, подставляешь оба и промпт движения.

### Почему END именно правкой, а не отдельной генерацией

Если сгенерить 4 старта и 4 финала независимо, они между собой **не совпадут**:
другая композиция, другой угол, предметы в других местах. Veo такую пару не
соединяет — он её **морфит**, и получается то самое «бред какой-то».

Пара должна быть **одной сценой в двух состояниях**. Единственный надёжный способ
это получить — взять выбранный старт и изменить в нём ровно одну вещь.

> В Nano Banana Pro / Gemini: загружаешь выбранный START и даёшь промпт ②.
> Если правка недоступна — генери END с промптом ①, дописав к нему изменение
> из ②. Совпадение будет хуже, но работать будет.

### Порядок работы на один клип

```
①  4 генерации START      →  выбрал 1
②  правка выбранного      →  END
③  Кадры: START + END + промпт  →  10 кредитов
```

---

## ХВОСТ И — дописывать в конец каждого промпта картинки (① и ②)

> Photorealistic, editorial still, shot on 50mm, shallow depth of field,
> 9:16 vertical. Hard directional key light from one side, deep near-black
> shadows, strong specular highlights. Palette: near-black navy #0F1E30
> background, warm cream #E8DED1, one saturated rust-red #C4533F accent.
> High contrast, not flat, not evenly lit.
> No text anywhere in frame, no captions, no letters, no numbers, no logos,
> no watermark, no readable documents, no visible faces, no house numbers,
> no street signs.

## ХВОСТ В — дописывать в конец каждого промпта видео (③)

> Camera behaviour exactly as stated, no additional camera move. Motion starts
> on the very first frame — no static intro, no slow build-up. The scene, the
> framing and the lighting stay identical to the two supplied frames.
> AUDIO: ambient only. No music, no dialogue, no voiceover.
> No text appears at any point, no captions, no subtitles, no logos,
> no watermark, no visible faces.

---

## Порядок генерации

Если кредиты кончатся раньше, эти 12 закрывают самые частые тезисы:
`01 · 02 · 06 · 07 · 12 · 13 · 21 · 23 · 25 · 27 · 30 · 32`

## Приёмка

**Перегенерировать:** появился текст · видно лицо · шесть пальцев в фокусе ·
событие позже 2-й секунды · камера уехала · финал не тот.
**Оставить:** чуть другой цвет · движение медленнее · форма не идеальная.
На скорости 1,5 сек на кадр это не видно.

---

# 1. ЦЕНА ОШИБКИ

## 01 — Купюры сдувает со стола
**Назначение:** 299 kr против 30 000 kr · **Масштаб:** предмет · `01-sedler-blaeser-vaek`

**① START** — генерь 4
> Overhead top-down photograph, camera 60cm above a matte near-black oak table.
> A small unpainted birch house model, 12cm tall, sharp roof edges, stands in the
> centre. Beside it lies a neat fan of twenty crisp paper banknotes in warm cream
> paper with visible fibre texture, laid in a tidy overlapping arc, perfectly
> still. Everything is calm and ordered. **+ ХВОСТ И**

**② END** — правка выбранного старта
> Use this exact image. Change only this: the fan of banknotes is gone — only two
> banknotes remain, lying flat and separated near the edge of the frame, slightly
> askew. The table surface where the fan used to be is now bare.
> Keep identical: camera angle, framing, lens, the house model and its exact
> position, lighting direction, shadows, colour and table texture.

**③ ВИДЕО**
> A violent gust of wind hits from frame left on the first frame. The banknotes
> lift, tumble and spin out of frame, several whipping close past the lens in
> motion blur. The birch house model does not move at any point. The wind dies
> and the last two notes settle flat. Camera locked off. **+ ХВОСТ В**

---

## 02 — Монеты засыпают документ
**Назначение:** скрытые расходы · **Масштаб:** макро · `02-mynter-begraver-dokument`

**① START**
> Tight overhead macro photograph, camera 30cm above black slate, shallow depth of
> field. A single sheet of heavy cream 120gsm paper lies flat and clean on the
> slate, one soft crease across it, edges slightly raised. The surface is
> completely bare apart from the sheet. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the sheet is now almost entirely buried
> under a low mound of brass and steel coins, with just one cream corner of the
> paper still visible at the edge of the pile.
> Keep identical: camera angle, height, framing, lens, lighting direction, the
> slate surface and its texture, the position of the sheet underneath.

**③ ВИДЕО**
> Coins hammer down into frame from above immediately on the first frame, striking
> the paper and bouncing. The stream thickens into a continuous fall of coins,
> ringing and sliding, piling over the sheet. The fall stops abruptly and one last
> coin spins on its edge and topples flat. Camera locked off. **+ ХВОСТ В**

---

## 03 — Ценник разрывают
**Назначение:** цена не равна стоимости · **Масштаб:** макро · `03-prisskilt-rives`

**① START**
> Macro photograph, camera level with the subject, extremely shallow depth of
> field, background falling to pure black. A small blank kraft-paper price tag
> hangs completely still on a coarse cotton string with one rust-red thread woven
> through it. Visible paper grain and a punched metal eyelet. The tag is intact.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the kraft tag is gone entirely — the
> bare cotton string hangs alone against the black background, with a few torn
> paper fibres still caught in the eyelet loop.
> Keep identical: camera angle, framing, lens, focus distance, the string and its
> exact position, lighting direction, background darkness.

**③ ВИДЕО**
> Two hands enter fast from both sides and grip the tag on the first frame, then
> snap it apart in one violent pull. Paper fibres stretch and separate in macro
> detail. The two halves whip out of frame in opposite directions and the hands
> follow. The bare string swings and slows to a stop. Camera locked off, focus
> fixed on the string. **+ ХВОСТ В**

---

## 04 — Счета сыплются в прорезь двери
**Назначение:** будущие счета · **Масштаб:** комната · `04-regninger-i-brevsprakke`

**① START**
> Low angle photograph, wide 24mm, camera resting on the floor 40cm from a coarse
> coir doormat, looking up at a dark panelled front door from inside a dim
> hallway. A brass letter slot sits in the door above the mat. Wide oak boards,
> dust visible in a hard shaft of daylight cutting through the slot. The mat and
> floor are completely empty. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: white envelopes now cover the doormat
> and are scattered across the oak boards around it, one lying in the immediate
> foreground close to the lens. The letter slot flap is closed.
> Keep identical: camera position and angle, framing, lens distortion, the door,
> the mat, the light shaft and its direction, the floor texture.

**③ ВИДЕО**
> The letter slot snaps open on the first frame and a white envelope shoots
> through, landing hard on the mat. Envelope after envelope fires through, faster
> and faster, sliding and scattering across the floor toward the lens. The flap
> slaps shut and the last envelope skids to a halt in the foreground. Camera
> locked off. **+ ХВОСТ В**

---

## 05 — Бумаги уносит по пустой улице
**Назначение:** масштабное открытие · **Масштаб:** город · `05-papirer-i-gaden`

**① START**
> Wide low-angle photograph, 28mm, camera 30cm above wet cobblestones, looking
> down a narrow street of Danish terraced houses in yellow and ochre brick at
> dusk. Wet stone reflects the sky. A scatter of loose cream paper sheets lies
> still on the ground in the immediate foreground. One rust-red door far down the
> street. Deep focus front to back. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the foreground is now bare wet
> cobblestone — the paper sheets are gone from the foreground and appear instead
> as small scattered specks far down the street near the vanishing point.
> Keep identical: camera position and height, framing, the houses and their brick
> colour, the wet stone reflections, the rust-red door, light direction, dusk sky.

**③ ВИДЕО**
> A hard gust sweeps down the street on the first frame and lifts every sheet at
> once. The papers race away from the lens down the street, tumbling and rising
> between the facades, some spinning up past the rooflines. The wind drops and the
> last sheets settle far in the distance. Camera locked off, deep focus.
> **+ ХВОСТ В**

---

# 2. СКРЫТОЕ ПОД ПОВЕРХНОСТЬЮ

## 06 — Пыль сметают, под ней трещина
**Назначение:** главный сюжет бренда · **Масштаб:** макро · `06-stoev-og-revne`

**① START**
> Macro photograph, camera parallel to the wall at 20cm, raking angle. Old lime
> plaster covered in an even layer of fine grey dust, coarse granular surface,
> tiny sand particles catching a hard low light. The surface looks uniform and
> undamaged — no crack is visible anywhere. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: a section of the dust is wiped clean in
> a single broad stroke across the middle of the frame, and a dark hairline crack
> is now clearly visible running diagonally through the cleaned area. Fine dust
> hangs in the light beam above the surface.
> Keep identical: camera angle, distance, framing, the plaster texture, lighting
> direction and hardness, the dusty areas outside the wiped stroke.

**③ ВИДЕО**
> A bare hand sweeps across the plaster fast on the very first frame. Dust bursts
> into the air and hangs in the raking light beam. Beneath the wiped stroke a dark
> hairline crack is revealed running diagonally. The hand withdraws out of frame
> and the dust drifts and slowly settles while the crack stays sharp. Camera
> locked off, focus fixed on the plaster. **+ ХВОСТ В**

---

## 07 — Краска отходит, под ней сырость
**Назначение:** влага, красный флаг · **Масштаб:** макро · `07-maling-skaller-af`

**① START**
> Extreme close-up photograph, camera 15cm from an interior wall, very shallow
> depth of field. Aged off-white painted surface, slightly bubbled in places, with
> one small edge of paint just beginning to lift at the centre of the frame. The
> paint is otherwise intact and the wall reads as normal. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: a long strip of paint has been torn away
> from that lifted edge and now hangs curled and still to one side, exposing dark
> grey-green damp discolouration underneath in irregular blooms, with one
> rust-red stain at the edge of the damp.
> Keep identical: camera angle, distance, framing, depth of field, lighting
> direction and hardness, the untouched painted areas around the torn strip.

**③ ВИДЕО**
> A fingernail catches the lifted edge on the first frame and tears a long strip
> of paint away in one fast pull, the strip curling as it comes. Dark damp
> discolouration is exposed underneath, spreading across the frame. The hand
> leaves and the torn strip swings once and stops. Camera pushes in extremely
> slowly, 5 percent over the whole shot, nothing more. **+ ХВОСТ В**

---

## 08 — Штору отдёргивают, вокруг окна пятна
**Назначение:** осмотр объекта · **Масштаб:** комната · `08-gardin-traekkes-fra`

**① START**
> Medium wide photograph, 35mm, camera at chest height in a dim empty room facing
> a single tall window with heavy cream linen curtains, fully closed. Bare wooden
> floor, pale walls, no furniture. The room is almost black, lit only by a faint
> glow leaking around the curtain edges. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the curtain is pulled fully open to
> frame right, hard cold daylight floods the room, and dark damp staining with
> blistered paint is now clearly visible around the window reveal. Dust turns in
> the light shaft.
> Keep identical: camera position and height, framing, the room, the floor boards,
> the wall colour, the curtain fabric and rail.

**③ ВИДЕО**
> The curtain is ripped aside from frame right on the very first frame. Hard cold
> daylight floods in, briefly blowing out the exposure before it settles, and as
> it does the damp staining around the window reveal becomes visible. The curtain
> swings twice and stills. Dust turns slowly in the light shaft. Camera locked
> off. **+ ХВОСТ В**

---

## 09 — Люк в траве вскрывают
**Назначение:** масляный бак · **Масштаб:** предмет · `09-tankdaeksel-i-graesset`

**① START**
> Low close-up photograph, camera 15cm above the ground in long overgrown garden
> grass, hard low afternoon sun from frame left, strong rim light on the blades.
> The grass is dense and slightly dry and completely covers the ground — nothing
> man-made is visible at all. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the grass in the centre is swept aside
> and a rusted steel tank cap is fully exposed, orange corrosion and flaking paint
> on its surface, sunk slightly into the soil, with long grass shadows striping
> across it.
> Keep identical: camera height and angle, framing, depth of field, the sun
> direction and hardness, the grass colour and texture around the cleared area.

**③ ВИДЕО**
> A hand sweeps the grass violently aside on the first frame, uncovering a rusted
> steel tank cap sunk into the soil. The hand withdraws and the grass springs back
> partway and trembles, but the cap stays exposed in hard light. Camera locked
> off, shallow focus resolving onto the cap. **+ ХВОСТ В**

---

## 10 — Щиток распахивают
**Назначение:** elinstallationsrapport · **Масштаб:** предмет · `10-eltavle-aabnes`

**① START**
> Close-up photograph, 35mm, camera square on to a closed electrical panel on a
> wall, slightly below centre. An old painted metal cover, scratched and dented,
> with a simple latch. The wall around it is slightly discoloured. The panel is
> completely shut, nothing inside is visible. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the cover is flung wide open and resting
> against the wall to one side, revealing a dense tangle of old cloth-covered
> wiring in faded muted red and ochre inside the box, dust on every surface, deep
> shadow behind the cables.
> Keep identical: camera angle, framing, the wall, the panel housing and its
> position, lighting direction and hardness.

**③ ВИДЕО**
> The latch flips and the cover is flung open in one fast arc on the very first
> frame, revealing a dense tangle of old wiring inside. The cover swings to rest
> against the wall and stops. One loose wire swings and stills. The hand leaves
> frame. Camera locked off. **+ ХВОСТ В**

---

## 11 — Луч фонаря по стропилам чердака
**Назначение:** крыша · **Масштаб:** здание · `11-lygte-paa-spaer`

**① START**
> Wide photograph, 24mm, camera low inside a dark unfinished loft looking up along
> the ridge between rough timber rafters. Cobwebs, sagging insulation between
> beams. A hard torch beam enters from below at frame bottom and lights only the
> nearest rafters; everything beyond is pure black. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the torch beam has travelled up the
> ridge and now holds steady on a dark water stain spreading across the underside
> of the roof boards further along, lighting it clearly. Dust turns in the beam.
> The nearest rafters are now unlit and dark.
> Keep identical: camera position and angle, framing, lens, the rafters, the
> timber colour, the total blackness outside the beam.

**③ ВИДЕО**
> A hard torch beam swings into frame from below on the first frame and sweeps
> fast along the rafters, picking out dust in the air. The beam travels the length
> of the ridge and stops on a dark water stain spreading across the underside of
> the boards, holding steady on it. Only the light moves — camera locked off.
> **+ ХВОСТ В**

---

# 3. ДВА ВАРИАНТА

## 12 — Две двери открываются одновременно
**Назначение:** витрина Sammenlign 3 · **Масштаб:** предмет · `12-to-doere`

**① START**
> Symmetrical wide photograph, 35mm, camera centred and perfectly square on to two
> identical closed deep navy panelled doors side by side in a plain plastered
> wall, equal distance apart, matching brass handles, no markings of any kind.
> Both doors are fully shut. The room is lit dimly and evenly from above.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: both doors now stand fully open, swung
> away from camera. The left opening is filled with warm golden light spilling
> across the floor toward the lens; the right opening is completely black with no
> light at all.
> Keep identical: camera position, centring, framing, the wall, the two door
> frames and their exact spacing, the floor.

**③ ВИДЕО**
> Both doors swing open simultaneously on the very first frame, away from camera,
> at exactly the same speed. Warm golden light floods out of the left opening and
> spreads across the floor toward the lens while the right opening stays pure
> black. Both doors come to rest fully open. Camera locked off, perfectly centred,
> no drift. **+ ХВОСТ В**

---

## 13 — Два ключа под скользящим светом
**Назначение:** одинаковая цена, разное состояние · **Масштаб:** макро · `13-to-noegler`

**① START**
> Overhead macro photograph, camera 20cm above black slate, both subjects in the
> same focal plane. Two keys of identical shape lie parallel 5cm apart — the left
> one polished brass with mirror-bright edges, the right one heavily corroded with
> orange scale and pitted metal. A hard directional light sits at frame left, so
> the left side of the frame is bright and the right falls into shadow.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the hard light has moved to frame right
> — the corroded key is now directly lit but stays dull and matte with no
> highlight, while the polished key holds one bright specular streak along its
> edge.
> Keep identical: camera height and angle, framing, both keys and their exact
> positions and rotation, the slate surface, the focal plane.

**③ ВИДЕО**
> A hard directional light sweeps across the frame from left to right starting on
> the very first frame. As it crosses the polished key the metal flares into a
> bright specular streak; as it crosses the corroded key nothing happens and the
> surface stays dead and matte. The light settles at frame right and holds. Only
> the light moves — camera locked off, keys completely still. **+ ХВОСТ В**

---

## 14 — Весы срываются в одну сторону
**Назначение:** что перевесило · **Масштаб:** предмет · `14-vaegt-tipper`

**① START**
> Low angle close-up photograph, camera level with the pans, background falling to
> pure black. A patinated brass balance scale stands in perfect balance, beam
> horizontal. The left pan holds a loose heap of coins, the right pan holds a
> folded stack of cream paper tied with coarse string with one rust-red thread.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the scale is now fully tipped with the
> coin pan slammed down at the bottom and the paper pan raised high, the beam at a
> steep angle. Several coins have scattered off the low pan onto the surface
> below.
> Keep identical: camera angle and height, framing, the scale, the brass patina,
> the paper stack and its string, lighting direction, black background.

**③ ВИДЕО**
> The beam breaks its balance on the very first frame and the coin side drops
> fast. The pan slams down and bounces, coins jumping and scattering off the edge
> onto the surface below. The beam oscillates twice, decreasing, and locks fully
> tipped. Camera locked off. **+ ХВОСТ В**

---

## 15 — Тень проходит по двум фасадам
**Назначение:** два дома, одна цена · **Масштаб:** здание · `15-skygge-over-to-facader`

**① START**
> Wide static photograph, 35mm, camera square on to the junction of two adjoining
> house facades filling the frame equally. Left: a clean modern facade in dark
> grey brick with large flush windows. Right: an older facade in worn ochre render
> with small deep-set windows and visible cracking. Both facades are fully lit by
> hard low sun, no shadow anywhere. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the left modern facade is now completely
> swallowed in deep black shadow, while the right old facade blazes in full hard
> sun with every crack throwing its own shadow. The shadow edge falls exactly on
> the junction between the two.
> Keep identical: camera position, framing, both facades and every architectural
> detail, the sky, the sun direction.

**③ ВИДЕО**
> A hard shadow edge enters from frame left on the first frame and sweeps across
> at speed. It swallows the modern facade completely while the old facade blazes
> in hard sun. The shadow edge stops exactly at the junction between the two
> facades and holds. Camera locked off, no drift. **+ ХВОСТ В**

---

## 16 — Два одинаковых ряда домов, разный свет
**Назначение:** выглядят одинаково · **Масштаб:** город · `16-to-husraekker`

**① START**
> Elevated wide photograph, 28mm, camera 6 metres up looking down a street where
> two mirror-image rows of Danish brick terraced houses face each other — same
> rooflines, same window rhythm. Wet asphalt between them reflects the sky. Heavy
> cloud shadow covers both rows equally, flat and cold. Deep focus. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the left row is now lit by hard warm
> sun, its brick reading red-ochre, while the right row has fallen into deep cold
> blue-grey shade. The wet asphalt down the middle splits the two lighting
> conditions.
> Keep identical: camera position and height, framing, both rows and every
> architectural detail, the street, the sky, the empty road.

**③ ВИДЕО**
> Heavy cloud shadow is racing across both rows from the very first frame. The
> shadow clears the left row and it lights up in hard warm sun while the right row
> falls into deep cold shade. The wet asphalt splits the difference down the
> middle. The light stabilises and holds. Camera locked off, deep focus, street
> empty throughout. **+ ХВОСТ В**

---

# 4. ВРЕМЯ И БУДУЩИЕ СЧЕТА

## 17 — Песочные часы на чертеже
**Назначение:** решаешь быстро, платишь долго · **Масштаб:** макро · `17-timeglas-paa-tegning`

**① START**
> Close-up photograph, camera level with the subject, shallow depth of field. A
> heavy brass hourglass stands on an unfolded architectural drawing in faded blue
> line on cream paper, creased along old fold lines. The upper chamber is
> completely full of pale sand, the lower chamber empty. Hard backlight from frame
> right makes the brass glow at its edges. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the upper chamber is now completely
> empty and all the sand has settled into a smooth cone in the lower chamber.
> Keep identical: camera angle and distance, framing, depth of field, the brass
> hourglass and its exact position, the drawing beneath it and its fold lines,
> the backlight direction.

**③ ВИДЕО**
> The sand is already pouring at full rate on the very first frame, not starting
> slowly. The upper chamber empties visibly and fast, the falling column of sand
> catching the backlight, the lower cone building and collapsing on itself. The
> last grains fall and stop. Camera pushes in extremely slowly, 5 percent over the
> whole shot, no more. **+ ХВОСТ В**

---

## 18 — Стопка счетов растёт
**Назначение:** ejerudgift · **Масштаб:** предмет · `18-bunken-vokser`

**① START**
> Overhead photograph, camera 50cm above a bare black desk at a slight angle. One
> single plain white envelope lies alone in the centre of the empty desk, throwing
> a distinct hard shadow. The rest of the surface is completely bare.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: a tall spilling pile of identical white
> envelopes now fills the centre of the frame, with several slid off the top and
> resting flat on the desk around it, and one rust-red envelope visible in the
> pile.
> Keep identical: camera height and angle, framing, the black desk surface and its
> texture, lighting direction and hardness.

**③ ВИДЕО**
> Envelopes start slamming down into frame from above immediately on the first
> frame, one after another. The rate accelerates sharply and the pile builds,
> slides and spreads sideways, envelopes sliding off the top onto the desk. The
> fall stops and the top envelope slides down the side of the pile and comes to
> rest. Camera locked off. **+ ХВОСТ В**

---

## 19 — Ржавчина расползается по металлу
**Назначение:** отложенный ремонт · **Масштаб:** макро · `19-rust-breder-sig`

**① START**
> Extreme macro photograph, camera 10cm from a flat brushed steel surface, frame
> filled edge to edge. Fine directional grain in the metal, a few water droplets
> sitting on it. The steel is completely clean with no corrosion anywhere. Hard
> raking key light from frame right. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the entire surface is now heavily
> corroded — saturated rust-orange scale spreading through the grain, flakes
> lifting and curling at the edges, deep pitting throwing micro-shadows.
> Keep identical: camera distance and angle, framing, focus, the metal grain
> direction, the water droplet positions, lighting direction and hardness.

**③ ВИДЕО**
> Rust blooms outward from a single point on the very first frame. The corrosion
> spreads across the surface in accelerated time, branching along the metal grain,
> orange scale lifting and flaking at the edges. The spread stops and the surface
> is left fully corroded and static. Camera locked off, focus fixed. **+ ХВОСТ В**

---

## 20 — Фасад под сменой погоды
**Назначение:** дом переживёт несколько зим · **Масштаб:** здание · `20-facade-gennem-vejr`

**① START**
> Wide static photograph, 28mm, camera on the ground looking slightly up at a
> plain two-storey Danish red-brick house facade filling the frame. Tiled roof,
> small windows, a gutter along the eaves. Hard rain is lashing the facade, water
> sheeting off the tiles and overflowing the gutter, flat grey light, everything
> soaked. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the rain has stopped and hard warm low
> sun now rakes across the brick, with meltwater still streaming down the wall and
> a single drip hanging from the gutter. The sky is deep navy and clear.
> Keep identical: camera position and angle, framing, the facade, the roof tiles,
> the windows, the gutter and every architectural detail.

**③ ВИДЕО**
> Hard rain is already lashing the facade on the first frame, water sheeting off
> the tiles and overflowing the gutter. The rain cuts to driving snow which
> settles fast on the roof and window ledges. The snow clears in accelerated time
> and hard low sun breaks across the brick with meltwater streaming down the wall.
> The water slows to a single drip and stops. Camera locked off, no zoom, deep
> focus. **+ ХВОСТ В**

---

# 5. РАЗРУШЕНИЕ

## 21 — Вода расплывается по документу
**Назначение:** сильнейший стоп-скролл · **Масштаб:** макро · `21-vand-paa-dokument`

**① START**
> Overhead macro photograph, camera 20cm above wet black slate, extremely shallow
> depth of field. A single sheet of cream 120gsm paper lies flat, completely dry
> and crisp, covered in dense blocks of unreadable printed lines and one dark
> stamp shape. Paper fibres visible. Hard key from frame right. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: a large soaked patch now covers most of
> the sheet, the ink dissolved into a dark grey bloom with bleeding tendrils at
> its edges, the paper cockled and lifted slightly at one corner.
> Keep identical: camera height and angle, framing, depth of field, the sheet
> position, the slate surface, lighting direction and specular sheen.

**③ ВИДЕО**
> A heavy water drop hits the centre of the sheet on the very first frame and the
> paper darkens instantly around the impact. The ink bleeds outward in visible
> tendrils, letters dissolving into grey blooms. Three more drops land in quick
> succession and the wet patches merge. The spread slows and stops, the paper
> cockling and lifting at one corner. Camera locked off, focus on the impact
> point. **+ ХВОСТ В**

---

## 22 — Башня из карт рушится
**Назначение:** конструкция не держится · **Масштаб:** предмет · `22-korthus-falder`

**① START**
> Close-up photograph, camera level with the subject on polished black stone,
> shallow depth of field. A three-tier house of cards built from plain unmarked
> cream cards stands intact and stable, each card throwing a long hard shadow
> across the stone. One rust-red card sits in the structure. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the structure has completely collapsed —
> the cards now lie in a flat scatter across the polished stone, fanned out in
> different directions, nothing standing.
> Keep identical: camera angle and height, framing, depth of field, the polished
> stone surface and its reflections, lighting direction, the black background.

**③ ВИДЕО**
> The base card slips on the very first frame and the whole structure collapses in
> one motion, cards fanning outward and sliding across the polished stone in
> different directions. The movement decays and one card spins flat on the stone
> and stops. Camera locked off. **+ ХВОСТ В**

---

## 23 — Ключ ломается в замке
**Назначение:** поздно передумывать · **Масштаб:** макро · `23-noegle-knaekker`

**① START**
> Extreme macro photograph, camera level with a brass lock cylinder set in a dark
> painted door, frame filled by the lock face. Worn scratches around the keyway. A
> plain brass key is fully inserted and intact. Hard key light from frame right,
> strong specular on the brass. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the key has snapped — only the broken
> shaft remains in the keyway, its freshly fractured end catching the light with a
> bright cool metal edge. The key head is gone entirely.
> Keep identical: camera angle and distance, framing, focus, the lock cylinder and
> its scratches, the door surface, lighting direction and specular character.

**③ ВИДЕО**
> The key begins turning under force on the very first frame, the metal visibly
> straining. It resists, twists, and snaps — the head comes away in the hand and
> moves out of frame while the broken shaft stays in the cylinder. The hand
> withdraws completely and the broken end sits motionless in the keyway. Camera
> locked off, focus fixed on the keyway. **+ ХВОСТ В**

---

## 24 — Потолок протекает в комнате
**Назначение:** крыша, дорогая находка · **Масштаб:** комната · `24-utaethed-i-loftet`

**① START**
> Wide low angle photograph, 24mm, camera on the bare floorboards of an empty room
> looking up at the ceiling and one wall corner. Pale plaster ceiling with a small
> dark damp patch just beginning to show, the plaster still flat. One hard shaft
> of cold daylight from an unseen window cuts across it; the rest is deep shadow.
> The floor below is dry. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the damp patch has spread wide and dark
> across the ceiling and the plaster sags visibly at its centre, a fragment of wet
> plaster has fallen and lies on the boards below, and the floor beneath is wet
> with splash marks.
> Keep identical: camera position and angle, framing, lens distortion, the room,
> the walls, the floorboards, the light shaft and its direction.

**③ ВИДЕО**
> A drop is already falling toward the lens on the very first frame and hits the
> floor with a visible splash. The ceiling patch darkens and widens and drops fall
> faster from three separate points, splashing on the bare boards below. A
> fragment of wet plaster detaches and falls. The dripping continues steadily.
> Camera locked off, wide. **+ ХВОСТ В**

---

## 25 — Ливень по окну изнутри тёмной комнаты
**Назначение:** атмосферное открытие рилса · **Масштаб:** комната · `25-regn-paa-ruden`

**① START**
> Medium photograph, 50mm, camera inside a completely dark room 1 metre from a
> large bare window pane, focus locked on the glass surface. Outside, an
> out-of-focus street at dusk is reduced to soft dark shapes and one warm light
> source. A light rain has just started — scattered droplets sit on the glass, no
> streams yet. The room interior is pure black. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the glass is now covered in fast running
> rivulets of water racing down the pane and merging, with the warm light outside
> refracting and breaking across every stream.
> Keep identical: camera position and distance, framing, focus locked on the
> glass, the out-of-focus street shapes and the position of the warm light, the
> pure black interior.

**③ ВИДЕО**
> Heavy rain is already hammering the glass on the very first frame, droplets
> bursting on impact. The water builds into fast running rivulets racing down the
> pane, merging and accelerating, the outside light refracting and breaking in
> each stream. The downpour eases slightly and the rivulets slow but keep running.
> Camera locked off, focus locked on the glass, background permanently out of
> focus. **+ ХВОСТ В**

---

## 26 — Вода хлещет через жёлоб по фасаду
**Назначение:** дренаж · **Масштаб:** здание · `26-tagrende-loeber-over`

**① START**
> Low wide photograph, 28mm, camera on wet ground looking steeply up at the eaves
> of a red-brick house. A cast-iron gutter runs along the eaves, brimming full and
> just beginning to spill at one point. The brick wall below shows a narrow dark
> vertical damp streak. Flat hard overcast daylight, everything wet and specular.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the gutter is now only dripping heavily,
> and the damp streak down the brick has become much wider and darker, with water
> pooling on the ground at the bottom of the frame.
> Keep identical: camera position and angle, framing, the eaves, the gutter, the
> brick wall and its bond pattern, the stone sill, the overcast light.

**③ ВИДЕО**
> Water is already pouring over the gutter lip in a continuous sheet on the first
> frame. The flow increases, sheeting straight down the brick face toward the
> lens, splashing hard off a stone sill halfway down. The flow thins to heavy
> dripping and the wet streak on the brick is left much wider and darker. Camera
> locked off, wide, deep focus. **+ ХВОСТ В**

---

# 6. РАЗРЕШЕНИЕ И ЗЕЛЁНЫЙ ФЛАГ

Эти шесть идут **в конец рилса**, под CTA. Движение спокойнее намеренно.

## 27 — Галочки проставляются по полю
**Назначение:** проверка пройдена · **Масштаб:** макро · `27-fluebentegn`

**① START**
> Overhead macro photograph, camera 25cm above a cream paper document at a slight
> angle. The wide left margin is completely blank with faint ruled lines, no marks
> of any kind. A fountain pen nib with a warm gold highlight enters at frame
> right, hovering just above the paper. Soft-hard key from frame left.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: a clean vertical column of six deep navy
> ink checkmarks now runs down the margin, each one slightly bled into the paper
> fibres, and the pen is gone from the frame entirely.
> Keep identical: camera height and angle, framing, the paper and its texture, the
> ruled lines, lighting direction and sheen.

**③ ВИДЕО**
> The first checkmark is struck on the very first frame, ink flowing wet into the
> paper. Five more marks are struck down the margin at a steady confident pace,
> each bleeding slightly into the fibres. The pen lifts and leaves frame and the
> wet ink catches the light and begins to dull as it dries. Camera locked off.
> **+ ХВОСТ В**

---

## 28 — Папка закрывается
**Назначение:** отчёт готов · **Масштаб:** предмет · `28-mappen-lukkes`

**① START**
> Close-up photograph at a low three-quarter angle to a dark oak desk. A loose
> stack of cream paper with uneven edges sits on an open kraft-card folder, the
> cover folded back flat. Warm hard key from frame left throws a long shadow
> across the desk, background dropping to black. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the stack is squared perfectly and the
> kraft cover is folded over it and pressed flat, so the folder sits closed with
> clean square edges. No hands in frame.
> Keep identical: camera angle and height, framing, the oak desk and its grain,
> the folder position, lighting direction and the long shadow.

**③ ВИДЕО**
> Hands square the stack with one sharp tap against the desk on the very first
> frame. The kraft cover is folded over the stack in one continuous motion and
> pressed flat with the palm. The hands withdraw fully out of frame and the folder
> sits closed and completely still. Camera pushes in extremely slowly, 5 percent
> over the whole shot. **+ ХВОСТ В**

---

## 29 — Ключ вешают на крючок
**Назначение:** сделка закрыта · **Масштаб:** макро · `29-noeglen-paa-krogen`

**① START**
> Close-up photograph, camera level with a simple brass hook screwed into an oak
> board, visible wood grain, shallow depth of field. The hook is empty. A plain
> brass key on a rust-red leather fob enters from above, hanging just clear of the
> hook. Warm hard key from frame right, background near-black. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the key now hangs motionless on the
> hook, the leather fob hanging straight down and still, with one bright specular
> highlight on the brass.
> Keep identical: camera angle and distance, framing, depth of field, the oak
> board and grain, the hook position, lighting direction.

**③ ВИДЕО**
> The key is placed onto the hook on the very first frame and released. It swings
> twice, each arc smaller than the last, the leather fob turning slowly. The
> movement stops completely and the key hangs still. Camera locked off.
> **+ ХВОСТ В**

---

## 30 — Дверь открывается в свет
**Назначение:** сильнейший финал под CTA · **Масштаб:** здание · `30-doeren-aabner`

**① START**
> Static wide photograph, 35mm, camera outside at chest height, square on to a
> closed deep navy panelled front door at the top of two worn stone steps in a
> red-brick facade. A brass handle, and a thin blade of warm light visible at the
> door's edge. Cool overcast daylight outside. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: the door now stands fully open, swung
> away from camera, and warm golden interior light spills across the threshold and
> down the stone steps toward the lens, glowing on the brick around the doorway.
> Keep identical: camera position and height, framing, the facade, the brickwork,
> the stone steps, the door frame, the overcast outdoor light.

**③ ВИДЕО**
> The door begins swinging open away from camera on the very first frame, one
> continuous arc. Warm interior light widens across the threshold and spills down
> the stone steps toward the lens, the brick around the doorway catching the glow.
> The door reaches full open and stops and the light steadies and holds. Camera
> locked off, no zoom, no drift. **+ ХВОСТ В**

---

## 31 — Фигура у окна в пустой комнате
**Назначение:** эмоция и масштаб · **Масштаб:** комната · `31-figur-ved-vinduet`

**① START**
> Wide photograph, 35mm, camera at the far end of an empty room with bare boards
> and pale walls, facing a tall bright window at the far end. Hard cold daylight
> from the window is the only source and the room falls to black at the edges.
> Dust turns in the light shaft. The room is empty — no person in frame.
> **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: a single person now stands at the
> window, small in frame, **seen strictly from behind**, in a dark coat, fully
> backlit and reduced almost to a silhouette, one hand raised resting against the
> window frame. No part of the face is visible and there is no reflection of a
> face in the glass.
> Keep identical: camera position and angle, framing, the room, the floorboards,
> the walls, the window and its light, the dust in the shaft.

**③ ВИДЕО**
> The figure walks into frame from the left on the very first frame and crosses
> toward the window, seen only from behind throughout. They reach the glass and
> stop, one hand rising to rest against the frame. Dust turns in the shaft of
> light around them. They stay completely still, facing away, and only the dust
> moves. Camera pushes in extremely slowly, 5 percent over the whole shot.
> The face is never visible at any point and never reflected in the glass.
> **+ ХВОСТ В**

---

## 32 — Окна загораются над крышами
**Назначение:** финал серии, бренд-концовка · **Масштаб:** город · `32-lys-over-tagene`

**① START**
> Elevated wide photograph, 35mm, camera above roof height looking across a Danish
> town skyline at dusk. Rows of tiled rooftops, chimneys and dormers receding into
> the distance. Every window is dark. Deep navy sky with the last light at the
> horizon. **+ ХВОСТ И**

**② END**
> Use this exact image. Change only this: about a dozen windows scattered across
> the rooftops are now lit warm gold, near and far, glowing against the dark
> roofline.
> Keep identical: camera position and height, framing, every rooftop, chimney and
> dormer and its exact position, the sky gradient and horizon light.

**③ ВИДЕО**
> One window in the near distance lights up warm on the very first frame. Windows
> light up one after another across the frame, near then far, the rhythm building
> until about a dozen are glowing. The last one lights and everything holds
> steady. Camera drifts extremely slowly to the right, 3 percent of frame width
> over the whole shot, nothing more. **+ ХВОСТ В**

---

## Как собирается рилс

1. **0,0–0,8 сек** — клип из §5 (разрушение). Без подводки.
2. **0,8–4 сек** — 2–3 куска из §2 или §4, резы на движении.
3. **4–6 сек** — конфликт из §3. Здесь ложится главный тезис.
4. **6–8 сек** — один клип из §6 + CTA с ценой.

Крупный масштаб (05, 08, 11, 15, 16, 20, 24, 25, 26, 30, 31, 32) — на открытие и
финал. Макро — в середину. Два макро подряд не ставить, глаз устаёт.
