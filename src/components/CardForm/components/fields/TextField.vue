<script setup lang="ts">
import { computed, onMounted, Ref, ref, WritableComputedOptions, WritableComputedRef } from 'vue';
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
const modifiableType: Ref<string> = ref('text');
onMounted(() => {
  modifiableType.value = props.field.type ?? 'text';
});

const requiredFieldRule = [(v: string) => !!v || 'required.validation.error'];
</script>

<template>
  <VTextField
    v-model="value"
    :label="t(field.displayName ?? field.name)"
    :rules="field.rules?.length ? field.rules : (field.required ? requiredFieldRule : [])"
    :validateOn="field.validateOn ?? 'blur'"
    :required="field.required ?? false"
    :type="modifiableType"
    :error-messages="customErrorMessages"
    clearable
    :append-inner-icon="field.type === 'password' ? (modifiableType === 'password' ? 'mdi-eye' : 'mdi-eye-off') : ''"
    @click:append-inner="modifiableType = modifiableType === 'password' ? 'text' : 'password'"
  >
    <template v-slot:message="{ message }">
      {{ t(message) }}
    </template>
  </VTextField>
</template>
