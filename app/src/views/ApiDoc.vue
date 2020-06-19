<template>
  <div id="swagger-ui" />
</template>

<script>
import SwaggerUI, { presets } from 'swagger-ui'

export default {
  name: 'ApiDoc',
  mounted() {
    new SwaggerUI({
      url: `${process.env.VUE_APP_API}/doc.json`,
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [presets.apis],
      deepLinking: true,
    })
  },
}
</script>

<style lang="css">
@import '~swagger-ui/dist/swagger-ui.css';

.swagger-ui {
  background: #fff;
}
.swagger-ui .information-container {
  background: #fff;
}
#swagger-ui .info {
  background: #fff !important;
}
.swagger-ui .information-container .block {
  background: #fff;
}
.swagger-ui.swagger-container .topbar img {
  display: none !important;
}
</style>
