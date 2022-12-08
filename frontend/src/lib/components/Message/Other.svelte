<script lang="ts">
	import { timeSince } from '$lib/constants';

	export let message: any;
</script>

<li class="d-flex justify-content-start mb-4">
	<img
		src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-{message.sender__pk}.webp"
		alt={message.sender__username}
		title={message.sender__username}
		class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
		width="60"
	/>
	<div class="card">
		<div class="card-header d-flex justify-content-between p-3">
			<p class="fw-bold mb-0">
				{message.sender__first_name + ' ' + message.sender__last_name}
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
</li>
