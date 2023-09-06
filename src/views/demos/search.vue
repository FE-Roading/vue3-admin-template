<script setup lang="ts">
import { Search, SearchItem } from "@/components/Search"

defineOptions({
  name: "DemoSearchPage",
})

function onSearch(params: { [key: string]: any }) {
  console.log("search: ", params)
}
function onReset(params: { [key: string]: any }) {
  console.log("reset: ", params)
}

const defaultValue = {
  field1: "1111",
}

const initialValue = {
  field1: "110000",
}
</script>

<template>
  <div class="demo-search-pg">
    <Search @search="onSearch" @reset="onReset" showCollapse :defaultValue="defaultValue" :initialValue="initialValue">
      <SearchItem index="0" label="field1" prop="field1">
        <template #default="query">
          <el-input placeholder="input field" v-model="query.value.field1" />
        </template>
      </SearchItem>
      <SearchItem index="1" label="field2" prop="field2">
        <template #default="query">
          <el-input placeholder="input field" v-model="query.value.field2" />
        </template>
      </SearchItem>
      <SearchItem index="2" label="field3" prop="field3">
        <template #default="query">
          <el-input placeholder="input field" v-model="query.value.field3" />
        </template>
      </SearchItem>
      <SearchItem index="3" label="field4" prop="field4">
        <template #default="query">
          <el-input placeholder="input field" v-model="query.value.field4" />
        </template>
      </SearchItem>
      <SearchItem index="4" label="field4" prop="field5">
        <template #default="query">
          <el-input placeholder="input field" v-model="query.value.field5" />
        </template>
      </SearchItem>
    </Search>
  </div>
</template>

<style lang="scss" scoped>
.demo-search-pg {
  display: block;
}
</style>
