import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthLayout, BrandProvider, Link, LoginForm, type LoginFormProps } from '@alander/react'

/* Copy taken from each product's current LoginPage. */
const copy = {
  deviante: {
    form: {
      notice: 'O acesso é liberado pelo responsável, conta por conta. Entre com a conta Google autorizada.',
      legal: (
        <>
          Ao continuar, você aceita os <Link href="#">Termos de Uso</Link>.
        </>
      ),
    } satisfies LoginFormProps,
    hero: {
      heroEyebrow: 'Gestão de manutenção industrial',
      heroHeadline: 'Decisões preventivas antes da falha dos equipamentos',
    },
  },
  flashbrix: {
    form: {
      title: 'Criar conta',
      description: 'Beta aberto: Google cria a conta na hora. Depois você vê o tutor e pode pagar o PIX de R$80.',
      googleLabel: 'Cadastrar com Google',
    } satisfies LoginFormProps,
    hero: {},
  },
}

function LoginPage({ brand, ...state }: { brand: 'deviante' | 'flashbrix' } & Pick<LoginFormProps, 'loading' | 'error'>) {
  return (
    <BrandProvider brand={brand}>
      <AuthLayout {...copy[brand].hero}>
        <LoginForm {...copy[brand].form} {...state} />
      </AuthLayout>
    </BrandProvider>
  )
}

const meta = {
  title: 'Patterns/Login',
  component: LoginPage,
  args: { brand: 'deviante', loading: false, error: '' },
  argTypes: { brand: { control: 'inline-radio', options: ['deviante', 'flashbrix'] } },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Deviante: Story = { args: { brand: 'deviante' } }
export const Flashbrix: Story = { args: { brand: 'flashbrix' } }
export const DevianteError: Story = {
  args: { brand: 'deviante', error: 'Não foi possível iniciar o login com Google.' },
}
export const FlashbrixLoading: Story = { args: { brand: 'flashbrix', loading: true } }

export const SideBySide: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <LoginPage brand="deviante" />
      <LoginPage brand="flashbrix" />
    </div>
  ),
}
