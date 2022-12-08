<script lang="ts">
	export let contacts: any;
</script>

<div class="card">
	<div class="card-body">
		<ul class="list-unstyled mb-0">
			{#each contacts as contact, id}
				<li class="p-2" class:border-bottom={id + 1 !== contacts.length}>
					<a href="/chat/{contact.fields.username}" class="d-flex justify-content-between">
						<div class="d-flex flex-row">
							<img
								src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-{id + 1}.webp"
								alt="avatar"
								class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
								width="60"
							/>
							<div class="pt-1">
								<p class="fw-bold mb-0">
									{contact.fields.first_name + ' ' + contact.fields.last_name}
								</p>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
