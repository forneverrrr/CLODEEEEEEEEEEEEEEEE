# THE TRANSACTION — rights, gates, deadlines, money structure

Implements `LEGAL-1` … `LEGAL-4` and the cost side of `MONEY-6`.

The rest of the skill analyses the **object**. This module covers the **deal** —
where an expat buyer's most expensive mistakes actually happen: a missing clause,
a deadline nobody translated, an insurance policy that does not cover the thing it
seems to cover, or a permission that was needed before any of it mattered.

Nothing here is legal or financial advice (`EV-11`). These are structural facts and
questions to put to a lawyer and a bank — stated plainly enough that the buyer
knows what to ask and by when.

---

## 1. The right to buy — check this first (`LEGAL-1`)

Under **Erhvervelsesloven** (lov om erhvervelse af fast ejendom), a buyer who does
not currently live in Denmark and has not previously had **5 years of residence**
in Denmark generally needs **permission from Civilstyrelsen** before acquiring
property. EU/EEA citizens who are actually exercising treaty rights here — working,
self-employed, established — are in practice exempt when buying a year-round home
for their own use. For a **sommerhus the rules are markedly stricter**, and
permission is commonly required even for EU citizens who would be exempt for a
year-round home.

Why this outranks everything: without the permission the acquisition cannot
complete. A perfect report on a house the buyer may not legally acquire is worth
nothing.

**How to handle it in the report:**
- If the buyer's status is known (from intake), state which case applies and what
  it implies for their timeline.
- If it is unknown — the usual situation — the report **poses the test explicitly**
  rather than assuming they qualify: current residence in Denmark? EU/EEA
  citizenship? any prior 5 years of Danish residence? year-round home or sommerhus?
  Then: "if any answer puts you outside the exempt group, an application to
  Civilstyrelsen must be resolved before signing — start it early, and tell your
  lawyer at first contact."
- Never state that a specific buyer does or does not need permission as a
  conclusion of ours. We name the test and the authority; the lawyer confirms.
- An unresolved right-to-buy question is a **critical flag** (`MONEY-8`).

## 2. The købsaftale and its clock (`LEGAL-2`)

The købsaftale is the document that binds. When a draft is available it is read
like any other document (`DOC-4`); when it is not, the report still explains the
mechanism, because the buyer will meet it days after a viewing.

### 2.1 Advokatforbehold — the only clean exit
A standard clause making the buyer's signature conditional on their own lawyer
approving the transaction in its entirety. It is **contractual, not statutory** —
it exists only if it is written in, and it is time-limited (a few days is typical).

Check and report: is the clause present; is it whole-transaction ("i sin helhed")
or narrowed to specific points; what is its deadline. A narrowed or missing
advokatforbehold is a material finding — say so plainly.

### 2.2 Fortrydelsesret — 6 days, and it is not free
The statutory right of withdrawal runs **6 hverdage** from the agreement, and
exercising it costs the buyer a **godtgørelse of 1% of the purchase price** to the
seller. Foreign buyers routinely believe either that no cooling-off exists or that
it is free; both errors are expensive.

State the number of days, the cost, and that the deadline is counted in Danish
working days — then say which of the two exits (advokatforbehold or
fortrydelsesret) is the cheaper one to rely on for this deal.

### 2.3 Bankgaranti and deponering
The buyer normally posts a bank guarantee for the purchase sum by a deadline set
in the købsaftale, and later deposits the cash portion with the seller's agent or
lawyer. Missing the deadline is a breach, not an administrative slip. The
guarantee itself carries a bank fee — a real cost that belongs in the one-time
cash line (`MONEY-6`).

### 2.4 Refusionsopgørelse
The settlement drawn up around the handover date (`skæringsdag`): prepaid property
tax, association dues, heating and utilities are apportioned between seller and
buyer. Routinely produces a bill the buyer did not budget for. Report it as an
expected, dated event rather than a surprise.

### 2.5 Overtagelsesdag and the transfer of risk
Risk normally passes on the handover date: from then, damage is the buyer's
problem and the buyer's insurance must already be running. Check that the
købsaftale's handover date, the insurance start date and the financing drawdown
line up — a gap of even a day is a real exposure.

### 2.6 Medfølgende løsøre
What is included: white goods, blinds, garden equipment, the shed. Disputes here
are common and small-but-annoying. If a listing photograph shows something the
buyer is assuming they get, it belongs on the questions list (`OUT-1`).

## 3. Ejerskifteforsikring — read the offer, not the fee (`LEGAL-3`)

Under huseftersynsordningen a seller who supplies tilstandsrapport and
elinstallationsrapport and **offers to pay half the premium** of a standard policy
is released from the normal ten-year liability for defects. So the offer attached
to the salgsopstilling is not paperwork — it is the mechanism that moves risk onto
the buyer.

What the report must say:
- **It does not cover what the reports already describe.** The RØD and GUL findings
  the buyer is worried about are precisely the ones excluded — this is the single
  most misunderstood point in Danish home buying.
- Standard cover is for defects *not* discovered and *not* described. Extended
  cover (`udvidet dækning`) can add things like sewer, but it varies and costs more.
- Cover, excess and exclusions differ materially between insurers — compare at
  least the offer on the table against one alternative.
- The offer **expires with the reports** (`DOC-2`): once the tilstandsrapport is
  past its 6 months, the package must be renewed.
- Sewer is typically outside both the huseftersyn and the standard policy — this
  is where the kloak hole in the system (see `long-term-and-hidden-costs.md`)
  becomes a concrete uninsured exposure.

## 4. Financing structure — facts, not recommendations (`LEGAL-4`)

Never recommend a lender, a product or a rate type. Do state the structure, because
it governs both what this buyer can do and **who can afford to buy it from them
later** — which is a liquidity fact (`investment-and-liquidity.md`).

- **80 / 15 / 5.** For a year-round home: `realkreditlån` up to 80% of value, a bank
  loan for roughly the next 15%, and a **minimum 5% own payment**. For a
  **sommerhus the realkredit ceiling is lower** (commonly 60%), which is why
  holiday homes demand far more cash.
- **Bidragssats.** An ongoing fee on the realkredit loan, charged on top of the
  interest and largely invisible in an advertised rate. Over a 30-year horizon it
  is a material part of the monthly cost — name it.
- **Kurstab / kursskæring.** Bond-based lending is drawn at a price, not at par;
  the difference is a real one-time cost at drawdown.
- **Fixed vs variable, and afdragsfrihed.** State what the salgsopstilling's
  standard-financing box assumes (it is an illustration, not an offer), and that an
  interest-only period defers principal rather than removing it.
- **Affordability testing.** Banks apply credit-policy rules — stress tests, debt
  relative to income, tighter treatment in the largest cities. The buyer must get
  their own number from their own bank; our role is to say that the number exists
  and shapes the next buyer's pool too.
- **Rate sensitivity as a resale factor.** If rates rise, the next buyer can borrow
  less against the same home. In a slow market that caps the resale price — this
  belongs in the asset section, not only here.

## 5. One-time costs at purchase (`MONEY-6`)

Keep these as separate lines; never merge them into one "fees" figure:

1. **Ownership-transfer registration** (`tinglysningsafgift, skøde`) — a percentage
   of the price plus a fixed amount. The skill's working figures are
   **0.6% + 1,850 DKK (2026)**.
2. **Mortgage registration** (`tinglysning af pant`) — only when a mortgage is
   registered. Working figures: **1.25% + 1,825 DKK (2026)**.
3. **Bank, legal and insurance** — own lawyer or køberrådgiver, bank guarantee fee,
   the buyer's half of the ejerskifteforsikring premium, building insurance from
   the handover date.
4. **Renovation reserve** — from the flagged findings, never merged with fees.

> Both statutory rates carry the line **"confirm before signing"**: the percentage
> is stable but the fixed element changes almost annually, and the percentage is
> calculated on the higher of the purchase price and the public valuation. Verify
> the current figures at tinglysning.dk before the number reaches a client.

**Andelsbolig is different** (`TYPE-4`): the transfer is of a share, not real
property, so the 0.6% skøde rule does not apply — use the transfer and registration
fees named in that listing's own documents, and note that `realkreditlån` is not
available at all, only `andelslån` at a personal-loan rate.

## 6. What belongs in the client report

A dedicated section (`usecase-buyer.md` §"Transaction, rights and deadlines")
covering, in the client's language:

1. The right-to-buy test and what to do about it — first, if unresolved.
2. The two exits and their cost: advokatforbehold and the 6-day/1% withdrawal.
3. A dated timeline: signature → lawyer approval deadline → guarantee → deposit →
   handover, with who acts at each step.
4. What the ejerskifteforsikring offer on the table does and does not cover.
5. The financing structure and the cash actually needed on day one.
6. The questions for the lawyer, and the questions for the bank — separated, since
   they are different appointments.
