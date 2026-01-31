<script setup>
import { Dialog } from "primevue";

defineEmits(["update:visible"]);

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <Dialog
    :visible="visible"
    modal
    header="A propos de l'outil"
    class="w-1/2"
    @update:visible="$emit('update:visible', false)"
  >
    <div class="flex flex-col space-y-4">
      <p>Nom : Donecat</p>
      <p>Version : 0.1.2</p>
      <p>
        Lien du code source (GitHub) :
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/pierrebraem/Donecat-front"
          >Cliquez ici</a
        >
      </p>
      <p>
        Lien des releases (pour vérifier une potentiel mise à jour) :
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/pierrebraem/Donecat-front/releases"
          >Cliquez ici</a
        >
      </p>
      <div class="flex flex-col space-y-2">
        <p>Licence MIT :</p>
        <p>MIT License</p>

        <p>Copyright (c) 2025 Pierre Braem</p>

        <p>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </p>

        <p>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </p>

        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>
    </div>
  </Dialog>
</template>
