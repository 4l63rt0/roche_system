<template>
    <div>
        <v-container>
            <v-layout class="justify-center" row wrap>
                <div v-for="kid in dailyScore[0].kid" :key="kid.id" xs12 sm12 md12>
                    <v-card class="mb-3" hover max-width="250" width="250" max-height="80" text-center>
                        <v-flex row align-center>
                            <v-flex xs4 sm4 md4>
                                <v-avatar
                                size="80"
                                tile
                                >
                                    <v-img :src="kid.img"></v-img>
                                </v-avatar>
                            </v-flex>
                            <v-flex class="text-center">
                                <v-avatar color="green" size="60">
                                    <span class="white--text headline">{{ kid.score }}</span>
                                </v-avatar>
                            </v-flex>
                        </v-flex>
                    </v-card>
                </div>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        props: [
           'dailyScore' 
        ],
        data() {
            return {
            }
        }
    }
</script>

