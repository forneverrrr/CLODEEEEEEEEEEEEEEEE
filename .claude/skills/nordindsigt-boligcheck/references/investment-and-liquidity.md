# The home as an asset — investment & liquidity

How to read the property as money, not just shelter. All from data already gathered;
tag `calc`/`web`/`assumption` (`EV-2`). Goal: a buyer who understands resale risk and the real
hold horizon, framed as analysis (never a promise of returns).

## 1. CAGR vs the market (free, from the sale history)
You already have the last actual sale (from Boligsiden history) and the asking price.
- `CAGR = (asking / last_sale)^(1/years) − 1`. Tag `calc`.
- Compare to the market: recent national/area growth (Boliga / Finans Danmark). If the
  subject's CAGR is well below the market's, say so plainly — it usually reflects the
  micro-location (e.g. proximity to an udsat boligområde) and is the **quantified**
  version of a qualitative neighbourhood note. Note that in **real** terms (after
  inflation) modest nominal CAGR can be ~flat — tag `assumption` if you don't compute
  exact inflation.
- One honest line beats a table: *"this house has lagged the market for N years."*

## 2. Break-even hold period (round-trip transaction costs)
Buying and selling both cost money; a short hold can lose even if the price is flat.
- **Buying costs:** ½ ejerskifteforsikring + tinglysning (skøde ~0.6% + fixed) +
  own advokat/køberrådgiver + (if borrowing) mortgage registration 1.25% + fixed.
- **Selling costs:** agent commission + marketing (~1–3% of price), own advokat,
  ejerskifte.
- Sum the round trip, divide by a realistic annual appreciation assumption → the
  **minimum years to not sell at a loss**. Present the method and the number, tag
  `calc`, and state the appreciation assumption explicitly.

## 3. Liquidity (resale ease)
- **Depth:** how many comparable sales per quarter in the postcode (Boliga). A handful
  in two months = thin but not dead.
- **Speed:** median liggetid for the segment (DinGeo). High median = buyer's market =
  negotiating leverage now + slower resale later.
- **Buyer-pool width (qualitative):** features that narrow the set of buyers who will
  bid without hesitation — e.g. an asbestos roof, a documented storm/insurance history,
  area reputation. State this as a resale-risk factor, not a defect.

## 4. Tax-free sale & upside
- **parcelhusregel:** a private home can usually be sold free of gain tax if the
  owner actually lived there. The plot test is **not simply "under 1,400 m²"** —
  a larger plot still qualifies where subdivision (`udstykning`) is not permitted,
  or where subdividing would materially reduce the property's value; that is
  established by a statement from the kommune. So: under 1,400 m² → note it
  applies; over → do **not** conclude it fails, state the subdivision test and
  point the buyer at the kommune declaration.
- **Build-out upside:** footprint vs plot + the lokalplan may allow an extension/annex
  → a real, under-discussed lever on future value. Check lokalplan (manual).
- **Rate sensitivity:** the salgsopstilling's standard financing assumes a fixed rate
  (e.g. 4% / 30 yr). Note how affordability for the *next* buyer changes if rates rise
  — it caps resale price in a slow market.

## 5. Currency note for expats (context only)
DKK is pegged to EUR (ERM2) → low currency risk vs the euro, but real risk vs USD /
other home currencies. Mention as context; do not give FX advice.

## Output
Put this in two report blocks: **"The home as an asset"** (CAGR, break-even,
liquidity, parcelhusregel, upside) and reinforce the slow-market point in the
**Negotiation** section. Never promise appreciation; present ranges and method.
