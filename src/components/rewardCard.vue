<template>
    <div>
        <v-container>
            <v-layout class="justify-center" row wrap>
                <v-card v-for="reward in dailyScore[0].reward" :key="reward.id" class="mb-3" width="300" hover>
                    <v-list>
                        <v-list-item xs12 sm12 md12>
                            <v-list-item-avatar>
                                <v-img :src="reward.img">
                                </v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="reward.name"></v-list-item-title>
                                <v-list-item-subtitle>
                                    Price: {{ reward.score }}
                                    <v-divider class="mb-1"></v-divider>
                                    <v-chip 
                                    v-for="kid in dailyScore[0].kid" 
                                    :key="kid.id"
                                    :class="{ 'success': kid.status}"
                                    pill
                                    class="mr-1 ml-1"
                                    @click="applyTask($event,
                                        dailyScore['0'].id,
                                        routine.name,
                                        kid.name,
                                        kid.status,
                                        routine.score
                                    )"
                                    >
                                    <v-avatar left>
                                        <v-img :src='kid.img'></v-img>
                                    </v-avatar>
                                    {{ kid.name }}
                                    </v-chip>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
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

