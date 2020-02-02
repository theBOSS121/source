<template>
	<div class="fluid-container">
		<b-jumbotron>
			<template v-slot:lead>{{ currentQuestion.question }}</template>
			<hr class="my-4" />
			<b-list-group>
				<b-list-group-item
					@click="selectAnswer(index)"
					v-for="(answer, index) in answers"
					:key="index"
					:class="answerClass(index)"
					>{{ answer }}</b-list-group-item
				>
			</b-list-group>
			<b-button
				:disabled="selectedIndex === null || answered"
				variant="primary"
				@click="submitAnswer"
				>Submit</b-button
			>
			<b-button @click="next" variant="success" href="#">Next</b-button>
		</b-jumbotron>
	</div>
</template>

<script>
	import _ from 'lodash';

	export default {
		name: 'QuestionBox',
		props: {
			currentQuestion: Object,
			next: Function,
			increment: Function
		},
		data() {
			return {
				selectedIndex: null,
				shuffledAnswers: [],
				correctIndex: null,
				answered: false
			};
		},
		computed: {
			answers() {
				let answers = [...this.currentQuestion.incorrect_answers];
				answers.push(this.currentQuestion.correct_answer);
				return answers;
			}
		},
		methods: {
			selectAnswer(index) {
				this.selectedIndex = index;
			},
			submitAnswer() {
				let isCorrect = false;
				if (this.selectedIndex == this.correctIndex) {
					isCorrect = true;
				}
				this.answered = true;
				this.increment(isCorrect);
			},
			shuffleAnswers() {
				let answers = [
					...this.currentQuestion.incorrect_answers,
					this.currentQuestion.correct_answer
				];
				this.shuffledAnswers = _.shuffle(answers);
				this.correctIndex = this.shuffledAnswers.indexOf(
					this.currentQuestion.correct_answer
				);
			},
			answerClass(index) {
				let answerClass = '';
				if (!this.answered && this.selectedIndex === index) {
					answerClass = 'selected';
				} else if (this.answered && this.correctIndex === index) {
					answerClass = 'correct';
				} else if (
					this.answered &&
					this.correctIndex !== index &&
					this.selectedIndex == index
				) {
					answerClass = 'incorrect';
				} else {
					answerClass = '';
				}
				return answerClass;
			}
		},
		watch: {
			currentQuestion: {
				immediate: true,
				handler() {
					this.selectedIndex = null;
					this.answered = false;
					this.shuffleAnswers();
				}
			}
		}
	};
</script>

<style scoped>
	.list-group {
		margin: 20px;
	}
	.btn {
		margin: 0 5px;
	}
	.list-group-item:hover {
		background: #eee;
		cursor: pointer;
	}
	.selected {
		background: lightblue !important;
	}
	.correct {
		background: green !important;
	}
	.incorrect {
		background: red !important;
	}
</style>
