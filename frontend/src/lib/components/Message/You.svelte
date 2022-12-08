<script lang="ts">
	import { timeSince } from '$lib/constants';

	export let message: any;
</script>

<li class="d-flex justify-content-end mb-4">
	<div class="card">
		<div class="card-header d-flex justify-content-between p-3">
			<p class="fw-bold mb-0">
				{message.sender__first_name + ' ' + message.sender__last_name}(You)
			</p>
			<p class="text-muted small mb-0">
				<i class="far fa-clock" />
				{timeSince(message.timestamp)}
			</p>
		</div>
		<div class="card-body">
			<p class="mb-0">{message.message}</p>
		</div>
	</div>
	<img
		src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-{message.sender__pk}.webp"
		alt="You"
		title="You"
		class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
		width="60"
	/>
</li>
