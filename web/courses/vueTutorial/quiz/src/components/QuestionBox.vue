<template>
	<div class="fluid-container">
		<b-jumbotron>
			<template v-slot:lead>
				{{ currentQuestion.question }}
			</template>
			<hr class="my-4" />
			<p>
				List Of questions
			</p>
			<b-button variant="primary" href="#">Submit</b-button>
			<b-button variant="success" href="#">Next</b-button>
		</b-jumbotron>
	</div>
</template>

<script>
	export default {
		name: 'QuestionBox',
		props: {
			currentQuestion: Object
		}
	};
</script>

<style></style>
