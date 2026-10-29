<script setup lang="ts">
import { Camera } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { ProfileEditorProps, ProfileEditorValues } from "./types";

const props = withDefaults(defineProps<ProfileEditorProps>(), {
  defaultName: "",
  defaultHandle: "",
  defaultBio: "",
  defaultWebsite: "",
});

const emit = defineEmits<{
  save: [values: ProfileEditorValues];
  cancel: [];
}>();

const name = ref(props.defaultName);
const handle = ref(props.defaultHandle);
const bio = ref(props.defaultBio);
const website = ref(props.defaultWebsite);

const fallback = computed(() =>
  (name.value || "?").slice(0, 2).toUpperCase(),
);

function handleSubmit() {
  emit("save", {
    name: name.value,
    handle: handle.value,
    bio: bio.value,
    website: website.value,
  });
}
</script>

<template>
  <form
    data-slot="profile-editor"
    :class="cn('grid w-full max-w-lg gap-5', props.class)"
    @submit.prevent="handleSubmit"
  >
    <div class="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage v-if="avatarSrc" :src="avatarSrc" alt="" />
        <AvatarFallback>{{ fallback }}</AvatarFallback>
      </Avatar>
      <Button type="button" size="sm" variant="outline">
        <Camera aria-hidden="true" />
        Change photo
      </Button>
    </div>

    <div class="grid gap-2">
      <Label for="profile-name">Name</Label>
      <Input id="profile-name" v-model="name" required />
    </div>

    <div class="grid gap-2">
      <Label for="profile-handle">Handle</Label>
      <Input id="profile-handle" v-model="handle" placeholder="ada" />
    </div>

    <div class="grid gap-2">
      <Label for="profile-bio">Bio</Label>
      <Textarea
        id="profile-bio"
        v-model="bio"
        :rows="3"
        placeholder="A short introduction."
      />
    </div>

    <div class="grid gap-2">
      <Label for="profile-website">Website</Label>
      <Input
        id="profile-website"
        v-model="website"
        type="url"
        placeholder="https://example.com"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" variant="outline" @click="emit('cancel')">
        Cancel
      </Button>
      <Button type="submit">Save changes</Button>
    </div>
  </form>
</template>
