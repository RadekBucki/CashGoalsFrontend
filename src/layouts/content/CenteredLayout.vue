<template>
  <VMain class="d-flex flex-column justify-center">
    <VContainer fluid>
      <VRow justify="center">
        <VCol cols="12" sm="8" md="4">
          <slot />
        </VCol>
      </VRow>
    </VContainer>
  </VMain>
</template>
