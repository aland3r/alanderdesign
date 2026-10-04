# Criar um componente novo a partir do Figma

Tutorial passo a passo para desenhar um componente no Figma e espelhá-lo no código do produto usando o Alander Design System (ADS), sem que design e código se separem.

O exemplo continua sendo o **Accordion** de [criar-componente-pelo-codigo.md](./criar-componente-pelo-codigo.md). Este guia cobre a parte do Figma e a tradução para o código; a parte de código propriamente dita está naquele guia.

---

## Antes de começar: os arquivos e os nomes

Três arquivos de Figma:

| Arquivo | O que tem |
| --- | --- |
| **ADS** (biblioteca) | Coleções de variáveis *Primitives* e *Semantic*, e os componentes que já estão no ADS. Publicado como biblioteca |
| **Flashbrix** | Telas do Flashbrix. Usa a biblioteca ADS |
| **Deviante** | Telas do Deviante. Usa a biblioteca ADS |

A coleção *Semantic* tem um **modo por marca** (Base, Portfolio, Deviante, Flashbrix). Trocar o modo de um frame no Figma é o mesmo que trocar o `data-brand` no código.

O nome é o mesmo nos três lugares, só muda o separador:

| Figma (variável) | Token (JSON) | CSS |
| --- | --- | --- |
| `color/action/primary` | `color.action.primary` | `var(--color-action-primary)` |
| `space/inset/md` | `space.inset.md` | `var(--space-inset-md)` |
| `radius/control` | `radius.control` | `var(--radius-control)` |

Essa correspondência é o que faz o handoff funcionar: quem lê o Figma no Dev Mode já sabe o nome da variável CSS.

> Se a biblioteca ADS ainda não existe no Figma, crie as duas coleções com os mesmos nomes de `alander-src-packages/tokens/src/base/*.json`. A tabela **Foundations › Tokens** do Storybook mostra todos os nomes e valores por marca.

---

## Passo 1. Confira se o componente já existe

Antes de desenhar, procure nos **Assets** da biblioteca ADS e no Storybook (**Families**). Se existe, use a instância. Se existe quase igual, o caminho é uma variante ou propriedade nova no componente da biblioteca, não um componente novo.

## Passo 2. Desenhe com variáveis, nunca com valores soltos

No arquivo do produto, desenhe o Accordion em um frame:

1. **Auto layout em tudo.** Item: auto layout vertical. Título: auto layout horizontal com o texto e o ícone `+`, com *space between*.
2. **Cores só por variável semântica.** Fill do título no hover: `color/background/hover`. Texto do título: `color/text/strong`. Borda: `color/border/default`. Se o painel mostrar um hex em vez de um nome, a cor está solta.
3. **Espaços e raios por variável.** Padding do título: `space/inset/md`. Gap: `space/inset/md`.
4. **Texto por estilo ou variável de tipografia.** Família, tamanho e peso ligados às variáveis `font/...`.
5. **Teste as marcas:** troque o modo da coleção *Semantic* no frame (Base, Deviante, Flashbrix). O componente tem que ficar certo em todas sem você mexer nele.

Se precisar de um valor que nenhuma variável tem (um fundo de hover, por exemplo), **pare e crie a variável semântica na biblioteca ADS**, com valor em todos os modos. No código, o mesmo token entra na base (passo 4 do guia de código). Nunca crie a variável só no arquivo do produto.

## Passo 3. Transforme em componente com propriedades que viram props

Selecione o item e crie um componente (`Ctrl+Alt+K`). Defina as propriedades pensando nas props do código:

| Propriedade no Figma | Tipo | Prop no código |
| --- | --- | --- |
| `Title` | Texto | `title` |
| `Open` (`true`/`false`) | Variante ou booleana | `defaultOpen` |
| `Content` | Slot / instance swap | `children` |

E os **estados** de interação como variantes só para documentar: `State = Default / Hover / Focus`. No código eles não viram props: são `:hover` e `:focus-visible` no CSS.

Nomeie com a família na frente, igual à pasta do código: `Accordion/Item`.

Regra de ouro: **cada propriedade do Figma tem uma prop correspondente, com o mesmo nome**, e o código não tem prop que o Figma não mostra. Se as duas listas não batem, uma delas está errada.

## Passo 4. Prepare o handoff

1. Na descrição do componente, escreva para que serve e quando **não** usar.
2. Anote acessibilidade no próprio frame: ordem do foco, o que o leitor de tela anuncia ("botão, recolhido"), como funciona no teclado.
3. Marque o frame como **Ready for dev**.
4. No Dev Mode, clique em cada camada e confira se aparecem **nomes de variável**, não valores. É isso que o desenvolvedor (ou você) vai copiar.

## Passo 5. Traduza o Figma para o código

Abra o componente no Dev Mode e traduza camada por camada:

| No Figma | No CSS |
| --- | --- |
| Auto layout vertical / horizontal | `display: flex; flex-direction: column / row` |
| Gap | `gap: var(--space-...)` |
| Padding | `padding: var(--space-...)` |
| *Space between* | `justify-content: space-between` |
| Alinhamento | `align-items: ...` |
| *Hug contents* | largura automática (não declarar) |
| *Fill container* | `flex: 1` ou `width: 100%` |
| Fill | `background: var(--color-...)` |
| Stroke | `border: 1px solid var(--color-border-...)` |
| Corner radius | `border-radius: var(--radius-...)` |
| Estilo de texto | `font-family`, `font-size`, `font-weight` com `var(--font-...)` |
| Variante `State=Hover` | `:hover` |
| Variante `State=Focus` | `:focus-visible` |
| Propriedade `Open` | atributo `open` do `<details>` |

E a estrutura vira HTML semântico, não `div` para tudo: o título clicável é um `<summary>`, o item é um `<details>`.

Depois siga o [guia de código](./criar-componente-pelo-codigo.md) dos passos 3 a 7 (API, tokens, arquivos, acessibilidade, usar na tela).

## Passo 6. Compare lado a lado

Abra o frame do Figma e a história do Storybook (ou a tela do produto) lado a lado, na mesma largura, e compare em **cada marca**:

- [ ] Espaçamentos e alturas iguais (use a régua do Figma e o inspetor do navegador).
- [ ] Cores iguais em todos os modos/marcas.
- [ ] Mesma tipografia (família, tamanho, peso, caixa).
- [ ] Estados hover e foco iguais aos das variantes.
- [ ] Em mobile, tablet (768px) e desktop (1024px), o comportamento é o que o design previu.

Diferença encontrada: decida qual lado está certo e corrija **aquele** lado. Se o design mudou, o Figma é atualizado; se o código desviou, o código volta.

## Passo 7. Promova para a biblioteca ADS

Quando o componente for genérico (passo 8 do guia de código):

1. **Código:** mova para `alander-src-packages/react/src/components/accordion/` e crie a história em `Families/Accordion` (passo 9 do guia de código).
2. **Figma:** recorte o componente do arquivo do produto e cole no arquivo ADS, na página da família `Accordion`. Publique a biblioteca.
3. No arquivo do produto, aceite a atualização da biblioteca: as instâncias passam a apontar para o componente do ADS.
4. Na descrição do componente no Figma, coloque o link da história no Storybook.

Opcional, quando estiver estável: **Code Connect** liga o componente do Figma ao `<Accordion>` do código, e o Dev Mode passa a mostrar o trecho de código real em vez de CSS gerado.

## Checklist de "pronto"

- [ ] No Figma, nenhum hex ou número solto: tudo é variável da biblioteca ADS.
- [ ] Funciona em todos os modos da coleção *Semantic*.
- [ ] Propriedades do Figma = props do código, com os mesmos nomes.
- [ ] Estados e acessibilidade anotados.
- [ ] Comparado lado a lado nas marcas e nos três tamanhos de tela.
- [ ] Se for genérico: está na biblioteca ADS e no pacote `@alander/react`, com o link entre os dois.

---

## Para entrevistas

**Handoff.** "O handoff é um contrato, não uma entrega: as variáveis do Figma têm o mesmo nome dos tokens do código, e as propriedades do componente têm o mesmo nome das props. Assim ninguém precisa traduzir valor nenhum."

**Fonte da verdade.** "Para valores, a fonte é o pacote de tokens; o Figma espelha. Para intenção visual, o Figma lidera, e o código acompanha. Quando divergem, decidimos qual lado está certo e corrigimos aquele."

**Modos e theming.** "Uma coleção de variáveis semânticas com um modo por marca. É a mesma coisa que o `data-brand` no código: o componente não sabe qual marca está usando."

**Auto layout é CSS flexbox.** "Desenho com auto layout porque ele vira flexbox quase um para um. Se um layout não dá para fazer com auto layout, provavelmente vai dar trabalho no código também."

**Variantes e props.** "Variantes que mudam conteúdo ou estrutura viram props. Variantes de estado (hover, foco) existem só para documentar e viram pseudo-classes do CSS."

Perguntas que costumam aparecer:

- *Como você mantém Figma e código sincronizados?* Mesmos nomes de variável e token, propriedades = props, comparação lado a lado antes de entregar, e (em escala) tokens exportados do mesmo arquivo para os dois lados e Code Connect.
- *O que você faz quando o designer usa um valor que não está no sistema?* Pergunto qual é a intenção. Se é uma necessidade real, vira um token semântico novo nos dois lados; se não, uso o token existente mais próximo.
- *Como você documenta um componente?* Para que serve, quando não usar, props/propriedades, estados, acessibilidade e um exemplo vivo no Storybook.
