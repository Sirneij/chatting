<script lang="ts">
	import Contact from '$lib/components/Contacts/Contact.svelte';
	import { session } from '$lib/store/user.store';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container py-5">
	<div class="row justify-content-center">
		<div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 scrollable">
			<h5 class="font-weight-bold mb-3 text-center text-lg-start">
				{$session.user.username}'s contacts
			</h5>
			<Contact contacts={data.userContacts} />
		</div>
	</div>
</div>
