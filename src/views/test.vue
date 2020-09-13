<template>
    <div>

    </div>
</template>

<script>
    export default {
        data() {

        },
        methods: {
            createDailyScoreDocument: function() {
                var newDayDict = {}
                newDayDict.date = moment().format('YYMMDD')
                const kValues = Object.values(this.kids)
                for (const kv of kValues) {
                    newDayDict[kv.name] = {
                    "img": kv.img,
                    "id": kv.id,
                    "status": kv.status
                    }
                    const rValues = Object.values(this.routines)
                    for (const rv of rValues) {
                        newDayDict[kv.name][rv.name] = {
                            "img": rv.img,
                            "score": rv.score,
                            "status": rv.status,
                            "time": rv.time
                        }
                    }
                }
                console.log(newDayDict)
                db.collection('dailyScore').doc().set(newDayDict)
                .then(function() {
                    console.log("dailyScore document created");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                this.dailyScoreDateAvailable = !this.dailyScoreDateAvailable
            }
        }
    }
</script>
