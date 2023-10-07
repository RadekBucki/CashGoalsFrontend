<script setup lang="ts">
import { computed, WritableComputedRef, WritableComputedOptions } from 'vue';
import LangFlag from 'vue-lang-code-flags';
import { useLocale } from 'vuetify';

import { Field, useFormsStore } from '@/components/CardForm';

const { t } = useLocale();
const formsStore = useFormsStore();

const props = defineProps({
  formName: {
    type: String,
    required: true,
  },
  field: {
    type: Object as () => Field,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  customErrorMessages: {
    type: Array as () => string[],
    required: true,
  },
});
const value: WritableComputedRef<string> = computed({
  get: () => formsStore.getFormValue(props.formName, props.field.name),
  set: (newValue: string) => formsStore.setFormValue(props.formName, props.field.name, newValue),
} as WritableComputedOptions<string>);

const requiredFieldRule = [(v: string) => !!v || 'required.validation.error'];
</script>

<template>
  <VSelect
    v-model="value"
    :label="t(field.name)"
    :items="field.items ?? []"
    :rules="field.rules?.length ? field.rules : (field.required ? requiredFieldRule : [])"
    :validateOn="field.validateOn ?? 'blur'"
    :required="field.required ?? false"
    :error-messages="customErrorMessages"
  >
    <template v-slot:message="{ message }">
      {{ t(message) }}
    </template>
    <template v-slot:selection="{ item }">
      <LangFlag :iso="item.value" :squared="false" v-if="field.name == 'locale'" class="mr-1" />
      {{ item?.title != '' ? t(item.title) : item }}
    </template>
    <template v-slot:item="{ item, props }">
      <VListItem v-bind="props">
        <template v-slot:title>
          <LangFlag :iso="item.value" :squared="false" v-if="field.name == 'locale'" class="mr-1" />
          {{ t(item.title) }}
        </template>
      </VListItem>
    </template>
  </VSelect>
</template>
