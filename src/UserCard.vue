/**
* @file UserCard.vue
* @description Displays user information and handles user interactions.
*/
<script setup lang="ts">
/**
 * User information.
 *
 * Defines the structure of a user.
 */
interface User {
  /**
   * Unique user identifier.
   */
  id: string;

  /**
   * User display name.
   */
  name: string;
}

/**
 * User status.
 *
 * Defines the available user statuses.
 */
type UserStatus = 'active' | 'inactive' | 'pending';

/**
 * User card component properties.
 *
 * Defines the data received by the component.
 */
const props = defineProps<{
  /**
   * User information.
   */
  user: User;

  /**
   * Current user status.
   */
  status: UserStatus;
}>();

/**
 * Component events.
 *
 * Defines the events emitted by the component.
 */
const emit = defineEmits<{
  /**
   * Emitted when the user is selected.
   *
   * @param userId - Identifier of the selected user.
   */
  select: [userId: string];

  /**
   * Emitted when the user status changes.
   *
   *
   */
  statusChange: [status: UserStatus];
}>();

/**
 * Displays the formatted user name.
 *
 * Generates the user name displayed by the component.
 */
const displayName = computed(() => {
  return props.user.name.trim();
});

/**
 * Selects the current user.
 *
 * Emits the user selection event.
 *
 * @param userId - Identifier of the selected user.
 * @returns void.
 */
function selectUser(userId: string): void {
  emit('select', userId);
}
</script>