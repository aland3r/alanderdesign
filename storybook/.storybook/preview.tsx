import type { Decorator, Preview } from '@storybook/react-vite'
import { BrandProvider, type Brand } from '@alander/react'

const withBrand: Decorator = (Story, context) => {
  const brand = context.globals.brand as Brand
  return (
    <BrandProvider brand={brand}>
      <Story />
    </BrandProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'ADS brand',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'base', title: 'Base (ADS)' },
          { value: 'portfolio', title: 'Portfolio' },
          { value: 'deviante', title: 'Deviante' },
          { value: 'flashbrix', title: 'Flashbrix' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'base' },
  decorators: [withBrand],
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    // The first story in this order is shown on load: the welcome page.
    options: { storySort: { order: ['Introduction', 'Patterns', ['Login'], 'Foundations', 'Families'] } },
  },
}

export default preview
