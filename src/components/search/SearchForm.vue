<template>
  <v-list>
    <v-list-item title="カード検索" />
    <v-list-item>
      <v-text-field label="search" prepend-inner-icon="mdi-magnify" v-model="keyword" />
    </v-list-item>
    <v-list-item>
      <v-select v-model="cardType" clearable label="CardType" :items="CardTypes" />
    </v-list-item>
    <v-list-item>
      <template v-for="colorDef in Colors" :key="colorDef.value">
        <v-checkbox v-model="color" :label="colorDef.label" :value="colorDef.value" />
      </template>
      <v-switch v-model="isColorOr" label="and / or" />
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { useSubject } from '@vueuse/rxjs'
import { BehaviorSubject, combineLatest } from 'rxjs'
import * as Rx from 'rxjs/operators'
import { CardTypes, Colors } from '@/model/CardConst'
import { SearchCondition } from '@/model/SearchCondition'

// 検索準備完了イベント定義
const emit = defineEmits(['searchReady'])

function searchReady(query: string) {
  emit('searchReady', query)
}

// イベント操作
const keywordSubject = new BehaviorSubject('')
const keyword = useSubject(keywordSubject)

const cardTypeSubject = new BehaviorSubject('')
const cardType = useSubject(cardTypeSubject)
const nonNullCardTypeSubject = cardTypeSubject.pipe(Rx.map((s) => s ?? ''))

const colorSubject = new BehaviorSubject<string[]>([])
const color = useSubject(colorSubject)
const nonNullColorSubject = colorSubject.pipe(Rx.map((v) => v.filter((s) => s != null)))

const isColorOrSubject = new BehaviorSubject(false)
const isColorOr = useSubject(isColorOrSubject)

combineLatest([keywordSubject, nonNullCardTypeSubject, nonNullColorSubject, isColorOrSubject])
  .pipe(
    Rx.filter(([keyword]) => keyword !== ''),
    Rx.map(
      ([keyword, cardType, colors, isOr]) => new SearchCondition(keyword, cardType, colors, isOr)
    ),
    Rx.map((v) => v.buildQuery()),
    Rx.debounceTime(1000)
  )
  .subscribe((v) => searchReady(v))
</script>
