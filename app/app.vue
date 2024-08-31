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
  twitterCard: 'summary_large_image',
  twitterImage: '/og.png',
  ogImage: '/og.png',
  ogTitle: 'Inkly - Email Signature Generator',
  ogDescription: 'The most simple open-source email signature generator',
})

</script>

<template>
  <Html class="h-full">
    <Body class="h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <UNotifications />
    </Body>
  </Html>
</template>
