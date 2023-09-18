<script setup lang="ts">
import {
  computed, onMounted, PropType, Ref, ref,
} from 'vue';

import { GraphQLErrors } from '@apollo/client/errors';
import { VForm } from 'vuetify/components';

import useFormsStore from '@/store/forms';

interface Field {
  label: string;
  name: string;
  rules?: string[];
  validateOn?: 'lazy' | ('input' | 'blur' | 'submit') | 'input lazy' | 'blur lazy' | 'submit lazy' | 'lazy input' | 'lazy blur' | 'lazy submit'
  required?: boolean;
  type?: string;
}

interface TextWithLink {
  textBefore: string;
  text: string;
  routeName: string;
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as () => Field[],
    default: () => [],
  },
  links: {
    type: Array as () => TextWithLink[],
    default: () => [],
  },
  formName: {
    type: String,
    required: true,
  },
  submitFunction: {
    type: Function as PropType<() => void>,
    required: true,
  },
  submitText: {
    type: String,
    required: false,
    default: () => null,
  },
  autoSubmit: {
    type: Boolean,
    default: false,
  },
});

const formRef: Ref<VForm | null> = ref(null);
const formsStore = useFormsStore();
const formValues = computed(() => formsStore.getForm(props.formName));
// eslint-disable-next-line
const formCustomErrorMessages: Ref<any> = ref({});

async function submit() {
  if (!formRef.value) {
    return;
  }
  const { valid } = await formRef.value.validate();
  if (!valid) {
    return;
  }
  props.submitFunction();
}

function handleValidationErrors(graphQlErrors: GraphQLErrors) {
  if (!formRef.value) {
    return;
  }
  graphQlErrors.forEach((error) => {
    if (error.extensions?.classification !== 'ValidationError') {
      return;
    }
    const path = error.path ?? [] as string[];
    const fieldName = path[path.length - 1];
    const errorMessages = formCustomErrorMessages.value[fieldName] ?? [];
    errorMessages.push(error.message);
    formCustomErrorMessages.value = {
      ...formCustomErrorMessages.value,
      [fieldName]: errorMessages,
    };
  });
}

onMounted(() => {
  if (props.autoSubmit) {
    submit();
  }
});
defineExpose({
  handleValidationErrors,
});
</script>

<template>
  <VCard>
    <VCardTitle class="text-center">{{ title }}</VCardTitle>

    <VForm ref="formRef" @submit.prevent="submit">
      <VCardText>
        <VTextField
          v-for="field in fields"
          :key="field.label"
          v-model="formValues[field.name]"
          :label="field.label"
          :rules="field.rules ?? []"
          :validateOn="field.validateOn ?? 'blur'"
          :required="field.required ?? false"
          :type="field.type ?? 'text'"
          :error-messages="formCustomErrorMessages[field.name] ?? []"
        />
        <div v-for="link in links" :key="link.routeName">
          {{ link.textBefore }}
          <RouterLink :to="{ name: link.routeName }">{{ link.text }}</RouterLink>
        </div>
      </VCardText>
      <VCardActions class="justify-center">
        <VBtn type="submit" color="secondary" variant="elevated">{{ submitText ?? title }}</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
