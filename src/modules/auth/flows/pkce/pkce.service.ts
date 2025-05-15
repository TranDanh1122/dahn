import { getAuthWSocial } from "./pkce.api"
import type { SocialConnectionType } from "./pkce.config"

export const useAuthWSocial = () => {

    return {
        action: (type: SocialConnectionType) => window.location.href = getAuthWSocial(type)
    }
}