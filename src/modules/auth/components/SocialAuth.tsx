import React from 'react'
import { useAuthWSocial } from '@auth/services/auth.service'
import Button from '@/components/Button'
export default function SocialAuth(): React.JSX.Element {
    const socialAuth = useAuthWSocial()
    const handleGoogleAuth = () => socialAuth.action("google")
    const handleGitAuth = () => socialAuth.action("github")
    return <div className=' space-y-3'>
        <Button onClick={handleGoogleAuth} className="border border-neutral-200  w-full relative">
            <img src="/images/google.svg" alt="google logo" className="size-5 object-cover absolute top-1/2 left-2 -translate-y-1/2" />
            Don’t want to text? Let Google help!
        </Button>
        <Button onClick={handleGitAuth} className="border border-neutral-200  w-full relative">
            <img src="/images/github.svg" alt="google logo" className="size-5 object-cover absolute top-1/2 left-2 -translate-y-1/2" />
            Want a dev's style? Use Github!
        </Button>
    </div>
}