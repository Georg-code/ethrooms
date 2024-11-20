import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { Building, Room, Roomid, rooms } from "../ethdata/roomdata";
import { getBelegungszeiten } from "../ethdata/getrooms";
import { isRoomFree } from "../ethdata/freerooms";

export const data = new SlashCommandBuilder()
  .setName("rooms")
  .addStringOption((option) => {
    return option
      .setName("building")
      .setDescription("The building to search for")
      .setRequired(true);
  })
  .setDescription("Find Rooms at ETH Zurich");

export async function execute(interaction: CommandInteraction) {
  // get the building from the user input
  const building = interaction.options.get("building")?.value as Building;

  const freeRooms: Room[] = [];

  for (const room of rooms[building]) {
    const roomid: Roomid = {
      building: building,
      room: { floor: room.floor, nr: room.nr },
    };
    
    console.log(room);
    isRoomFree(roomid).then((isFree) => {
      if (isFree) {
        freeRooms.push(room);
      }
    });
  }

  // convert rooms into discordJS fields array
  const fields = freeRooms.slice(0, 25).map((room) => ({
    name: `${room.floor} ${room.nr}`,
    value: `Currently Free`,
  }));

  if (freeRooms.length === 0) {
    return interaction.reply("No rooms found.");
  }

  // create embed with fields
  const embed = new EmbedBuilder().addFields(fields);
  return interaction.reply({ embeds: [embed] });
}
