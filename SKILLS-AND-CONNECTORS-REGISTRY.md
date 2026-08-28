# Реестр скиллов и коннекторов — NordIndsigt (всё, что обсуждали в этом чате)

Дата: 19 июля 2026. Полный список + как поставить один раз и навсегда.

**Важно про механику:** скиллы не нужно "подтягивать" вручную каждый раз — как
только SKILL.md лежит в `.claude/skills/` (или `.agents/skills/` с симлинком),
Claude Code сам решает, когда он релевантен, по полю `description` в его
YAML-шапке (там прямо написано "use when user mentions X, Y, Z"). Я не выбираю
скилл руками — harness сопоставляет твой запрос с описаниями всех установленных
скиллов и подсвечивает подходящий. Поэтому "установить один раз" — это и есть
единственное действие; дальше срабатывает само.

---

## 1. Скиллы — что установлено, что отклонено, что отложено

### 1.1 Установлено в этом чате (репо `.agents/skills/` + `.claude/skills/`)

| Скилл | Источник | Статус |
|---|---|---|
| `marketing-council` | github.com/coreyhaines31/marketingskills | ✅ закоммичено локально |
| `ai-seo` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `watch` | github.com/bradautomates/claude-video | ✅ закоммичено локально |
| `content-strategy` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `image` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `social` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `marketing-psychology` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `schema` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `copywriting` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `copy-editing` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `competitor-profiling` | coreyhaines31/marketingskills | ✅ закоммичено локально |
| `taste-skill` (`design-taste-frontend`) | Leonxlnx/taste-skill | ✅ закоммичено локально (28.08.2026, по прямому запросу — до этого числился в "рассмотрено, но не надо", см. 1.3a) |
| `impeccable` | pbakaus/impeccable | ✅ установлено официальным инсталлятором `npx impeccable install` (28.08.2026) — ставит хуки `PostToolUse`/`Stop` в `.claude/settings.local.json`, которые гоняют детектор антипаттернов после Edit/Write и на Stop |

**⚠️ "Закоммичено локально" ≠ "надёжно навсегда".** `git push` и GitHub API push
оба дают 403 в этой сессии (у GitHub-интеграции нет прав записи в репо). Пока
это не починено — см. раздел 3 ниже, это единственное, что блокирует "раз и
навсегда".

### 1.2 Уже были в среде до этого чата (не трогал, для полноты картины)

`brainstorming`, `canvas-design`, `cfo-advisor`, `cs-financial-analyst`,
`dispatching-parallel-agents`, `doc-coauthoring`, `docx`, `executing-plans`,
`finance-skills`, `learn`, `mcp-builder`, `morning`, `nordindsigt-boligcheck`,
`pdf`, `pptx`, `receiving-code-review`, `session-start-hook`, `skill-creator`,
`subagent-driven-development`, `systematic-debugging`, `test-driven-development`,
`using-superpowers`, `verification-before-completion`, `writing-plans`,
`writing-skills`, `xlsx`, `humanizer` (последний уже был закоммичен в репо
раньше, до этой сессии).

### 1.3a Пересмотрено 28.08.2026 (по прямому запросу пользователя — раньше отклонял, потом переставил)

При первом проходе по списку из 9 репо (public-apis, awesome-mcp-servers, open-design,
awesome-llm-apps, awesome, Scrapling, free-for-dev, taste-skill, impeccable) я сам не
поставил ни `taste-skill`, ни `impeccable`, ни `Scrapling` — аргумент был "в репо нет
фронтенд-кодовой базы, применять не к чему". Пользователь явно попросил поставить все
три — сделано:
- `taste-skill` — скопирован `skills/taste-skill/SKILL.md` (v2, `design-taste-frontend`)
  тем же способом, что и marketingskills (`.agents/skills/` + симлинк). Остальные 11
  вариантов из репо (v1, gpt-tasteskill, brutalist/minimalist/soft, imagegen-* и т.д.)
  **не** ставил — не просили, можно доставить точечно при необходимости.
- `impeccable` — поставлен официальным `npx impeccable install` (не вручную копированием
  файла, у него компилированный `dist/` + хуки). Установился в `.claude/skills/impeccable`
  и `.agents/skills/impeccable`, плюс хуки в `.claude/settings.local.json`
  (`PostToolUse: Edit|Write` и `Stop` гоняют `scripts/hook.mjs` — антипаттерн-детектор
  на UI-файлах). Инсталлятор заодно попытался поставить хуки под Codex CLI
  (`.codex/hooks.json`), которым тут не пользуемся — эту директорию удалил.
- `Scrapling` — не skill, а Python-библиотека для скрапинга + свой MCP-сервер
  (`scrapling-mcp`). Добавлена как MCP-коннектор в `.mcp.json` (см. раздел 2) плюс
  `requirements.txt` в корне репо для документации. Из-за эфемерности контейнера
  библиотека переустанавливается на каждый старт сессии тем же паттерном, что и
  Playwright MCP (`pip install` внутри команды запуска, не заранее).

### 1.3b Второй раунд, 28.08.2026 — новый список из 13 репо (2 дубля внутри: hermes-agent, OpenMontage)

| Репозиторий | Что это | Решение | Почему |
|---|---|---|---|
| `mvanhorn/last30days-skill` | Скилл: собирает и ранжирует по реальному ингейджменту (не SEO) обсуждения темы за 30 дней — Reddit, X, YouTube, TikTok, HN, web | ✅ поставлен | Прямо ложится на content-strategy/social — искать реальные тренды и темы для контента о домашних инспекциях, без выдуманных SEO-заголовков. Работает в основном keyless (есть graceful degradation без API-ключей). |
| `thedotmack/claude-mem` | Плагин персистентной памяти между сессиями (SQLite, worker-процесс, MCP) | ⚠️ поставлен повторно 28.08.2026 по прямой просьбе, воркер запущен (`npx claude-mem start`, порт 37700) | Работает **только на той машине/контейнере, где стоит** — всё живёт в `~/.claude/plugins` и `~/.claude-mem`, никакого git/project-scope у инструмента нет (проверил флаги CLI — такой опции физически не существует). В ЭТОЙ облачной сессии переживёт только до конца текущего контейнера — новая веб-сессия = новый контейнер = придётся ставить заново, автоматически не подтянется. Чтобы "работало всегда и везде" — нужно один раз выполнить `npx claude-mem install --ide claude-code` (или другой IDE) **на своей локальной машине**, там `~/.claude` не эфемерна и переживёт что угодно. Поддерживаемые IDE: claude-code, cursor, opencode, windsurf, codex-cli, copilot-cli, antigravity, goose, roo-code, warp — то есть разные кодовые агенты, а не обычное чат-приложение Claude.ai (там интеграции нет, только с coding-агентами). |
| `NousResearch/hermes-agent` | Отдельный автономный agent-фреймворк (свой рантайм, Telegram/Discord/Slack-боты, LLM-провайдеры) | ❌ не ставлю | Это не скилл/плагин для Claude Code, а конкурирующая агентная система целиком — ставить её "внутрь" этого проекта нечего, требует отдельного развёртывания. |
| `anthropics/claude-plugins-official` | Официальный маркетплейс плагинов Anthropic (реестр, не отдельный скилл) | ❌ не ставлю "целиком" | Это каталог — ставится не репозиторий, а конкретный плагин из него командой `/plugin install <name>@claude-plugins-official`. Ничего конкретного из каталога нам сейчас не названо — если нужен конкретный плагин оттуда, скажи, какой. |
| `K-Dense-AI/scientific-agent-skills` | 163 скилла для научных исследований (биология, химия, лекарства, 100+ научных баз) | ❌ не ставлю | Совсем не наш домен — real estate/маркетинг-контент, не научные статьи. |
| `calesthio/OpenMontage` | Полноценная агентная видео-студия: 12 пайплайнов, 100+ инструментов, 60+ провайдер-API | ❌ не ставлю | Дублирует то, что уже есть под задачу (свой пайплайн на Google Flow + `flow-video-producer` + `watch`). Ставить вторую тяжёлую видео-систему поверх рабочей — риск конфликтов без выигрыша (тот же принцип, по которому раньше не стали дублировать Playwright MCP вторым Chrome DevTools MCP). |
| `affaan-m/ECC` | "Agent harness OS": 68 агентов, 286 скиллов, хуки, память, security-сканер — под общую разработку ПО | ❌ не ставлю | На порядок больше по масштабу, чем нужно контент/маркетинг-проекту без активной кодовой базы; это набор для software-engineering команд, не про соцсети и посты. |
| `DietrichGebert/ponytail` | Скилл-философия "ленивого сеньора" — не писать код, которого не должно существовать | ❌ не ставлю | Полезно только при активной разработке кода; в репозитории почти нет кодовой работы (кроме редких HTML/CSS для карточек в scratchpad) — применять не к чему. |
| `JuliusBrussee/caveman` | Скилл + локальный прокси для экономии токенов (сжимает запросы к провайдеру) | ❌ не ставлю | Локальный прокси-слой поверх сетевого трафика рискует конфликтовать с уже настроенным sandboxed HTTPS_PROXY этой среды; экономия токенов не стоит риска сломать существующий сетевой путь. |
| `Imbad0202/academic-research-skills` | Скиллы для полного цикла академической статьи (research → write → review → finalize) | ❌ не ставлю | Не наш домен (научные публикации), плюс лицензия CC-BY-NC 4.0 — некоммерческая, а работа в этом репо коммерческая. |
| `coreyhaines31/marketingskills` (переслали повторно) | Тот же репозиторий, что и в первом раунде | — без изменений | Уже разобран в разделе 1.1/1.3/1.4. Новых конкретных скиллов из оставшихся 31 не запрошено — если нужен конкретный (`offers`, `pricing`, `launch` и т.п.), скажи какой, не буду ставить все 31 не глядя. |

### 1.3c Третий раунд, 28.08.2026 — доустановка того, что называл "может пригодиться"

По прямой просьбе доставил всё, что реально можно поставить тем же способом
(SKILL.md → `.agents/skills/` + симлинк):

- **Остальные 11 вариантов из `Leonxlnx/taste-skill`**: `taste-skill-v1`,
  `gpt-tasteskill`, `image-to-code-skill`, `redesign-skill`, `soft-skill`,
  `output-skill`, `minimalist-skill`, `brutalist-skill`, `stitch-skill`,
  `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit`.
- **Все 6 скиллов из `DietrichGebert/ponytail`**: `ponytail`,
  `ponytail-review`, `ponytail-audit`, `ponytail-help`, `ponytail-debt`,
  `ponytail-gain`.

**НЕ доставлял так же (не потому что не хотел, а физически не тот формат):**

- **`nexu-io/open-design`** — это не набор SKILL.md, а полноценное desktop-приложение
  с фоновым демоном (`od` CLI, `od mcp install claude`). У него внутри 162 скилла,
  но большинство завязаны на платные провайдер-API (fal.ai, Venice, BFL и т.д.),
  которых у нас нет, и сам демон должен постоянно работать на машине — в
  эфемерном облачном контейнере это не переживёт сессию, а локально требует
  отдельной установки приложения, не файла в git. Копировать 162 в основном
  нерабочих без ключей скилла в репозиторий — мусор, а не установка.
- **`calesthio/OpenMontage`** — то же самое: полноценный видео-пайплайн с 49
  скиллами, требует Python venv, FFmpeg, Node, `make install-gpu`, Remotion,
  Piper TTS — нативные зависимости, не скилл-файлы. Плюс дублирует уже рабочий
  Flow-пайплайн.
- Если когда-нибудь понадобится именно демон `open-design` или пайплайн
  OpenMontage целиком — это отдельная задача "поставить приложение на свою
  машину", не "положить скилл в репозиторий". Скажи — распишу шаги отдельно.

**Справочные списки** (free-for-dev, awesome-mcp-servers, public-apis,
claude-plugins-official, sindresorhus/awesome) — ставить нечего, это просто
ссылки. Вместо установки собрал их в `REFERENCE-LINKS.md` в корне репо, чтобы
не искать заново.

### 1.3 Рассмотрено, но НЕ установлено — отложено до появления сайта

Из `coreyhaines31/marketingskills` (45 скиллов всего в репо):

| Скилл | Когда ставить |
|---|---|
| `site-architecture` | Как появится реальный домен/сайт |
| `seo-audit` | После первой публикации сайта |
| `lead-magnets` | Когда на сайте будет форма подписки |
| `directory-submissions` | Проверить, что это не спам-директории, перед установкой |
| `customer-research` | Когда будет доступ к реальным лидам для интервью |
| `public-relations` | Когда будет инфоповод (запуск, громкий кейс) |

### 1.4 Рассмотрено и отклонено (первый раунд оценки, другой источник)

| Скилл/репо | Почему нет |
|---|---|
| Brand Build Skills (59-skill lib) | Слишком широко — веб-разработка/Ahrefs-аудиты, не нужно для соцсетей |
| Brand Guidelines (anthropics/skills) | Зашито под палитру Anthropic — идею забрали (свой токен-сет), сам скилл не ставили |
| Competitive Ads Extractor | Нет задачи парсить рекламные библиотеки конкурентов |
| Domain Name Brainstormer | Домен уже не проблема |
| Internal Comms | Нет внутренней команды/рассылок |
| Lead Research Assistant | B2B lead-gen, не наша задача сейчас |
| Content Research Writer | Дублирует humanizer + наш процесс |
| Twitter Algorithm Optimizer | X не приоритет (решили раньше) |
| Instagram/LinkedIn/Reddit/TikTok/Twitter/YouTube Automation | **Осознанно отклонено** — авто-постинг/авто-ответы прямо противоречат нашей политике "не выглядеть ботом" в FB-группах, риск бана |
| Video Downloader | Нет текущей задачи |
| Image Enhancer | Низкий приоритет, не тестировали |
| Slack GIF Creator | Не используем Slack |
| Theme Factory | Не делаем презентации/лендинги пока |
| LessieAI (people-search/email) | Платный B2B-инструмент, не о контенте |

---

## 2. Коннекторы / MCP-серверы — что обсуждали

| Коннектор | Статус | Комментарий |
|---|---|---|
| **Playwright MCP** (Microsoft, `@playwright/mcp`) | ✅ Настроен через `.mcp.json` в корне репо (project scope) | Реальный браузер: navigate/screenshot/click/snapshot. Единственный надёжный способ реально "посмотреть" страницы (в отличие от WebFetch, который не видит JS-рендер типа Pinterest) |
| **Scrapling MCP** (D4Vinci/Scrapling, `scrapling-mcp`) | ✅ Настроен через `.mcp.json` (28.08.2026) | HTTP/browser/stealth-fetch тулы для скрапинга (обход Cloudflare и т.п.). На момент установки активной задачи парсинга нет — поставлено про запас по прямому запросу пользователя |
| Chrome DevTools MCP (Google) | Обсуждали, не ставили | Альтернатива Playwright MCP, решили не дублировать — Playwright уже закрывает эту потребность |
| Canva | Уже подключен на уровне сессии/аккаунта (не наша установка) | Brand kit уже настроен (задача #1 в начале работы) |
| Figma | Уже подключен | Не использовали активно в этой кампании |
| GitHub | Уже подключен, но **права записи ограничены** (403 на push) | Нужно чинить в настройках GitHub App |
| Google Drive | Уже подключен | Использовали для метрик в начале сессии |
| Supabase | Уже подключен | Не использовали в этой кампании |
| PubMed / Scholar Gateway | Уже подключены (Scholar Gateway требует авторизации) | Не относится к маркетингу, не трогали |

---

## 3. Как поставить один раз и навсегда — по механизму хранения

Есть **два независимых слоя**, которые нужно понимать по отдельности:

### 3.1 Если ты работаешь в ЭТОМ ЖЕ репозитории/проекте (любой новый чат по NordIndsigt)

Это уже настроено. Работает так:
- Скиллы: `.agents/skills/<name>/SKILL.md` + симлинк `.claude/skills/<name>`.
- MCP: `.mcp.json` в корне репозитория.

**Единственное, что нужно починить** — права записи GitHub-интеграции для этой
сессии, чтобы мои локальные коммиты реально долетели до GitHub:
1. Зайди в настройки GitHub App/интеграции, через которую подключен Claude
   (обычно Settings → GitHub Apps → [имя приложения] → Repository permissions).
2. Найди раздел **Contents** — должно быть **Read and write**, сейчас похоже
   стоит только **Read**.
3. Сохрани, дай доступ к репозиторию `forneverrrr/CLODEEEEEEEEEEEEEEEE`, если
   он не в списке разрешённых.
4. Напиши мне — я тут же допушу оставшиеся 9 SKILL.md (сейчас запушены только
   `.mcp.json` и HANDOFF-файл, остальное ждёт в локальном коммите).

После этого — при любом новом чате в этом проекте всё подтягивается
автоматически, ничего переустанавливать не нужно.

### 3.2 Если ты хочешь то же самое во ВСЕХ проектах/чатах (не только NordIndsigt)

Это уже другой механизм — **user-level** (не project-level) конфигурация:

**Скиллы на уровне пользователя** (актуально только если Claude Code работает
у тебя на собственной локальной машине, а не в этом облачном контейнере — там
`~/.claude/skills/` эфемерна и сама сбрасывается, мы это видели в этой сессии):
```bash
# На своей локальной машине:
mkdir -p ~/.claude/skills
git clone --depth 1 https://github.com/coreyhaines31/marketingskills.git /tmp/mk
git clone --depth 1 https://github.com/bradautomates/claude-video.git /tmp/cv
for name in marketing-council ai-seo content-strategy image social \
            marketing-psychology schema copywriting copy-editing \
            competitor-profiling; do
  cp -r /tmp/mk/skills/$name ~/.claude/skills/$name
done
cp -r /tmp/cv/skills/watch ~/.claude/skills/watch
```
Это переживёт что угодно, потому что диск на твоей машине не эфемерный.

**MCP на уровне пользователя** (тоже на своей машине, не в этом контейнере):
```bash
claude mcp add playwright -s user -- npx -y @playwright/mcp@latest
```
Флаг `-s user` (вместо `-s local` или `-s project`) — конфиг сохраняется в
твоём личном `~/.claude.json`, действует во всех проектах на этой машине.

**В облачном/веб-режиме Claude Code (как сейчас)** user-level не помогает —
контейнер каждой сессии свой и эфемерный. Единственный надёжный способ здесь —
именно project-level через git-репозиторий (раздел 3.1). Поэтому для этой
конкретной работы над NordIndsigt чинить нужно именно доступ на запись в репо,
а не искать способ поставить "глобально".

---

## 4. Итоговый чек-лист действий (по приоритету)

1. **Почини права GitHub-интеграции** (Contents: Read & write) — это разблокирует всё остальное.
2. Скажи мне, когда починишь — я допушу оставшиеся 9 скиллов одним коммитом.
3. Дальше просто открывай новые чаты в этом же проекте — скиллы и Playwright MCP
   будут доступны сами, без напоминаний.
4. Если начнёшь работать в отдельном, не-облачном Claude Code на своей машине —
   используй раздел 3.2 для той же настройки один раз там.
