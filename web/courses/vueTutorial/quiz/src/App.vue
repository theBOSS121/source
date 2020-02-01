<template>
	<div id="app">
		<Header />

		<b-row>
			<b-col sm="6" offset="3">
				<QuestionBox v-bind:currentQuestion="questions[index]" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import Header from './components/Header.vue';
	import QuestionBox from './components/QuestionBox.vue';

	export default {
		name: 'app',
		components: {
			Header,
			QuestionBox
		},
		data() {
			return {
				questions: [],
				index: 0
			};
		},
		mounted: function() {
			fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple', {
				method: 'get'
			})
				.then(reponse => {
					return reponse.json();
				})
				.then(data => {
					this.questions = data.results;
				});
		}
	};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
