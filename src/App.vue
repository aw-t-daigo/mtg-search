<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary class="">
      <SearchForm @search-ready="fetchCards" />
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MTGのカードが検索できるだけ</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-list lines="two">
          <v-list-item v-for="card in cards" :key="card.name">
            <v-list-item-title>{{ card.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ card.type_line }}</v-list-item-subtitle>
            <v-dialog activator="parent" width="auto">
              <v-card>
                <v-card-title>{{ card.name }}</v-card-title>
                <v-container>
                  <v-row>
                    <v-col class="v-col-6 offset-3 align-content-center">
                      <v-img
                        contain
                        v-bind:src="card.image_uris?.normal ?? ''"
                        class="align-content-center"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-subtitle>{{ card.type_line }}</v-card-subtitle>
                <v-card-subtitle>{{ card.mana_cost }}</v-card-subtitle>
                <v-card-text>{{ card.oracle_text }}</v-card-text>
              </v-card>
            </v-dialog>
          </v-list-item>
        </v-list>
      </v-container>
      <v-container v-if="error != null">
        {{ error }}
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import SearchForm from '@/components/search/SearchForm.vue'
import { findAllCardsByQuery } from '@/api/MtgAPI'
import type * as Scry from 'scryfall-sdk'
import { BehaviorSubject } from 'rxjs'
import { toObserver } from '@vueuse/rxjs'
import { set } from '@vueuse/core'

const drawer = ref<boolean>(false)
const cardsSubject = new BehaviorSubject<Scry.Card[]>([])
const cards: Ref<Scry.Card[]> = ref([])

const error = ref(null)

cardsSubject.subscribe(toObserver(cards))

function fetchCards(query: string) {
  findAllCardsByQuery(query)
    .then((e) => cardsSubject.next(e))
    .catch((reason) => set(error, reason))
}
</script>
