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
        title: 'Marca',
        icon: 'paintbrush',
        items: [
          { value: 'deviante', title: 'Deviante' },
          { value: 'flashbrix', title: 'Flashbrix' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'deviante' },
  decorators: [withBrand],
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
  },
}

export default preview
