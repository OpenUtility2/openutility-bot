# OpenUtility Bot

> **One bot. Your whole server.**

OpenUtility Bot is the official Discord bot for the OpenUtility ecosystem — a modern, open-source server utility and management bot built around fast actions, clean interfaces, and practical automation.

It combines moderation, AutoMod, logging, server configuration, developer utilities, Minecraft tools, reminders, prefix support, and an interactive server dashboard in one Discord experience.

## ✨ What OpenUtility Bot Includes

### 🛡️ Moderation & Protection

- Kick, ban, timeout, warn and warnings
- Purge, slowmode, lock and unlock
- Persistent moderation warnings
- Configurable moderation logs
- AutoMod controls for spam, invites, links, bad words and caps
- Server protection and configurable security systems

### 🎛️ Server Dashboard

The interactive `/utility-dashboard` brings common server controls into one panel:

- Quick Setup
- Advanced Logging
- AutoMod
- Welcome System
- Server Configuration
- Embed Builder
- Server information
- Refreshable live status

### 🧩 Embed Builder

Create Discord embeds directly inside Discord with an interactive builder.

- Title and description
- Custom hex colors
- Footer text
- Images and thumbnails
- Live preview
- Send directly to the current channel
- Send through a Discord webhook
- Reset and edit without rebuilding the panel

### ⚙️ Server Configuration

Configure common server systems without remembering every command.

- Logging channel
- Moderation log channel
- Welcome channel
- Welcome message
- Automatic member role
- Configurable logging events

Welcome messages support:

```text
{user}
{username}
{server}
{membercount}
```

### 🔧 Developer & Web Utilities

- Secure password generation
- QR code generation
- OpenUtility tool browser
- Individual tool lookup with autocomplete
- Discord snowflake information
- Custom emoji inspection
- User avatars and banners
- Role and channel information
- Permission inspection

### ⛏️ Minecraft Utilities

- Minecraft Java server status
- Online player information
- Version and MOTD information
- Per-channel Minecraft monitoring
- Online/offline change notifications

### 🔔 Community & Productivity

- Persistent reminders
- Polls
- Announcements
- Suggestions
- Bug reports
- OpenUtility status and changelog
- Website and support links

## 🔁 Prefix + Slash Commands

OpenUtility supports both modern Discord slash commands and traditional prefix commands.

The default prefix is `!` and can be changed per server.

```text
!help
!serverinfo
!userinfo @user
!password 24
!qr https://example.com
```

The bot also supports owner-controlled no-prefix access for selected users.

## 📋 Core Commands

```text
/help
/features
/setup
/utility-dashboard
/automod
/welcome
/config
/logging
/embed
/serverinfo
/userinfo
/prefix
/noprefix
/password
/qr
/poll
/remind
/say
/kick
/ban
/timeout
/warn
/warnings
/purge
/slowmode
/lock
/unlock
/mc-server
/mc-monitor
/tools
/tool
/status
/changelog
/website
/discord
/invite
/privacy
/support
/suggest
/bug
```

Some commands expose subcommands or additional options directly through Discord's command interface.

## 🏗️ Architecture

```text
OpenUtility Bot
├── Discord Gateway
│   ├── Slash Commands
│   ├── Prefix Commands
│   └── Interactive Components
│       ├── Buttons
│       ├── Select Menus
│       └── Modals
│
├── Server Systems
│   ├── Moderation
│   ├── AutoMod
│   ├── Logging
│   ├── Welcome
│   ├── Configuration
│   └── Dashboard
│
├── Utility Systems
│   ├── Developer Tools
│   ├── Web Tools
│   ├── Minecraft Monitor
│   └── Reminders
│
└── OpenUtility Services
    ├── Website
    ├── GitHub Integration
    └── Web Dashboard
```

## 🚀 Getting Started

### Requirements

- Node.js **24.17.0 or newer**
- A Discord application and bot token
- Message Content Intent enabled for prefix commands
- Guild Members Intent enabled for member-related features

### 1. Clone the repository

```bash
git clone https://github.com/OpenUtility2/openutility-bot.git
cd openutility-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

At minimum, configure:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
```

Optional integrations include logging destinations, GitHub maintenance/update integration, webhook authentication, custom prefix settings, Minecraft monitoring intervals, and the OpenUtility Discord invite.

### 4. Start the bot

```bash
npm start
```

The current bot implementation registers its public application commands when it starts.

## 🔐 Security

Never commit secrets to GitHub.

Do **not** expose:

- `DISCORD_TOKEN`
- `GITHUB_TOKEN`
- `WEBHOOK_SECRET`
- Discord webhook URLs
- Production `.env` files
- Server-specific persistent data

The repository includes `.gitignore` and `.env.example` to help keep credentials out of source control.

## 💾 Persistent Data

OpenUtility stores runtime configuration in the configured data directory.

Typical persistent data includes:

```text
data/
├── reminders.json
├── warnings.json
├── server-config.json
├── prefixes.json
├── no-prefix-users.json
└── automod.json
```

Use `OU_DATA_DIR` to change the storage location when deploying to a VPS, Docker, Pterodactyl, or another persistent host.

## 🐳 Docker / Pterodactyl

The bot is designed to run as a persistent Node.js service and can be hosted on:

- Pterodactyl
- VPS servers
- Docker hosts
- Linux servers
- Other Node.js hosting platforms

Make sure the host uses Node.js 24.17.0+ and provides persistent storage for the bot's data directory.

## 🌐 OpenUtility Ecosystem

| Project | Purpose |
|---|---|
| `openutility` | Main OpenUtility website/platform |
| `openutility-bot` | Official Discord bot |
| `openutility-dashboard` | Web dashboard for server management |
| `openutility-api` | Dashboard/backend API |
| `mctools` | Minecraft utilities platform |
| `speedcheck` | Internet/network speed testing |

## 🤝 Contributing

Contributions, bug reports, and feature ideas are welcome.

Before opening a pull request:

1. Keep changes focused.
2. Do not commit secrets or production data.
3. Test commands and interactive components.
4. Keep OpenUtility's UI and naming consistent.
5. Explain important behavior changes in the pull request description.

For feature ideas or bugs, you can also use the bot's `/suggest` and `/bug` commands when configured.

## 📜 License

See the repository license and project files for the applicable licensing terms.

## 🔗 Links

- **OpenUtility:** https://openutility.info.gf
- **GitHub:** https://github.com/OpenUtility2
- **Discord:** https://discord.gg/ufvQ4Ghtpu

---

**OpenUtility Bot** — built for modern Discord communities.