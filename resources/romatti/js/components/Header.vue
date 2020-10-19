<template>
    <header class="app-header flex flex-row justify-between items-center">
      
      <logo></logo>
      <phone></phone>
    </header>
</template>
<script>
import Logo from './Logo';
import Phone from './Phone';
export default {
    name: 'Header',
    data:() => ({}),
    components: {
      Logo, Phone
    },
}
</script>