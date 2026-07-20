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
