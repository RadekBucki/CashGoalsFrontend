<script setup lang="ts">
import { computed, onMounted, PropType, Ref, ref } from 'vue';
import LangFlag from 'vue-lang-code-flags';
import { useLocale } from 'vuetify';

import { GraphQLErrors } from '@apollo/client/errors';
import { VForm } from 'vuetify/components';

import { Field, TextWithLink, useFormsStore } from '@/components/CardForm';

const formsStore = useFormsStore();
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
  variant: {
    type: String as PropType<'centered' | 'dashboard'>,
    default: 'centered',
  },
});
const color = computed(() => (props.variant === 'dashboard' ? 'background' : 'primary'));
const cardVariant = computed(() => (props.variant === 'dashboard' ? 'flat' : 'elevated'));

const formRef: Ref<VForm | null> = ref(null);
const formValues = computed(() => formsStore.getForm(props.formName));
const fieldsModifiable: Ref<Field[]> = ref([]);
const requiredFieldRule = [(v: string) => !!v || t('required.validation.error')];
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
        <template v-for="(field, index) in fieldsModifiable">
          <VTextField
            v-if="field.type !== 'select'"
            :key="field.name + '.input'"
            v-model="formValues[field.name]"
            :label="t(field.name)"
            :rules="field.rules?.length ? field.rules : (field.required ? requiredFieldRule : [])"
            :validateOn="field.validateOn ?? 'blur'"
            :required="field.required ?? false"
            :type="field.type ?? 'text'"
            :error-messages="formCustomErrorMessages[field.name] ?? []"
            clearable
            :append-inner-icon="fields[index].type === 'password' ? (field.type === 'password' ? 'mdi-eye' : 'mdi-eye-off') : ''"
            @click:append-inner="field.type = field.type === 'password' ? 'text' : 'password'"
          >
            <template v-slot:message="{ message }">
              {{ t(message) }}
            </template>
          </VTextField>

          <VSelect
            v-else
            :key="field.name + '.select'"
            v-model="formValues[field.name]"
            :label="t(field.name)"
            :items="field.items ?? []"
            :rules="field.rules?.length ? field.rules : (field.required ? requiredFieldRule : [])"
            :validateOn="field.validateOn ?? 'blur'"
            :required="field.required ?? false"
            :error-messages="formCustomErrorMessages[field.name] ?? []"
          >
            <template v-slot:message="{ message }">
              {{ t(message) }}
            </template>
            <template v-slot:selection="{ item }">
              <LangFlag :iso="item.value" :squared="false" v-if="field.name == 'locale'" class="mr-1" />
              {{ t(item.title) }}
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
        <div v-for="link in links" :key="link.routeName">
          {{ t(link.textBefore) }}
          <RouterLink :to="{ name: link.routeName }">{{ t(link.text) }}</RouterLink>
        </div>
      </VCardText>
      <VCardActions :class="{ 'justify-center': variant == 'centered' }">
        <VBtn type="submit" color="secondary" variant="elevated">{{ t(submitText ?? title ?? formName) }}</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
