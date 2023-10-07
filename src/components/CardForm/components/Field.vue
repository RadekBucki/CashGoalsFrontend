<script setup lang="ts">
import { SelectField, TextField } from './fields';
import { Field } from '@/components/CardForm';

defineProps({
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
</script>

<template>
  <TextField
    v-if="field.type !== 'select'"
    :form-name="formName"
    :custom-error-messages="customErrorMessages"
    :index="index"
    :field="field"
  />
  <SelectField
    v-else
    :form-name="formName"
    :custom-error-messages="customErrorMessages"
    :index="index"
    :field="field"
  />
</template>
