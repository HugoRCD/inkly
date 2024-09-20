<script setup lang="ts">
useScriptPlausibleAnalytics({
  domain: 'inkly.hrcd.fr',
  scriptInput: {
    src: 'https://analytics.hrcd.fr/js/script.js',
  }
})

useSeoMeta({
  title: 'Inkly - Email Signature Generator',
  description: 'The most simple open-source email signature generator',
  author: 'Hugo Richard',
  twitter: '@HugoRCD__',
  twitterTitle: 'Inkly - Email Signature Generator',
  twitterDescription: 'The most simple open-source email signature generator',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://inkly.hrcd.fr/og.png',
  ogUrl: 'https://inkly.hrcd.fr',
  ogImage: 'https://inkly.hrcd.fr/og.png',
  ogSiteName: 'Inkly - Email Signature Generator',
  ogTitle: 'Inkly - Email Signature Generator',
  ogDescription: 'The most simple open-source email signature generator',
})
</script>

<template>
  <Html lang="en">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <UNotifications />
    </Body>
  </Html>
</template>

<style>
#__nuxt, #__layout, body, html {
  height: 100%;
}

.font-instrument {
  font-family: 'Instrument', serif;
}
</style>
