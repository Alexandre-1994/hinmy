import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {  
  appId: 'com.konún.mwareiti', // ← ID único do app
  appName: 'konún Mwareiti',        // ← Nome do seu app
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,          // ← Remove splash nativo (0ms)
      launchAutoHide: true,           // ← Esconde automaticamente
      launchFadeOutDuration: 0,       // ← Sem animação de fade
      backgroundColor: "#1e3a8a",     // ← Cor de fundo igual ao seu app
      showSpinner: false,             // ← Remove spinner nativo
      splashFullScreen: true,         // ← Tela cheia
      splashImmersive: true           // ← Modo imersivo (Android)
    }
  }
};

export default config;
