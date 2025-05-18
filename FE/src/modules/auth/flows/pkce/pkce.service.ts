import { getAuthWSocial } from "./pkce.api"
import type { SocialConnectionType } from "./pkce.config"

export const useAuthWSocial = () => {

    return {
        action: async (type: SocialConnectionType) => window.location.href = await getAuthWSocial(type)
    }
}

