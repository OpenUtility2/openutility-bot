import 'dotenv/config';
import {
  Client,
  Collection,
  EmbedBuilder,
  Events,
  GatewayIntentBits
} from 'discord.js';
import { tools } from './data/tools.js';

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error('Missing DISCORD_TOKEN in environment.');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const SITE_URL = 'https://openutility.info.gf';
const BRAND = 0x4a9ee8;
const commands = new Collection();

function siteEmbed(title, description) {
  return new EmbedBuilder()
    .setColor(BRAND)
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: 'OpenUtility • Developer tools' })
    .setTimestamp();
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`OpenUtility Bot online as ${readyClient.user.tag}`);
  readyClient.user.setActivity('Developer tools • openutility.info.gf');
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isAutocomplete()) {
      const query = interaction.options.getString('name', true).toLowerCase();
      const matches = tools
        .filter((tool) => `${tool.name} ${tool.id}`.toLowerCase().includes(query))
        .slice(0, 25)
        .map((tool) => ({ name: tool.name, value: tool.id }));
      await interaction.respond(matches);
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
      return interaction.reply({ embeds: [siteEmbed('OpenUtility Bot',
        '**Available commands**\n\n' +
        '`/tools` — Browse all tools\n' +
        '`/tool` — Open a tool\n' +
        '`/status` — Service information\n' +
        '`/changelog` — Latest update\n' +
        '`/website` — Open OpenUtility\n' +
        '`/suggest` — Send an idea\n' +
        '`/bug` — Report a problem'
      )] });
    }

    if (commandName === 'tools') {
      const grouped = Object.groupBy(tools, (tool) => tool.category);
      const description = Object.entries(grouped)
        .map(([category, items]) => `**${category}**\n${items.map((tool) => `• [${tool.name}](${tool.url})`).join('\n')}`)
        .join('\n\n');
      return interaction.reply({ embeds: [siteEmbed('OpenUtility Tools', description)] });
    }

    if (commandName === 'tool') {
      const id = interaction.options.getString('name', true);
      const tool = tools.find((item) => item.id === id);
      if (!tool) return interaction.reply({ content: 'That tool could not be found.', ephemeral: true });
      return interaction.reply({ embeds: [siteEmbed(tool.name, `${tool.description}\n\n[Open tool](${tool.url})`)] });
    }

    if (commandName === 'status') {
      return interaction.reply({ embeds: [siteEmbed('OpenUtility Status',
        '🟢 **Website:** Online\n🟢 **Discord Bot:** Online\n\nStatus shown here reflects the OpenUtility bot connection and configured website endpoint.'
      )] });
    }

    if (commandName === 'changelog') {
      return interaction.reply({ embeds: [siteEmbed('Latest OpenUtility Update',
        '**OpenUtility Bot v1.0**\n• Added the first-party Discord bot\n• Added tool browsing and direct tool links\n• Added suggestions and bug reporting\n• Added website, status, help, and changelog commands'
      )] });
    }

    if (commandName === 'website') {
      return interaction.reply({ embeds: [siteEmbed('OpenUtility', `${SITE_URL}\n\nFast, privacy-friendly developer utilities.`)] });
    }

    if (commandName === 'suggest' || commandName === 'bug') {
      const text = interaction.options.getString(commandName === 'suggest' ? 'idea' : 'description', true);
      const channelId = commandName === 'suggest' ? process.env.SUGGESTIONS_CHANNEL_ID : process.env.BUGS_CHANNEL_ID;
      const title = commandName === 'suggest' ? 'New OpenUtility Suggestion' : 'New OpenUtility Bug Report';
      const label = commandName === 'suggest' ? 'Suggestion' : 'Description';

      const embed = new EmbedBuilder()
        .setColor(commandName === 'suggest' ? 0x8b5cf6 : 0xff5c5c)
        .setTitle(title)
        .addFields(
          { name: 'From', value: `${interaction.user.tag} (${interaction.user.id})` },
          { name: label, value: text }
        )
        .setTimestamp()
        .setFooter({ text: 'OpenUtility Bot' });

      if (!channelId) {
        return interaction.reply({
          content: `${commandName === 'suggest' ? 'Suggestions' : 'Bug reports'} are not configured yet. Add the matching channel ID to `.env`.`,
          ephemeral: true
        });
      }

      const channel = await client.channels.fetch(channelId).catch(() => null);
      if (!channel?.isTextBased()) {
        return interaction.reply({ content: 'The configured destination channel is invalid or unavailable.', ephemeral: true });
      }

      await channel.send({ embeds: [embed] });
      return interaction.reply({ content: `Your ${commandName === 'suggest' ? 'suggestion' : 'bug report'} was sent to the OpenUtility team.`, ephemeral: true });
    }
  } catch (error) {
    console.error(error);
    const message = { content: 'Something went wrong while processing that command.', ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(message).catch(() => {});
    else await interaction.reply(message).catch(() => {});
  }
});

client.login(token);
