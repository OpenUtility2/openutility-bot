# Dashboard-first command migration

## Goal

Make the OpenUtility web dashboard the primary place to configure a Discord server. Keep the bot responsible for gateway events, automations, security enforcement, and immediate moderation actions.

This is a staged migration plan, not permission to remove working behavior before equivalent dashboard flows are verified.

## Repository audit snapshot

Audited the current `main` branch files `src/commands.js`, `src/index.js`, `deploy-commands.js`, `package.json`, and `README.md`.

- `src/commands.js` currently registers only `/help`, `/tools`, `/tool`, `/status`, `/changelog`, `/website`, `/suggest`, and `/bug`.
- `src/index.js` currently implements those commands and tool autocomplete. It initializes a Discord client with the Guilds intent.
- `package.json` has `start` and `deploy` scripts, but no test or syntax-check script.
- `README.md` describes a much larger bot surface (including `/setup`, `/utility-dashboard`, `/automod`, `/welcome`, `/config`, `/logging`, `/embed`, `/ban`, `/kick`, `/timeout`, and `/warn`) that is not present in the audited command registry or handler file.

**Blocker:** resolve the README/source mismatch and locate the actual implementation of any advertised server-management features before changing or deleting commands. Do not treat documentation as proof that a feature is implemented.

## Target command policy

### Keep as bot commands

- `/dashboard` (or retain `/utility-dashboard` if that is the established public command; avoid renaming until usage and registrations are checked)
- `/help`, `/ping` or a truthful health/status command
- `/ban`, `/kick`, `/timeout`, `/warn`
- Essential emergency controls and operational diagnostics
- Optional general utility commands only when they do not duplicate dashboard configuration

### Move configuration UX to the dashboard

- Setup wizard and server configuration
- AutoMod rule configuration
- Anti-nuke/security thresholds and policy configuration
- Welcome messages, channels, and automatic roles
- Embed builder and message publishing
- Logging channels and event toggles
- Moderation case history, analytics, and configuration management

The bot must continue enforcing settings and processing Discord events while the dashboard is closed or unavailable. Dashboard pages configure the bot; they do not replace the bot runtime.

## Safe migration phases

1. **Inventory and parity map**
   - Enumerate every registered slash command, prefix command, subcommand, component handler, and event-driven feature from source (not README alone).
   - Map each feature to its dashboard page, API route, persistence model, permission checks, and bot runtime consumer.
   - Mark gaps explicitly; do not remove commands in this phase.

2. **Verify dashboard and API parity**
   - For every feature to move, test load, edit, validation, save, reload, and live behavior on a development Discord server.
   - Confirm server-scoped authorization, Discord permission and role hierarchy checks, CSRF/origin protections for writes, and safe defaults for security features.
   - Verify configuration persists across bot restarts and failures are visible to the admin.

3. **Keep operational fallbacks**
   - Preserve `/ban`, `/kick`, `/timeout`, and `/warn`.
   - Preserve an emergency route for protection and moderation if the dashboard/API is down.
   - Never make anti-nuke or AutoMod enforcement depend on an open dashboard page.

4. **Deprecate, then remove**
   - First make moved commands respond with a clear dashboard link while the dashboard equivalent is tested, if the command implementation actually exists.
   - Announce the change and allow a short transition window.
   - Remove only after parity tests pass and the bot's registered application commands are updated. Keep a rollback commit.

5. **Release verification**
   - Run syntax/lint/tests available in the repository and add missing automated checks.
   - Deploy to a test guild; test all preserved moderation actions, dashboard saves, bot restart persistence, permissions, and failure handling.
   - Confirm production application command registration separately; source changes alone do not unregister commands already registered with Discord.

## Acceptance checklist

- [ ] Source inventory reconciles with README and deployed commands.
- [ ] Every removed configuration command has a working dashboard equivalent.
- [ ] Dashboard/API changes persist and affect the live bot runtime.
- [ ] Dashboard outages do not stop enforcement or emergency moderation.
- [ ] `/ban`, `/kick`, `/timeout`, and `/warn` remain registered and permission-checked.
- [ ] Command registration and rollback steps are documented.
- [ ] Test results are recorded; do not claim production verification without testing.

## Immediate next step

Reconcile the README with the actual `main` source and inspect the dashboard/API integration before removing commands. The current audited bot files do not contain the advertised server-management command implementations, so deleting them now would be premature.
