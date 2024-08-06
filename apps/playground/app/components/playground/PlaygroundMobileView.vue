<script setup lang="ts">
import PlaygroundOutput from '~/components/output/PlaygroundOutput.vue'
import PlaygroundEditorsPane from '~/components/playground/PlaygroundEditorsPane.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
</script>

<template>
  <Tabs default-value="input" class="flex flex-col h-full">
    <TabsList class="grid grid-flow-col justify-stretch">
      <TabsTrigger value="input">
        Código
      </TabsTrigger>
      <TabsTrigger value="output">
        Resultado
      </TabsTrigger>
    </TabsList>

    <TabsContent value="input" class="m-0 w-full h-full pt-2">
      <PlaygroundEditorsPane />
    </TabsContent>
    <TabsContent value="output" class="m-0 w-full h-full p-2">
      <PlaygroundOutput />
    </TabsContent>
  </Tabs>
</template>
