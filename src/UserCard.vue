/**
* @file UserCard.vue
* @description Displays user information and handles user interactions.
*/
<script setup lang="ts">
/**
 * User information.
 *
 * @description Defines the structure of a user.
 */
interface User {
  /**
   * Unique user identifier.
   * @description A unique identifier for the user.
   */
  id: string;

  /**
   * User display name.
   * @description The name to display for the user.
   */
  name: string;
}

/**
 * User status.
 *
 * @description Defines the available user statuses.
 */
type UserStatus = 'active' | 'inactive' | 'pending';

/**
 * User card component properties.
 *
 * @description Defines the data received by the component.
 */
const props = defineProps<{
  /**
   * User information.
   * @description The user data to display.
   */
  user: User;

  /**
   * Current user status.
   * @description The status of the user.
   */
  status: UserStatus;
}>();

/**
 * Component events.
 *
 * @description Defines the events emitted by the component.
 */
const emit = defineEmits<{
  /**
   * Emitted when the user is selected.
   *
   * @description Emits the user selection event.
   * @param userId - Identifier of the selected user.
   */
  select: [userId: string];

  /**
   * Emitted when the user status changes.
   *
   * @description Emits the user status change event.
   * @param status - New user status.
   */
  statusChange: [status: UserStatus];
}>();

/**
 * Displays the formatted user name.
 *
 * @description Returns the formatted user name.
 */
const displayName = computed(() => {
  return props.user.name.trim();
});


/**
 * Selects the current user.
 *
 * @description Emits the user selection event.
 *
 * @param userId - Identifier of the selected user.
 * @returns void.
 */
function selectUser(userId: string): void {
  emit('select', userId);
}
</script>