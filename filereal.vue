<script setup lang="ts">
/**
 * SportBook Item Row Component
 *
 * @description component represents a single sport entry within a list or grid. It provides
 * specific actions for each item, such as deleting the entry, updating its associated
 * image URL via a file uploader, and providing a handle for drag-and-drop reordering.
 *
 * @category   Components / ListItems
 * @package    SpartanInk / SportBook
 * @author     Elkin Murillo Torres
 * @version    1.0.0
 * @since      2026-03-13
 */
import { SportCard } from '@/types/ISportbook'
import IconDragg from '@/assets/icons/IconDragg.vue'
import IconDeleteInput from '@/assets/icons/IconDeleteInput.vue'
import IconSetting from '@/assets/icons/actions/IconSetting.vue'
import FileUplopImage from '@/components/fields/FileUplopImage.vue'

/**
 * Component Interface Props:
 * @description Defines the properties received by the component.
 * @prop {SportCard[]} dataListSportBook - The collection of sports data currently managed.
 * @prop {string} selectTypeCategory - The active category context for the item.
 * @prop {string} [draggableHandle] - Optional CSS class selector for SortableJS interaction.
 */
const props = defineProps<{
  dataListSportBook: SportCard[]
  selectTypeCategory: string
  draggableHandle?: string
}>()

/**
 * Component Events:
 * @description Defines the events emitted by the component to communicate with its parent.
 * @event onDeleteItem - Triggered when the user requests to remove a specific sport item.
 * @event onUpdateUrl - Triggered when the item's data (URL or Name) has been modified.
 */
const emits = defineEmits<{
  (e: 'onDeleteItem', item: { [key: string]: any }): void
  (e: 'onUpdateUrl', item: { [key: string]: any }): void
  (e: 'onEditItem', item: { [key: string]: any }): void
}>()

/**
 * Signals the parent component to initiate the deletion process for a specific item.
 * @description Signals the parent component to initiate the deletion process for a specific item.
 * @param {Object} item - The sports card object to be deleted.
 * @returns {void}
 */
const clickDelete = (item: { [key: string]: any }): void => {
  emits('onDeleteItem', item)
}

/**
 * Signals the parent component to initiate the editing process for a specific item.
 * @description Signals the parent component to initiate the editing process for a specific item.
 * @param {Object} item - The sports card object to be edited.
 * @returns {void}
 */
const clickEdit = (item: { [key: string]: any }): void => {
  emits('onEditItem', item)
}

/**
 * Signals the parent component to update an item's data structure.
 * @description Signals the parent component to update an item's data structure.
 * @param {Object} key - The sports card object with modified values.
 * @returns {void}
 */
const onUpdateUrl = (item: { [key: string]: any }): void => {
  emits('onUpdateUrl', item)
}

/**
 * Handles the change event from the image uploader, updates the local object
 * reference, and notifies the parent.
 * @description Handles the change event from the image uploader, updates the local object
 * reference, and notifies the parent.
 * @param {any} valueIndex - The index position of the item (if applicable).
 * @param {string} keyImage - The identifier key for the image field.
 * @param {string} url - The new base64 or URL string of the uploaded image.
 * @param {Object} item - The original sport item being modified.
 * @returns {void}
 */
const onChangeImage = (url: string, item: { [key: string]: any }): void => {
  item.url = url
  emits('onUpdateUrl', item)
}
</script>
<template>
  <div
      v-for="item in dataListSportBook"
      :class="[
            'w-full h-fit min-h-[294px] bg-[#F6F6F6] dark:bg-[#4C4C4C] rounded-[16px] flex-shrink-0',
            'shadow-[0px_1px_2px_0px_#0000000F,0px_1px_3px_0px_#0000001A] p-[15px]',
            'flex flex-col justify-between gap-[10px]',
        ]"
      :key="item['id']"
  >
    <div class="w-full h-full flex items-start">
      <icon-dragg
          :class="['cursor-pointer hover:scale-105', draggableHandle]"
          width="20px"
          height="20px"
          :style-desing="2"
      />
      <div class="ml-[15px]">
        <p class="text-[10px] text-color">
          ID:
          {{
            item
                ? selectTypeCategory === 'sport'
                    ? `DEP-${item['id']}`
                    : selectTypeCategory === 'championship'
                        ? `LIG-${item['id']}`
                        : `PAR-${item['id']}`
                : ''
          }}
        </p>
        <span class="text-[16px] text-color font-medium">
                    {{ item['name'] === '' ? 'Sin Nombre' : item['name'] }}
                </span>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <icon-setting
            class="cursor-pointer hover:scale-105"
            width="20px"
            height="20px"
            @click="clickEdit(item)"
        />
        <icon-delete-input
            class="ml-auto cursor-pointer hover:scale-105"
            width="18px"
            height="18px"
            @click="clickDelete(item)"
        />
      </div>
    </div>

    <div class="w-full h-full min-h-[140px] max-h-[141px] rounded-[16px]">
      <file-uplop-image
          max-height-image="h-[140px]"
          size-height-image="max-h-[140px]"
          title-html=" Haz clic para subir tu imagen"
          subtitle-html="<p class='text-[10px] font-medium'> Formato: PNG. Máx: 200 KB <br> Tamaño: 400 x 140 px </p>"
          size-unit="KB"
          message-error="“La imagen no cumple con el formato o tamaño permitido. Ajusta la imagen e inténtalo de nuevo.”"
          show-dynamic-html
          :is-validate-formate="false"
          :is-validate-size-image="false"
          :image-value="item['url']"
          :style-desing="3"
          @update-image="(_:any, __:string, url:string) => onChangeImage(url, item)"
      />
    </div>

    <div class="w-full flex flex-col gap-[8px]">
      <p class="text-[12px] text-color font-semibold">URL imagen</p>
      <input
          :class="[
                    'w-full h-[40px] bg-white dark:bg-[#2A2A2A] border-[1px] border-[#989898]',
                    'text-[14px] px-4 outline-none text-color placeholder:text-color rounded-[8px]',
                ]"
          v-model="item.url"
          placeholder="https://example.com/image3.jpg"
          @input="onUpdateUrl(item)"
      />
    </div>
  </div>
</template>

<style scoped></style>
