import React from "react";
import { useNavigation } from "react-router-dom";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default React.memo(function NavigationLoader() {
    const navigation = useNavigation()
    NProgress.configure({ showSpinner: false, trickleSpeed: 100 })
    React.useEffect(() => {
        if (navigation.state === "loading") {
            NProgress.start()
        } else {
            NProgress.done()
        }
    }, [navigation.state])
    return null
})