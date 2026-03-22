# QoreDB Landing Page — Fixes actionnables

> Review UX/UI complète — Mars 2026
> Classés par priorité d'impact sur la conversion.

---

## 🔴 Priorité 1 — Impact critique sur la conversion

### FIX-01 · Réintégrer la WhySection dans la page
- **Problème :** La section "problem statement" (Current tools slow you down) existe dans le code mais n'est PAS rendue sur la landing. Le visiteur ne passe jamais par l'empathie avant de voir les features.
- **Impact :** Le flow narratif Problem → Solution → Proof est cassé. Sans tension émotionnelle, les features tombent à plat.
- **Fichiers :**
  - `app/[locale]/page.tsx` — Ajouter l'import et le rendu de `WhySection`
  - `components/landing/why-section.tsx` — Déjà prêt, aucune modification nécessaire
- **Action :**
  - [ ] Importer `WhySection` dans `page.tsx`
  - [ ] L'insérer **avant** `FeaturesSection` (après `SocialProofBar`)
  - [ ] Vérifier le rendu mobile
- **Placement cible :** Hero → DatabaseStrip → SocialProofBar → **WhySection** → FeaturesSection → ...

---

### FIX-02 · Ajouter de la vraie preuve sociale
- **Problème :** Zéro preuve sociale sur la page. Pas de GitHub stars, pas de témoignages, pas de compteur de downloads. La clé `hero.social_proof` ("Join 100+ developers waiting for the beta") existe dans le JSON mais n'est jamais rendue.
- **Impact :** Un développeur ne fait pas confiance à un outil sans signaux sociaux. C'est le facteur #1 de conversion manquant.
- **Fichiers :**
  - `components/landing/social-proof-bar.tsx` — Transformer en vraie social proof ou créer un nouveau composant
  - `lib/github.ts` — Le helper GitHub API existe déjà, l'utiliser pour fetch les stars
  - `locales/en/common.json` + `locales/fr/common.json` — La clé `hero.social_proof` existe déjà
- **Actions :**
  - [ ] Créer un composant `GitHubStars` qui fetch dynamiquement le nombre de stars via `lib/github.ts`
  - [ ] Afficher le compteur de stars à côté du bouton "View on GitHub" dans le hero
  - [ ] Rendre la clé `hero.social_proof` ("Join 100+ developers...") quelque part dans le hero (sous les CTAs)
  - [ ] Renommer `SocialProofBar` en `StatsBar` (c'est des specs techniques, pas de la social proof)
  - [ ] À terme : ajouter 2-3 quotes de beta testers quand disponibles

---

### FIX-03 · Simplifier le hero carousel → une seule capture
- **Problème :** Le carousel 7 slides dilue l'attention. Le premier slide (Database Overview = liste de tables) n'est pas impressionnant. Les slides Settings et New Connection sont anti-vente.
- **Impact :** Le hero est le moment de la première impression. Un carousel demande un effort cognitif, une image unique frappe instantanément.
- **Fichiers :**
  - `components/landing/hero.tsx` — Remplacer le carousel par une image statique
- **Actions :**
  - [ ] Remplacer le carousel par **une seule image** : `er-diagram-screen.png` (le plus visuellement impressionnant) ou `query-screen.png`
  - [ ] Supprimer toute la logique carousel (state `activeIndex`, `direction`, `timerRef`, fonctions `goTo`/`goPrev`/`goNext`, les dots, les flèches)
  - [ ] Garder le container avec le glow et le border, juste avec une `<Image>` statique
  - [ ] Réutiliser la présentation multi-vues dans la `PreviewSection` plus bas (voir FIX-04)

---

## 🟠 Priorité 2 — Améliorations structurelles fortes

### FIX-04 · Réintégrer la PreviewSection
- **Problème :** Le composant `PreviewSection` (showcase interactif avec tabs + auto-rotation + timer bar) existe mais n'est pas sur la page. C'est la meilleure façon de montrer le produit en détail.
- **Fichiers :**
  - `app/[locale]/page.tsx` — Ajouter l'import et le rendu
  - `components/landing/preview-section.tsx` — Déjà prêt
- **Actions :**
  - [ ] Importer `PreviewSection` dans `page.tsx`
  - [ ] L'insérer **après** `FeaturesSection` et **avant** `FeatureShowcase`
  - [ ] Vérifier que les screenshots ne sont pas redondants avec le hero (si hero est maintenant une seule image, c'est OK)
- **Placement cible :** ... → FeaturesSection → **PreviewSection** → FeatureShowcase → ...

---

### FIX-05 · Corriger l'incohérence 8 vs 9 bases de données
- **Problème :** Le hero subtitle dit "9 databases", la features section dit "8 Native Drivers", le DatabaseStrip affiche 8 logos, et le `social_proof` dit "9 databases". Un dev remarque immédiatement ce genre d'incohérence.
- **Fichiers :**
  - `locales/en/common.json` — Clés `hero.subtitle`, `features.items.unified.title`, `features.items.unified.desc`, `social_proof.databases`
  - `locales/fr/common.json` — Mêmes clés en français
  - `components/landing/database-strip.tsx` — Le tableau `databases` contient 8 entrées (manque MariaDB ou le 9ème)
- **Actions :**
  - [ ] Décider du nombre exact de bases supportées
  - [ ] Harmoniser dans les deux fichiers de traduction (EN + FR)
  - [ ] Mettre à jour le `DatabaseStrip` si nécessaire (ajouter le logo manquant ou corriger le chiffre)
  - [ ] Vérifier aussi la `ComparisonTable` (`comparison.values.qoredb.multidb`: "9 engines")

---

### FIX-06 · Ajouter un CTA intermédiaire
- **Problème :** Sur une page longue (Features grid + Feature showcase + Comparison), il n'y a que 2 emplacements de CTA (hero + fin de page). Le momentum se perd au milieu.
- **Fichiers :**
  - `app/[locale]/page.tsx` — Ajouter un CTA entre FeatureShowcase et ComparisonTable
  - `components/landing/cta-section.tsx` — Peut être réutilisé ou créer une variante plus légère (inline CTA)
- **Actions :**
  - [ ] Créer un composant `InlineCTA` (plus léger que `CTASection`, juste une ligne avec texte + bouton)
  - [ ] L'insérer entre `FeatureShowcase` et `ComparisonTable`
  - [ ] Texte suggéré : "Ready to try? Download QoreDB for free →"

---

### FIX-07 · Rendre la ComparisonTable honnête
- **Problème :** QoreDB gagne sur TOUTES les lignes. Les devs détectent immédiatement ce biais. Ça affaiblit la crédibilité au lieu de la renforcer.
- **Fichiers :**
  - `locales/en/common.json` — Clés `comparison.values.*`
  - `locales/fr/common.json` — Idem
- **Actions :**
  - [ ] Reconnaître 1-2 forces des concurrents : ex. DBeaver → "Rich plugin ecosystem", TablePlus → "Polished macOS native UX"
  - [ ] Ajouter une ligne "Plugin ecosystem" ou "Maturity" où QoreDB perd honnêtement (ex. "New" ou "Growing")
  - [ ] Optionnel : ajouter une note sous la table du type "We're young but moving fast. Check our roadmap →"

---

## 🟡 Priorité 3 — Polish et crédibilité

### FIX-08 · Corriger le footer hardcodé en français
- **Problème :** "Fait avec ♥ par" est en dur dans `footer.tsx` au lieu d'utiliser i18n. Casse la cohérence sur la version anglaise.
- **Fichiers :**
  - `components/landing/footer.tsx` — Ligne ~162
  - `locales/en/common.json` — La clé `footer.made_with_love` existe déjà ("Made with {{heart}} by")
  - `locales/fr/common.json` — Vérifier la clé FR aussi
- **Actions :**
  - [ ] Remplacer le texte hardcodé par `t("footer.made_with_love", { heart: "♥" })`
  - [ ] Vérifier le rendu en EN et FR

---

### FIX-09 · Vérifier/supprimer le badge "Launching on Product Hunt"
- **Problème :** Si le lancement est passé, ce badge donne une impression de page figée et non maintenue. Si le lancement n'a pas eu lieu, il faut un lien vers PH.
- **Fichiers :**
  - `components/landing/hero.tsx` — Lignes 86-94 (le badge en haut du hero)
  - `locales/en/common.json` — Clé `hero.ph_badge`
  - `locales/fr/common.json` — Idem
- **Actions :**
  - [ ] Si lancement PH passé → remplacer par un badge dynamique (ex. "★ 150 stars on GitHub" ou "Now available — Download v1.x")
  - [ ] Si lancement PH à venir → ajouter un lien cliquable vers la page Product Hunt
  - [ ] Si aucun des deux → supprimer complètement le badge

---

### FIX-10 · Ajouter un mini pricing sur la landing
- **Problème :** "Free / Pro" apparaît dans la ComparisonTable mais le visiteur n'a aucune idée de ce que Pro inclut ni du prix. Il doit cliquer vers /pricing, ce que la plupart ne feront pas.
- **Fichiers :**
  - Nouveau composant à créer : `components/landing/pricing-preview.tsx`
  - `app/[locale]/page.tsx` — L'ajouter avant le CTA final
  - `locales/en/common.json` + `locales/fr/common.json` — Nouvelles clés
- **Actions :**
  - [ ] Créer un composant `PricingPreview` avec 2 colonnes (Core: Free / Pro: $X/mo)
  - [ ] Lister 3-4 features clés de chaque plan (pas le détail complet)
  - [ ] Lien "See full comparison →" vers /pricing
  - [ ] Insérer avant `CTASection`

---

### FIX-11 · Remplacer l'email @gmail par un email pro
- **Problème :** `qoredb@gmail.com` dans le footer pour un outil qui se positionne comme professionnel est un signal négatif.
- **Fichiers :**
  - `components/landing/footer.tsx` — Ligne 63 (`mailto:qoredb@gmail.com`)
- **Actions :**
  - [ ] Acheter/configurer le domaine email (ex. `contact@qoredb.dev` ou `hello@qoredb.com`)
  - [ ] Mettre à jour le lien mailto dans le footer

---

### FIX-12 · Améliorer l'accessibilité mobile de la ComparisonTable
- **Problème :** 4 colonnes avec `overflow-x-auto` = scroll horizontal invisible sur mobile. La plupart des utilisateurs ne le découvriront pas.
- **Fichiers :**
  - `components/landing/comparison-table.tsx`
- **Actions :**
  - [ ] Option A : Ajouter un indicateur visuel de scroll horizontal (flèche ou gradient de fade sur les bords)
  - [ ] Option B : Sur mobile, transformer en cards empilées (chaque concurrent = une card avec ses valeurs)
  - [ ] Tester sur viewport 375px (iPhone SE)

---

### FIX-13 · Rendre les flèches du carousel accessibles sur tactile (si carousel gardé)
- **Problème :** Les flèches prev/next utilisent `opacity-0 group-hover:opacity-100` — invisible sur mobile (pas de hover).
- **Fichiers :**
  - `components/landing/hero.tsx` — Lignes 229-240
  - Même pattern dans `preview-section.tsx` si elle a des contrôles similaires
- **Actions :**
  - [ ] Si FIX-03 est appliqué (suppression carousel hero), ce fix devient non-applicable pour le hero
  - [ ] Pour tout carousel restant : rendre les contrôles toujours visibles sur mobile (`opacity-100 md:opacity-0 md:group-hover:opacity-100`)
  - [ ] Ajouter le support swipe (touch events ou lib comme `use-gesture`)

---

### FIX-14 · Améliorer le copywriting des sections clés
- **Problème :** Certains textes sont génériques ou mous.
- **Fichiers :**
  - `locales/en/common.json` + `locales/fr/common.json`
- **Actions :**
  - [ ] `features.title` : "What QoreDB does well" → quelque chose de plus incisif (ex. "Everything you need, nothing you don't")
  - [ ] `features.subtitle` : "Designed for developers who want a tool that just works" → trop cliché, remplacer par du concret (ex. "8 drivers, one interface. No Electron, no cloud dependency.")
  - [ ] Appliquer les mêmes corrections en FR

---

## Récap — Ordre d'exécution recommandé

| Ordre | Fix | Effort estimé | Impact |
|-------|-----|---------------|--------|
| 1 | FIX-01 WhySection | 10 min | 🔴 Critique |
| 2 | FIX-03 Hero → image unique | 30 min | 🔴 Critique |
| 3 | FIX-04 PreviewSection | 10 min | 🟠 Fort |
| 4 | FIX-05 Incohérence 8/9 DB | 15 min | 🟠 Fort |
| 5 | FIX-08 Footer i18n | 5 min | 🟡 Quick win |
| 6 | FIX-09 Badge PH | 10 min | 🟡 Quick win |
| 7 | FIX-02 Social proof | 1-2h | 🔴 Critique |
| 8 | FIX-06 CTA intermédiaire | 30 min | 🟠 Fort |
| 9 | FIX-07 Comparison honnête | 20 min | 🟠 Fort |
| 10 | FIX-14 Copywriting | 30 min | 🟡 Polish |
| 11 | FIX-10 Mini pricing | 1h | 🟡 Polish |
| 12 | FIX-11 Email pro | 15 min (hors config DNS) | 🟡 Polish |
| 13 | FIX-12 Table mobile | 45 min | 🟡 Polish |
| 14 | FIX-13 Tactile carousel | 20 min | 🟡 Conditionnel |

> **Temps total estimé : ~6-8h de travail dev**
> Les 5 premiers fixes (2h) couvrent 80% de l'impact.
