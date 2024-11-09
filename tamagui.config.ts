import { config, tokens, animations } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const appConfig = createTamagui({
    config,
    tokens,
    animations,
    themeClassNameOnRoot: true,
    themes: {
        light: {
            text: '#11181C',
            background: '#fff',
            tint: '#0a7ea4',
            icon: '#687076',
            tabIconDefault: '#687076',
            tabIconSelected: '#0a7ea4',
        },
        dark: {
            text: '#FFFFFF',
            background: '#000',
            muted: '#11181C',
            tint: '#fff',
            icon: '#9BA1A6',
            tabIconDefault: '#9BA1A6',
            tabIconSelected: '#fff',
        },
    },
})

export type AppConfig = typeof appConfig
declare module 'tamagui' {

    // or '@tamagui/core'

    // overrides TamaguiCustomConfig so your custom types

    // work everywhere you import `tamagui`

    interface TamaguiCustomConfig extends AppConfig { }

}
export default appConfig
