# 32 клипа — два режима: START/END/ВИДЕО (01–10) и прямой image-to-video (11–32)

> **Рабочая версия — `video/veo-broll-32.html`.** Там те же 32 клипа с уже
> вклеенными хвостами: копируешь блок целиком, ничего не дописываешь. Этот
> markdown остаётся исходником для правок.

**Дата:** 31 июля 2026, клипы 11–32 переписаны 1 августа под прямой
image-to-video (без END).
**Баланс:** 410 кредитов · **Кадры / Video Veo 3.1 Lite = 10 кредитов**
**Формат:** 9:16, 8 сек, **без текста в кадре**

---

## Два режима в этом файле — не перепутай

**Клипы 01–10** — старая схема, START → END → Кадры. У них есть кадр-финал,
Veo анимирует переход между двумя картинками.

**Клипы 11–32** — переписаны под **прямой image-to-video**: один START-кадр
+ текстовый промпт движения, без END. Причина смены: без END-кадра, привязанного
к финальному состоянию, старые промпты ③ читались Veo как «ничего особо не
происходит» — они писались в расчёте, что кульминацию уже показывает
финальная картинка, а не текст. Без неё текст должен нести всю драматургию сам.

### Почему клипы 01–10 всё ещё используют END

Если сгенерить 4 старта и 4 финала независимо, они **не совпадут**: другая
композиция, другой угол. Veo такую пару не соединяет, а **морфит** — и
получается «бред какой-то». Пара должна быть одной сценой в двух состояниях,
и единственный надёжный способ это получить — взять старт и изменить в нём
ровно одну вещь.

```
①  4 генерации START      →  выбрал 1
②  правка выбранного      →  END
③  Кадры: START + END + промпт  →  10 кредитов
```

### Почему клипы 11–32 обходятся без END

Прямой image-to-video даёт Veo больше свободы досочинить сцену — а раз нет
второй картинки, которая жёстко фиксирует, чем всё кончится, промпт движения
обязан **сам** нести и нарастание, и явную концовку. Три правила, отличающие
эти 22 промпта от прежних:

1. **Несколько нарастающих битов, а не одно плавное движение.** Каждый промпт
   разбит по секундам (0.0–Xs / X–Ys / Y–8s), и в каждом биту происходит
   что-то новое, а не одно и то же действие, растянутое на 8 секунд.
2. **Камера не всегда `locked off`.** Резкий push-in, whip-pan, рывок фокуса,
   быстрый drift — это симулирует смену кадра там, где реального монтажного
   реза нет. Раньше почти все клипы держали камеру неподвижной все 8 секунд —
   отсюда и ощущение «скучно».
3. **Явный `Final frame:` текстом.** Без картинки-якоря это единственное, что
   не даёт Veo придумать вялую концовку.

```
①  4 генерации START      →  выбрал 1
③  Video: START + текстовый промпт  →  10 кредитов, без Кадров
```

---

## ХВОСТ И — дописывать в конец каждого промпта картинки (① и ②, клипы 01–10)

> Photorealistic, editorial still, shot on 50mm, shallow depth of field,
> 9:16 vertical. Hard directional key light from one side, deep near-black
> shadows, strong specular highlights. Palette: near-black navy #0F1E30
> background, warm cream #E8DED1, one saturated rust-red #C4533F accent.
> High contrast, not flat, not evenly lit.
> No text anywhere in frame, no captions, no letters, no numbers, no logos,
> no watermark, no readable documents, no visible faces, no house numbers,
> no street signs.

## ХВОСТ В — для клипов 01–10 (③, режим Кадры)

> Camera behaviour exactly as stated, no additional camera move. Motion starts
> on the very first frame — no static intro, no slow build-up. The scene, the
> framing and the lighting stay identical to the two supplied frames.
> AUDIO: ambient only. No music, no dialogue, no voiceover.
> No text appears at any point, no captions, no subtitles, no logos,
> no watermark, no visible faces.

## ХВОСТ В2 — для клипов 11–32 (прямой image-to-video, без END)

> Camera behaviour as stated above — do not default to a fully static
> locked-off shot for the whole duration; vary it as described (push,
> whip-pan, rack-focus, drift, tilt) so the shot reads as more than one beat.
> Motion begins decisively or violently on the very first frame, never a calm
> intro. AUDIO: ambient only, no music, no dialogue, no voiceover.
> No text appears at any point, no captions, no subtitles, no logos,
> no watermark, no visible faces.

---

## Порядок генерации

Если кредиты кончатся раньше, эти 12 закрывают самые частые тезисы:
`01 · 02 · 06 · 07 · 12 · 13 · 21 · 23 · 25 · 27 · 30 · 32`

## Приёмка

**Перегенерировать:** появился текст · видно лицо · шесть пальцев в фокусе ·
событие позже 2-й секунды · камера статична все 8 сек у клипов 11–32 (там это
уже брак, не только «локд-офф не туда уехал») · финал не совпадает с
`Final frame:`.
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

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: The torch beam is already sweeping fast along the rafters on the very
> first frame, dust kicked violently into visible motion inside it. 1.0–4.0s: The
> beam races the length of the ridge; the camera pushes forward hard and low
> along the rafters chasing it, gaining speed, beam shadows whipping past close
> to the lens. 4.0–8.0s: The beam whips to a stop on a dark water stain
> spreading across the boards; a fast rack-focus pulls from the beam's edge onto
> the stain, holding tight as the stain visibly widens a little further.
> Final frame: beam locked hard on the stain, the stain clearly larger than at
> the first glimpse, dust still drifting, camera holding tight on the timber. **+ ХВОСТ В2**

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

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.8s: Both doors are already mid-swing, thrown open hard and fast
> simultaneously on the very first frame — no calm start. 0.8–4.0s: Warm golden
> light bursts through the left opening in a widening wedge, volumetric dust
> visible inside the beam, spilling almost to the lens; the right opening's
> blackness seems to deepen further, swallowing any hint of detail. 4.0–8.0s: The
> camera pushes in and centres tighter on the gap between the two thresholds,
> holding the maximum contrast between the flooding light and total dark.
> Final frame: both doors fully open, warm light reaching almost to the camera
> on the left, absolute black on the right, dust suspended in the light beam. **+ ХВОСТ В2**

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

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: The hard directional light is already sweeping fast left to right on
> the very first frame. 1.0–4.0s: As it crosses the polished key it detonates
> into a blinding specular flare that briefly overexposes that side of frame; the
> camera does a quick tight push toward the flare. 4.0–8.0s: The light reaches
> the corroded key and simply dies there — no highlight, flat and dead — the
> camera settles, holding both keys in frame with the stark difference visible.
> Final frame: the polished key still glowing with the flare's afterimage, the
> corroded key dead matte, the light stopped at frame right. **+ ХВОСТ В2**

---

## 14 — Весы срываются в одну сторону
**Назначение:** что перевесило · **Масштаб:** предмет · `14-vaegt-tipper`

**① START**
> Low angle close-up photograph, camera level with the pans, background falling to
> pure black. A patinated brass balance scale stands in perfect balance, beam
> horizontal. The left pan holds a loose heap of coins, the right pan holds a
> folded stack of cream paper tied with coarse string with one rust-red thread.
> **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.6s: The beam breaks violently on the very first frame, the coin side
> dropping hard and fast. 0.6–3.0s: The pan slams down, bounces twice, coins
> flying off the edge and scattering loudly across the surface below, several
> rolling out toward the lens. 3.0–8.0s: The camera whip-pans down to follow the
> scattered coins as they roll to a stop, then rises back to hold the fully
> tipped scale in frame.
> Final frame: the scale locked hard-tipped, coins scattered and still across
> the surface, one coin resting closest to the lens. **+ ХВОСТ В2**

---

## 15 — Тень проходит по двум фасадам
**Назначение:** два дома, одна цена · **Масштаб:** здание · `15-skygge-over-to-facader`

**① START**
> Wide static photograph, 35mm, camera square on to the junction of two adjoining
> house facades filling the frame equally. Left: a clean modern facade in dark
> grey brick with large flush windows. Right: an older facade in worn ochre render
> with small deep-set windows and visible cracking. Both facades are fully lit by
> hard low sun, no shadow anywhere. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: A hard shadow edge slams across the frame from the left on the very
> first frame, faster than natural cloud movement. 1.0–4.0s: It swallows the
> modern facade whole while the old facade ignites in blinding hard sun, every
> crack throwing a knife-sharp shadow; the camera pushes in on the junction
> line. 4.0–8.0s: The shadow edge locks exactly on the junction and the camera
> holds, the contrast now total between the two halves.
> Final frame: the modern facade in total blackness, the old facade blazing, the
> junction line razor-sharp, camera close on it. **+ ХВОСТ В2**

---

## 16 — Два одинаковых ряда домов, разный свет
**Назначение:** выглядят одинаково · **Масштаб:** город · `16-to-husraekker`

**① START**
> Elevated wide photograph, 28mm, camera 6 metres up looking down a street where
> two mirror-image rows of Danish brick terraced houses face each other — same
> rooflines, same window rhythm. Wet asphalt between them reflects the sky. Heavy
> cloud shadow covers both rows equally, flat and cold. Deep focus. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: Heavy cloud shadow is already racing across both rows at speed on the
> very first frame. 1.0–4.0s: It clears the left row explosively into hard warm
> sun, brick flaring red-ochre, while the right row plunges into cold blue-grey
> shade — the wet asphalt between them flashes with the reflected contrast. The
> camera drifts fast and low along the street toward the split point. 4.0–8.0s:
> The camera arrives at the midpoint and holds, both conditions locked, the
> street empty throughout.
> Final frame: left row blazing warm, right row cold and dark, camera centred
> exactly on the dividing line down the wet street. **+ ХВОСТ В2**

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

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: Sand is already pouring at a violent rate on the very first frame, a
> thick continuous column, not a trickle. 1.0–4.0s: The upper chamber empties
> fast, visibly draining; the camera pushes in hard and fast toward the narrow
> neck of the hourglass, tracking the falling column close. 4.0–8.0s: The lower
> cone builds and partially collapses on itself twice before the last grains
> fall; the camera pulls back to reveal the full hourglass motionless.
> Final frame: the upper chamber completely empty, sand settled in an uneven
> cone below, camera pulled back to a clean close-up of the still hourglass. **+ ХВОСТ В2**

---

## 18 — Стопка счетов растёт
**Назначение:** ejerudgift · **Масштаб:** предмет · `18-bunken-vokser`

**① START**
> Overhead photograph, camera 50cm above a bare black desk at a slight angle. One
> single plain white envelope lies alone in the centre of the empty desk, throwing
> a distinct hard shadow. The rest of the surface is completely bare.
> **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.8s: Envelopes are already slamming down hard and fast from above on the
> very first frame, several at once, not one at a time. 0.8–4.0s: The pile
> builds violently, sliding and toppling sideways, envelopes fanning across the
> desk faster than gravity alone would allow; the camera whip-tilts down to
> follow one envelope as it slides off the edge toward the lens. 4.0–8.0s: The
> fall stops abruptly with a final shudder; the camera rises back to hold the
> full spilling pile.
> Final frame: a tall collapsed pile of envelopes spread wide across the desk,
> one rust-red envelope prominent, camera steady on the full spread. **+ ХВОСТ В2**

---

## 19 — Ржавчина расползается по металлу
**Назначение:** отложенный ремонт · **Масштаб:** макро · `19-rust-breder-sig`

**① START**
> Extreme macro photograph, camera 10cm from a flat brushed steel surface, frame
> filled edge to edge. Fine directional grain in the metal, a few water droplets
> sitting on it. The steel is completely clean with no corrosion anywhere. Hard
> raking key light from frame right. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: Rust erupts from a single point violently on the very first frame,
> flaking visible almost immediately. 1.0–4.0s: The corrosion races outward
> branching along the grain, flakes lifting and curling in real time; the camera
> pushes in extremely close, tracking the leading edge of the spread as it
> crosses the frame. 4.0–8.0s: The spread reaches the frame edges and stops, the
> surface fully corroded; the camera holds tight on the pitted texture.
> Final frame: the entire visible surface corroded and flaking, deep pitting
> catching the raking light, camera in extreme close-up. **+ ХВОСТ В2**

---

## 20 — Фасад под сменой погоды
**Назначение:** дом переживёт несколько зим · **Масштаб:** здание · `20-facade-gennem-vejr`

**① START**
> Wide static photograph, 28mm, camera on the ground looking slightly up at a
> plain two-storey Danish red-brick house facade filling the frame. Tiled roof,
> small windows, a gutter along the eaves. Hard rain is lashing the facade, water
> sheeting off the tiles and overflowing the gutter, flat grey light, everything
> soaked. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: Hard rain is already lashing violently on the very first frame,
> sheeting hard off the tiles. 1.0–3.0s: The rain whips into driving snow within
> seconds, settling fast and visibly thickening on the roofline and sills; the
> camera holds low and wide. 3.0–6.0s: The snow clears explosively fast and hard
> low sun breaks across the brick, meltwater suddenly streaming down the wall in
> visible rivulets; the camera pushes in on the streaming water. 6.0–8.0s: The
> water slows to a single drip and stops.
> Final frame: hard low sun on wet brick, one drip hanging from the gutter, sky
> deep navy and clear, camera close on the wet facade. **+ ХВОСТ В2**

---

# 5. РАЗРУШЕНИЕ

## 21 — Вода расплывается по документу
**Назначение:** сильнейший стоп-скролл · **Масштаб:** макро · `21-vand-paa-dokument`

**① START**
> Overhead macro photograph, camera 20cm above wet black slate, extremely shallow
> depth of field. A single sheet of cream 120gsm paper lies flat, completely dry
> and crisp, covered in dense blocks of unreadable printed lines and one dark
> stamp shape. Paper fibres visible. Hard key from frame right. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.6s: A heavy drop hits the sheet violently on the very first frame, the
> paper darkening instantly in a visible shockwave outward. 0.6–4.0s: Ink bleeds
> outward fast in branching tendrils, letters dissolving into grey blooms; three
> more drops slam down in quick succession, the wet patches colliding and
> merging; the camera pushes in tight on the collision point. 4.0–8.0s: The
> spread slows and stops, the paper cockling and lifting sharply at one corner
> as it dries unevenly.
> Final frame: most of the sheet soaked and dissolved into a dark bloom, the
> corner curled sharply upward, camera in tight macro on the ruined surface. **+ ХВОСТ В2**

---

## 22 — Башня из карт рушится
**Назначение:** конструкция не держится · **Масштаб:** предмет · `22-korthus-falder`

**① START**
> Close-up photograph, camera level with the subject on polished black stone,
> shallow depth of field. A three-tier house of cards built from plain unmarked
> cream cards stands intact and stable, each card throwing a long hard shadow
> across the stone. One rust-red card sits in the structure. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.5s: The base card slips violently on the very first frame — no
> hesitation. 0.5–3.0s: The entire structure collapses explosively in one
> cascading motion, cards fanning outward and skidding across the polished stone
> in multiple directions at once, one card spinning fast toward the lens.
> 3.0–8.0s: The scattered cards settle one by one, the last card spinning slower
> and slower before it drops flat; the camera tracks down slightly to follow it
> to a stop.
> Final frame: a flat chaotic scatter of cards across the reflective stone, the
> last card lying still closest to camera. **+ ХВОСТ В2**

---

## 23 — Ключ ломается в замке
**Назначение:** поздно передумывать · **Масштаб:** макро · `23-noegle-knaekker`

**① START**
> Extreme macro photograph, camera level with a brass lock cylinder set in a dark
> painted door, frame filled by the lock face. Worn scratches around the keyway. A
> plain brass key is fully inserted and intact. Hard key light from frame right,
> strong specular on the brass. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: The key is already under visible strain on the very first frame,
> metal flexing hard. 1.0–3.0s: It resists violently, twists, and snaps with a
> sudden sharp motion — the head flies out of frame fast rather than being
> withdrawn gently; the camera whip-focuses from the straining key to the
> fractured shaft. 3.0–8.0s: The broken end catches the light, motionless in the
> keyway; the camera pushes in tight on the fresh fracture.
> Final frame: the broken shaft alone in the lock, the fracture edge catching a
> cold bright highlight, camera in extreme close-up. **+ ХВОСТ В2**

---

## 24 — Потолок протекает в комнате
**Назначение:** крыша, дорогая находка · **Масштаб:** комната · `24-utaethed-i-loftet`

**① START**
> Wide low angle photograph, 24mm, camera on the bare floorboards of an empty room
> looking up at the ceiling and one wall corner. Pale plaster ceiling with a small
> dark damp patch just beginning to show, the plaster still flat. One hard shaft
> of cold daylight from an unseen window cuts across it; the rest is deep shadow.
> The floor below is dry. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.8s: A drop is already falling fast toward the lens on the very first
> frame, hitting the floor with a hard visible splash. 0.8–4.0s: The ceiling
> patch darkens and spreads violently fast, drops now falling from three points
> at once, splashing loudly on the boards; the camera pulls back fast and wide
> to reveal the full spreading damage. 4.0–8.0s: A large fragment of wet plaster
> suddenly detaches and falls, striking the floor hard; the dripping continues
> at a steady heavy rate.
> Final frame: a wide shot of a badly sagging wet ceiling, a fallen plaster
> fragment on the wet floor, drops still falling from multiple points. **+ ХВОСТ В2**

---

## 25 — Ливень по окну изнутри тёмной комнаты
**Назначение:** атмосферное открытие рилса · **Масштаб:** комната · `25-regn-paa-ruden`

**① START**
> Medium photograph, 50mm, camera inside a completely dark room 1 metre from a
> large bare window pane, focus locked on the glass surface. Outside, an
> out-of-focus street at dusk is reduced to soft dark shapes and one warm light
> source. A light rain has just started — scattered droplets sit on the glass, no
> streams yet. The room interior is pure black. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: Heavy rain is already hammering the glass violently on the very
> first frame, droplets bursting on impact in visible detail. 1.0–4.0s: The
> water explodes into fast, thick rivulets racing down the pane, merging and
> colliding faster than natural gravity, the outside light shattering and
> refracting wildly across each stream; the camera pushes in tight on one
> merging point. 4.0–8.0s: The downpour eases slightly but the rivulets keep
> racing, the refracted light settling into a steady rhythm.
> Final frame: glass covered in fast merged rivulets, the warm light outside
> broken into multiple bright refracted streaks, camera close on the wet glass. **+ ХВОСТ В2**

---

## 26 — Вода хлещет через жёлоб по фасаду
**Назначение:** дренаж · **Масштаб:** здание · `26-tagrende-loeber-over`

**① START**
> Low wide photograph, 28mm, camera on wet ground looking steeply up at the eaves
> of a red-brick house. A cast-iron gutter runs along the eaves, brimming full and
> just beginning to spill at one point. The brick wall below shows a narrow dark
> vertical damp streak. Flat hard overcast daylight, everything wet and specular.
> **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: Water is already pouring violently over the gutter lip in a thick
> sheet on the very first frame. 1.0–4.0s: The flow surges even harder, sheeting
> down the brick face and slamming off the stone sill with visible spray; the
> camera pulls back fast to reveal the full length of the streaming wall.
> 4.0–8.0s: The flow thins abruptly to heavy dripping, the streak on the brick
> left far wider and darker than at the start; the camera holds on the pooling
> water below.
> Final frame: a wide dark wet streak down the brick, water pooling visibly on
> the ground, the gutter still dripping heavily. **+ ХВОСТ В2**

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

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.8s: The first checkmark strikes the paper decisively on the very first
> frame, ink flowing fast and visible. 0.8–4.0s: Five more marks strike down the
> margin in a quick confident rhythm, each bleeding slightly; the camera pushes
> in steadily on the growing column of marks. 4.0–8.0s: The pen lifts and exits
> frame fast; the camera holds tight on the full column as the wet ink begins to
> dull evenly.
> Final frame: six clean checkmarks in a tight column, ink settling, camera
> close on the finished margin. **+ ХВОСТ В2**

---

## 28 — Папка закрывается
**Назначение:** отчёт готов · **Масштаб:** предмет · `28-mappen-lukkes`

**① START**
> Close-up photograph at a low three-quarter angle to a dark oak desk. A loose
> stack of cream paper with uneven edges sits on an open kraft-card folder, the
> cover folded back flat. Warm hard key from frame left throws a long shadow
> across the desk, background dropping to black. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.8s: Hands square the stack with one sharp decisive tap on the very first
> frame. 0.8–4.0s: The kraft cover folds over in one confident continuous
> motion and is pressed flat with a firm decisive palm strike; the camera pushes
> in closer on the closing edge as it happens. 4.0–8.0s: The hands withdraw fast
> and completely out of frame; the camera holds steady on the closed folder.
> Final frame: the folder closed with clean square edges, hands gone, camera
> close on the finished surface. **+ ХВОСТ В2**

---

## 29 — Ключ вешают на крючок
**Назначение:** сделка закрыта · **Масштаб:** макро · `29-noeglen-paa-krogen`

**① START**
> Close-up photograph, camera level with a simple brass hook screwed into an oak
> board, visible wood grain, shallow depth of field. The hook is empty. A plain
> brass key on a rust-red leather fob enters from above, hanging just clear of the
> hook. Warm hard key from frame right, background near-black. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–0.6s: The key is placed onto the hook with a decisive motion on the very
> first frame and released immediately. 0.6–4.0s: It swings in two confident
> decreasing arcs, the leather fob turning visibly; the camera holds close,
> tracking the swing slightly side to side. 4.0–8.0s: The movement stops
> completely; the camera settles dead still on the motionless key.
> Final frame: the key hanging perfectly still on the hook, one bright specular
> highlight on the brass, camera locked close. **+ ХВОСТ В2**

---

## 30 — Дверь открывается в свет
**Назначение:** сильнейший финал под CTA · **Масштаб:** здание · `30-doeren-aabner`

**① START**
> Static wide photograph, 35mm, camera outside at chest height, square on to a
> closed deep navy panelled front door at the top of two worn stone steps in a
> red-brick facade. A brass handle, and a thin blade of warm light visible at the
> door's edge. Cool overcast daylight outside. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: The door is already swinging open in a fast decisive arc on the very
> first frame, not a slow reveal. 1.0–4.0s: Warm interior light widens rapidly
> across the threshold, spilling down the steps toward the lens, the brick
> catching the glow in a growing wash; the camera pushes in steadily toward the
> widening light. 4.0–8.0s: The door reaches full open with a decisive stop; the
> camera holds on the steady light.
> Final frame: the door fully open, warm light flooding the steps and reaching
> toward the lens, camera close on the glowing threshold. **+ ХВОСТ В2**

---

## 31 — Фигура у окна в пустой комнате
**Назначение:** эмоция и масштаб · **Масштаб:** комната · `31-figur-ved-vinduet`

**① START**
> Wide photograph, 35mm, camera at the far end of an empty room with bare boards
> and pale walls, facing a tall bright window at the far end. Hard cold daylight
> from the window is the only source and the room falls to black at the edges.
> Dust turns in the light shaft. The room is empty — no person in frame.
> **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: The figure walks into frame from the left at a natural but decisive
> pace on the very first frame, seen only from behind throughout. 1.0–4.0s: They
> reach the glass and stop, one hand rising to rest against the frame; the
> camera pushes in slowly but steadily, visibly closing distance. 4.0–8.0s: They
> stay still, facing away; dust turns in the light shaft around them; the
> camera settles into its final close position.
> Final frame: the figure motionless at the window seen from behind, hand on the
> frame, camera notably closer than the opening frame. The face is never visible
> at any point and never reflected in the glass. **+ ХВОСТ В2**

---

## 32 — Окна загораются над крышами
**Назначение:** финал серии, бренд-концовка · **Масштаб:** город · `32-lys-over-tagene`

**① START**
> Elevated wide photograph, 35mm, camera above roof height looking across a Danish
> town skyline at dusk. Rows of tiled rooftops, chimneys and dormers receding into
> the distance. Every window is dark. Deep navy sky with the last light at the
> horizon. **+ ХВОСТ И**

**ВИДЕО — прямой image-to-video, без END-кадра**
> 0.0–1.0s: The first window lights up decisively on the very first frame, no
> slow fade. 1.0–5.0s: Windows ignite one after another across the frame at a
> quickening rhythm, near then far, building toward a fuller glow; the camera
> drifts steadily to the right, a clearly visible drift, to reveal more of the
> lit skyline as it happens. 5.0–8.0s: The last window lights and the drift
> settles to a stop.
> Final frame: a dozen or more warm windows lit across the dark rooftops, camera
> settled after a visible rightward drift, sky unchanged. **+ ХВОСТ В2**

---

## Как собирается рилс

1. **0,0–0,8 сек** — клип из §5 (разрушение). Без подводки.
2. **0,8–4 сек** — 2–3 куска из §2 или §4, резы на движении.
3. **4–6 сек** — конфликт из §3. Здесь ложится главный тезис.
4. **6–8 сек** — один клип из §6 + CTA с ценой.

Крупный масштаб (05, 08, 11, 15, 16, 20, 24, 25, 26, 30, 31, 32) — на открытие и
финал. Макро — в середину. Два макро подряд не ставить, глаз устаёт.
