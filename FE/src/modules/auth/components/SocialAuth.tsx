import React from 'react'
import { useAuthWSocial } from '@auth/flows/pkce/pkce.service'
import Button from '@/components/Button.component'
import { useTranslation } from 'react-i18next'
export default React.memo(function SocialAuth(): React.JSX.Element {
    const socialAuth = useAuthWSocial()
    const handleGoogleAuth = () => socialAuth.action("google")
    const handleGitAuth = () => socialAuth.action("github")
    const { t } = useTranslation('auth')
    return <div className=' space-y-3'>
        <Button onClick={handleGoogleAuth} className="border border-neutral-200  w-full relative line-clamp-1">
            <img src="/images/google.svg" alt="google logo" className="size-5 object-cover absolute top-1/2 left-2 -translate-y-1/2" />
            {t('google_auth')}
        </Button>
        <Button onClick={handleGitAuth} className="border border-neutral-200  w-full relative line-clamp-1">
            <img src="/images/github.svg" alt="github logo" className="size-5 object-cover absolute top-1/2 left-2 -translate-y-1/2" />
            {t('github_auth')}
        </Button>
    </div>
})