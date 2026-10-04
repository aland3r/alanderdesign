# Criar um componente novo pelo código

Tutorial passo a passo para criar um componente à mão no front-end de um produto (Flashbrix, Deviante ou Portfolio) usando o Alander Design System (ADS) e, quando fizer sentido, levá-lo para dentro do ADS.

O exemplo é um **Accordion** (lista de perguntas que abrem e fecham), mas os passos valem para qualquer componente.

> Para começar a partir de uma tela no Figma, veja [criar-componente-pelo-figma.md](./criar-componente-pelo-figma.md). Os passos de código daquele guia são estes aqui.

---

## Antes de começar: o mapa

```text
primitivo        →  semântico                 →  componente
#4541c0             color.action.primary          .button { background: var(--color-action-primary) }
(valor cru)         (intenção, mesmo nome         (só lê semânticos)
                     em todas as marcas)
```

- **Primitivo**: o valor cru de cada marca (`indigo.600 = #4541c0`). Fica em `alander-src-packages/tokens/src/**/primitives.json`.
- **Semântico**: o nome com intenção (`color.action.primary`). A base define todos; cada marca troca só o que é diferente. Fica em `semantic.json`.
- **Componente**: lê só semânticos, como variáveis CSS (`var(--color-action-primary)`). Nunca um hex ou um px solto.
- **Família**: a pasta onde o componente mora (`button`, `field`, `text`...). É organização, não uma camada de token.

A troca de marca acontece sozinha: o `BrandProvider` coloca `data-brand="flashbrix"` na página, e cada marca define os mesmos nomes de variável com valores próprios.

---

## Passo 1. Ligue o produto ao ADS (uma vez por projeto)

No projeto do produto (por exemplo `C:\gestalt\flashbrix-web`):

```sh
pnpm add @alander/react@link:../alanderdesign/alander-src-packages/react
pnpm add @alander/tokens@link:../alanderdesign/alander-src-packages/tokens
```

`link:` aponta para a pasta local, então uma mudança no ADS aparece na hora no produto. Para o deploy (Vercel), os pacotes precisam estar publicados; até lá, isso funciona só na sua máquina.

Envolva o app no `BrandProvider`, uma vez, no topo:

```tsx
// src/main.tsx
import { BrandProvider } from '@alander/react'

createRoot(document.getElementById('root')!).render(
  <BrandProvider brand="flashbrix">
    <App />
  </BrandProvider>,
)
```

O `BrandProvider` já importa os tokens (as variáveis CSS de todas as marcas) e as fontes.

## Passo 2. Confira se o componente já existe

1. Abra o Storybook do ADS (`pnpm storybook` dentro de `alanderdesign`, em http://localhost:6006).
2. Procure na barra lateral, em **Families**.
3. Veja também `alander-src-packages/react/src/index.ts`: tudo que o ADS exporta está ali.

Se existe, use o do ADS e pare aqui. Se existe quase igual, a resposta costuma ser uma prop nova no componente do ADS, não um componente novo.

## Passo 3. Escreva a API antes do código

Decida o que quem usa o componente vai escrever. Para o Accordion:

```tsx
<Accordion>
  <AccordionItem title="Como funciona a repetição espaçada?">
    O Flashbrix mostra de novo os cartões que você errou...
  </AccordionItem>
  <AccordionItem title="Posso estudar offline?" defaultOpen>
    Sim...
  </AccordionItem>
</Accordion>
```

Perguntas que valem fazer:

- **Quais props?** Só o necessário (`title`, `children`, `defaultOpen`). Cada prop a mais é algo a manter.
- **Controlado ou não?** Comece não controlado (`defaultOpen`). Adicione `open` + `onOpenChange` quando alguém precisar.
- **Qual elemento HTML?** Prefira o nativo. Aqui, `<details>` e `<summary>` já abrem e fecham, funcionam no teclado e são anunciados pelo leitor de tela.
- **Composição ou array?** Filhos (`<AccordionItem>`) dão mais liberdade que uma prop `items={[...]}`.

## Passo 4. Liste os tokens que o componente precisa

Para cada decisão visual, ache o token semântico. Use a tabela de tokens do Storybook (**Foundations › Tokens**, aba *Semantic* ou *By Family*).

| Parte | Decisão | Token |
| --- | --- | --- |
| Borda entre itens | cor de borda padrão | `--color-border-default` |
| Título | texto forte, peso de rótulo | `--color-text-strong`, `--font-weight-label` |
| Conteúdo | texto padrão | `--color-text-default` |
| Espaçamento interno | inset médio | `--space-inset-md` |
| Foco | anel de foco | `--color-focus-ring` |
| Hover do título | fundo leve ao passar o mouse | **não existe** |

### Quando falta um token

Não escreva o valor no componente. Crie um token semântico novo **na base** do ADS, e o valor do produto como override:

```jsonc
// alanderdesign/alander-src-packages/tokens/src/base/semantic.json
"color": {
  "background": {
    "hover": { "$type": "color", "$value": "{color.gray.50}" }
  }
}
```

```jsonc
// alanderdesign/alander-src-packages/tokens/src/brands/flashbrix/semantic.json
"color": {
  "background": {
    "hover": { "$type": "color", "$value": "{color.navy.800}" }
  }
}
```

Regras:

- O nome descreve a **intenção**, não o componente nem a cor (`color.background.hover`, não `accordionGray`).
- Todo token nasce na base. O build recusa um token que exista só numa marca.
- Se a marca precisa de uma cor que ainda não existe, ela vira um primitivo em `brands/<marca>/primitives.json`.

Depois rode, dentro de `alanderdesign`:

```sh
pnpm tokens      # gera as variáveis CSS
pnpm typecheck   # confere o contrato de nomes e o contraste AA
```

Agora `var(--color-background-hover)` existe em todas as marcas.

## Passo 5. Crie os arquivos

No produto, uma pasta por família e uma por componente, igual ao ADS (assim a promoção do passo 9 é só mover a pasta):

```text
src/components/accordion/
  Accordion/
    Accordion.tsx
    Accordion.module.css
```

```tsx
// Accordion.tsx
import type { ReactNode } from 'react'
import styles from './Accordion.module.css'

export interface AccordionProps {
  className?: string
  children: ReactNode
}

export function Accordion({ className, children }: AccordionProps) {
  return <div className={[styles.accordion, className].filter(Boolean).join(' ')}>{children}</div>
}

export interface AccordionItemProps {
  title: ReactNode
  /** Começa aberto. */
  defaultOpen?: boolean
  children: ReactNode
}

export function AccordionItem({ title, defaultOpen = false, children }: AccordionItemProps) {
  return (
    <details className={styles.item} open={defaultOpen}>
      <summary className={styles.summary}>{title}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  )
}
```

```css
/* Accordion.module.css: só tokens semânticos, nenhum valor solto */
.accordion {
  border-top: 1px solid var(--color-border-default);
}

.item {
  border-bottom: 1px solid var(--color-border-default);
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-inset-md);
  padding: var(--space-inset-md);
  font-weight: var(--font-weight-label);
  color: var(--color-text-strong);
  cursor: pointer;
  list-style: none;
}

.summary::-webkit-details-marker {
  display: none;
}

.summary::after {
  content: '+';
}

.item[open] .summary::after {
  content: '−';
}

.summary:hover {
  background: var(--color-background-hover);
}

.summary:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.content {
  padding: 0 var(--space-inset-md) var(--space-inset-md);
  color: var(--color-text-default);
}
```

Por que **CSS Modules**: as classes ficam com nome único por arquivo (sem conflito entre componentes), e o CSS continua sendo CSS comum, lendo variáveis.

Bordas de `1px` são a exceção aceita: espessura de linha não muda por marca. Se um dia mudar, vira token.

## Passo 6. Acessibilidade

Confira antes de usar na tela:

- [ ] Funciona só no teclado: `Tab` chega no título, `Enter` ou `Espaço` abre e fecha.
- [ ] O foco é visível (`:focus-visible` com o anel de foco).
- [ ] O leitor de tela anuncia "recolhido/expandido" (o `<summary>` nativo já faz isso).
- [ ] Contraste do texto com o fundo passa em AA (4,5:1). O `pnpm typecheck` do ADS confere os pares conhecidos; para um par novo, adicione-o em `tokens/check-contrast.mjs`.
- [ ] Nada depende só de cor para ter significado.
- [ ] Se tiver animação, ela respeita `prefers-reduced-motion`.

## Passo 7. Use na tela

```tsx
import { Accordion, AccordionItem } from './components/accordion/Accordion/Accordion'

<Accordion>
  <AccordionItem title="Como funciona a repetição espaçada?">...</AccordionItem>
</Accordion>
```

Teste a tela em mobile, tablet e desktop (768px e 1024px são os pontos de quebra do ADS).

## Passo 8. Decida onde o componente mora

| O componente é... | Onde fica |
| --- | --- |
| Genérico (accordion, modal, tabs, card, tooltip) | Vai para o ADS (passo 9) |
| Específico de uma tela de um produto (o cartão de estudo do Flashbrix) | Fica no produto. Sobe para o ADS quando um segundo produto precisar |

Mesmo ficando no produto, ele usa só tokens do ADS. Isso já o deixa pronto para ser promovido depois.

## Passo 9. Promova para o ADS

1. Mova a pasta para `alanderdesign/alander-src-packages/react/src/components/accordion/Accordion/`.
2. Use o helper de classes do ADS: `import { cx } from '../../../utils/cx'`.
3. Exporte em `alander-src-packages/react/src/index.ts`:

   ```ts
   export { Accordion, AccordionItem } from './components/accordion/Accordion/Accordion'
   export type { AccordionProps, AccordionItemProps } from './components/accordion/Accordion/Accordion'
   ```

4. Crie a história `storybook/stories/Accordion.stories.tsx`:

   ```tsx
   import type { Meta, StoryObj } from '@storybook/react-vite'
   import { Accordion, AccordionItem } from '@alander/react'
   import { Canvas } from './Canvas'

   const meta = {
     title: 'Families/Accordion/Accordion',
     decorators: [(Story) => <Canvas><Story /></Canvas>],
   } satisfies Meta

   export default meta
   type Story = StoryObj<typeof meta>

   export const Default: Story = {
     render: () => (
       <Accordion>
         <AccordionItem title="Primeira pergunta">Resposta.</AccordionItem>
         <AccordionItem title="Segunda pergunta" defaultOpen>Resposta aberta.</AccordionItem>
       </Accordion>
     ),
   }
   ```

5. Troque a marca na barra do Storybook (Base, Portfolio, Deviante, Flashbrix) e veja se o componente funciona em todas. O painel **Accessibility** mostra problemas de a11y.
6. Rode `pnpm typecheck` e `pnpm build-storybook`. Abra um PR.
7. No produto, troque o import para `import { Accordion, AccordionItem } from '@alander/react'` e apague a cópia local.

## Checklist de "pronto"

- [ ] Não existia nada parecido no ADS.
- [ ] API pequena, com elemento HTML nativo sempre que possível.
- [ ] CSS só com `var(--...)` semânticos. Token novo nasceu na base.
- [ ] Acessível no teclado e no leitor de tela, contraste AA.
- [ ] Testado em todas as marcas e nos três tamanhos de tela.
- [ ] Se for genérico: está no ADS, exportado no `index.ts`, com história em `Families/<família>`.

---

## Para entrevistas

Conceitos que esse fluxo mostra e como explicá-los em uma frase.

**Design tokens.** "Decisões de design guardadas como dados, com nome, para que design e código usem a mesma fonte. Os nossos são gerados com Style Dictionary em variáveis CSS e JSON."

**Primitivo e semântico.** "O primitivo diz *o que* é (`indigo.600`), o semântico diz *para que serve* (`color.action.primary`). Componentes leem só semânticos, então trocar de marca é trocar o mapeamento, não o componente."

**Por que não temos tokens de componente.** "Escolhemos duas camadas para ficar simples. Quando um componente precisa de algo próprio, criamos um semântico mais específico. É uma troca: menos flexibilidade por componente, muito menos tokens para manter." Saiba dizer o outro lado: sistemas grandes (Material, Spectrum) têm a terceira camada porque muitos times precisam ajustar componentes isolados.

**Theming multimarca.** "Uma base neutra define o contrato inteiro; cada marca sobrescreve só o que difere. O build falha se uma marca inventar um nome que a base não tem, e falha se um par de cores cair abaixo de AA."

**Acessibilidade.** "Começo pelo HTML nativo (`button`, `details`, `label`), porque ele já resolve teclado e leitor de tela. Depois foco visível, contraste e `prefers-reduced-motion`."

**API de componente.** "Poucas props, nomes que descrevem intenção (`variant="primary"`, não `color="indigo"`), não controlado primeiro, composição por filhos quando a estrutura varia."

**Contribuição.** "Componente genérico nasce ou é promovido para o sistema com história no Storybook e checagens no build. O específico fica no produto, mas já nasce usando tokens."

Perguntas que costumam aparecer:

- *Como você evita que o sistema e o produto se separem?* Um só pacote de tokens, componentes do produto proibidos de usar valor solto, e um caminho claro de promoção.
- *Como você mede que o design system está sendo usado?* Quantos componentes do produto vêm do pacote, quantos valores soltos ainda existem no CSS (dá para procurar `#` e `px` nos `.module.css`).
- *O que você faria diferente em escala?* Versionar e publicar os pacotes, testes visuais por marca (Chromatic ou Playwright), changelog, e talvez tokens de componente se muitos times precisarem ajustar peças isoladas.
