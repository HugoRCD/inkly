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
  twitterCreator: '@HugoRCD__',
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

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
</script>

<template>
  <Html lang="en">
    <UApp>
      <div class="flex h-full flex-col">
        <LayoutNavbar />
        <div class="h-full">
          <NuxtPage />
        </div>
      </div>
    </UApp>
  </Html>
</template>

<style>
#__nuxt, #__layout, body, html {
  height: 100%;
}
</style>
