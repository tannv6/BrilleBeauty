import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'

function Auth({ children }: { children: any }) {
    const { data: session, status } = useSession()
    const isUser = !!session?.user
    
    useEffect(() => {
        if (status === 'loading') return
        if (!isUser) console.log("no");
        
    }, [isUser, status])

    if (isUser) {
        return children
    }

    return <div>Loading...</div>
}

interface AppPropsWithAuth extends AppProps {
    Component: AppProps['Component'] & { auth: boolean }
}

const CustomApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) => {
    return (
        <SessionProvider session={session}>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
        </SessionProvider>
    )
}

export default CustomApp