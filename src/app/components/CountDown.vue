<template>
	<div class="count-down" v-text="str"></div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: [ 'endDate' ],
                data: function(){
                        return {str: ''}
                },
                methods: {
                        _showCountDownTime() {
                                let begin = new Date();
                                let timeSpan = Math.ceil((this.endDate - begin) / 1000);
                                let day = Math.floor(timeSpan / (3600 * 24));
                                let hours = ('00' + Math.floor(timeSpan / 3600 % 24)).substr(-2);
                                let minutes = ('00' + Math.floor(timeSpan / 60 % 60)).substr(-2);
                                let seconds = ('00' + timeSpan % 60).substr(-2);
                                let result = `${ hours }：${ minutes }：${ seconds }`;
                                this.str = result;
                                if (timeSpan <= 0) {
                                        clearInterval(timer);
                                        return;
                                }
                        }
                },
                created() {this.timer = setInterval(this._showCountDownTime, 1000);},
                destroyed() { if(this.timer) clearInterval(this.timer); }
        };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>