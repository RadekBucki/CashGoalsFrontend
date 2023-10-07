<script setup lang="ts">
import { computed, onMounted, PropType, Ref, ref } from 'vue';
import { useLocale } from 'vuetify';

import { GraphQLErrors } from '@apollo/client/errors';
import { VForm } from 'vuetify/components';

import { Field, Link } from './components';

const { t } = useLocale();

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: () => null,
  },
  fields: {
    type: Array as () => Field[],
    default: () => [],
  },
  links: {
    type: Array as () => Link[],
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
  variant: {
    type: String as PropType<'centered' | 'dashboard'>,
    default: 'centered',
  },
});
const color = computed(() => (props.variant === 'dashboard' ? 'background' : 'primary'));
const cardVariant = computed(() => (props.variant === 'dashboard' ? 'flat' : 'elevated'));

const formRef: Ref<VForm | null> = ref(null);
const fieldsModifiable: Ref<Field[]> = ref([]);
onMounted(() => {
  fieldsModifiable.value = props.fields.map((field) => ({ ...field }));
});
const formCustomErrorMessages: Ref<Record<string, string[]>> = ref({});

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
  <VCard :color="color" :variant="cardVariant">
    <VCardTitle :class="{ 'text-center': variant == 'centered' }">{{ t(title ?? formName) }}</VCardTitle>

    <VForm ref="formRef" @submit.prevent="submit">
      <VCardText>
        <Field
          v-for="(field, index) in fieldsModifiable"
          :key="field.name"
          :form-name="formName"
          :custom-error-messages="formCustomErrorMessages[field.name] ?? []"
          :index="index"
          :field="field"
        />
        <Link
          v-for="link in links"
          :key="link.routeName"
          :link="link"
        />
      </VCardText>
      <VCardActions :class="{ 'justify-center': variant == 'centered' }">
        <VBtn type="submit" color="secondary" variant="elevated">{{ t(submitText ?? title ?? formName) }}</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
