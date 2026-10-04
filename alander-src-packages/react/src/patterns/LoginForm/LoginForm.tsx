import type { ReactNode } from 'react'
import { Alert } from '../../components/Alert/Alert'
import { Heading } from '../../components/Heading/Heading'
import { Logo } from '../../components/Logo/Logo'
import { SocialButton } from '../../components/SocialButton/SocialButton'
import { Text } from '../../components/Text/Text'
import styles from './LoginForm.module.css'

export interface LoginFormProps {
  title?: string
  description?: string
  /** Label of the Google button. */
  googleLabel?: string
  /** Label shown while the redirect to Google starts. */
  loadingLabel?: string
  loading?: boolean
  error?: string
  /** Short note under the button, e.g. who grants access. */
  notice?: ReactNode
  /** Terms line at the bottom. */
  legal?: ReactNode
  onGoogleSignIn?: () => void
}

/**
 * Google sign-in form shared by Deviante and Flashbrix. Both products use
 * Google OAuth as their only entry point, so there is no e-mail/password here.
 */
export function LoginForm({
  title,
  description,
  googleLabel = 'Continuar com Google',
  loadingLabel = 'Redirecionando...',
  loading = false,
  error,
  notice,
  legal,
  onGoogleSignIn,
}: LoginFormProps) {
  return (
    <div className={styles.form}>
      <Logo size="lg" />

      {title || description ? (
        <div className={styles.intro}>
          {title ? <Heading>{title}</Heading> : null}
          {description ? <Text tone="muted">{description}</Text> : null}
        </div>
      ) : null}

      {error ? <Alert>{error}</Alert> : null}

      <SocialButton fullWidth loading={loading} onClick={onGoogleSignIn}>
        {loading ? loadingLabel : googleLabel}
      </SocialButton>

      {notice ? (
        <Text size="small" tone="muted" align="center">
          {notice}
        </Text>
      ) : null}

      {legal ? (
        <Text size="small" tone="muted">
          {legal}
        </Text>
      ) : null}
    </div>
  )
}
