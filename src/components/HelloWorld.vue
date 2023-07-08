<template>
  <VContainer>
    <VRow class="text-center">
      <VCol class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ t(message) }}
        </h1>

        <h4>Vite Preview</h4>

        <p class="font-weight-regular subheading">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </VCol>

      <VCol
        class="mb-5"
        cols="12"
      >
        <h2 class="font-weight-bold headline mb-5">
          What's next?
        </h2>

        <VRow justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="mx-3 subheading"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </VRow>
      </VCol>

      <VCol
        class="mb-5"
        cols="12"
      >
        <h2 class="font-weight-bold headline mb-5">
          Important Links
        </h2>

        <VRow justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="mx-3 subheading"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </VRow>
      </VCol>

      <VCol
        class="mb-5"
        cols="12"
      >
        <h2 class="font-weight-bold headline mb-5">
          Ecosystem
        </h2>

        <VRow justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="mx-3 subheading"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useLocale } from 'vuetify';

const { t } = useLocale();

const message = ref<string>('Welcome to Your Vue.js + TypeScript + Vuetify App');

interface Link {
  text: string;
  href: string;
}

const ecosystem = reactive<Link[]>([
  {
    text: 'vuetify-loader',
    href: 'https://github.com/vuetifyjs/vuetify-loader/tree/next',
  },
  {
    text: 'github',
    href: 'https://github.com/vuetifyjs/vuetify/tree/next',
  },
  {
    text: 'awesome-vuetify',
    href: 'https://github.com/vuetifyjs/awesome-vuetify',
  },
]);
const importantLinks = reactive<Link[]>([
  {
    text: 'Chat',
    href: 'https://community.vuetifyjs.com',
  },
  {
    text: 'Made with Vuetify',
    href: 'https://madewithvuejs.com/vuetify',
  },
  {
    text: 'Twitter',
    href: 'https://twitter.com/vuetifyjs',
  },
  {
    text: 'Articles',
    href: 'https://medium.com/vuetify',
  },
]);
const whatsNext = reactive<Link[]>([
  {
    text: 'Explore components',
    href: 'https://vuetifyjs.com',
  },
  {
    text: 'Roadmap',
    href: 'https://vuetifyjs.com/en/introduction/roadmap/',
  },
  {
    text: 'Frequently Asked Questions',
    href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
  },
]);
</script>
