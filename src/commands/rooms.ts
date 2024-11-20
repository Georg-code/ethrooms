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

  const roomPromises = rooms[building].map(async (room) => {
    const roomid: Roomid = {
      building: building,
      room: { floor: room.floor, nr: room.nr },
    };

    const isFree = await isRoomFree(roomid);
    if (isFree) {
      freeRooms.push(room);
      console.log(`Room ${room.floor} ${room.nr} is free`);
    }
  });

  await Promise.all(roomPromises);

  // Jetzt können Sie sicher sein, dass alle Räume überprüft wurden
  console.log(freeRooms);

  // convert rooms into discordJS fields array
  const fields = freeRooms.slice(0, 25).map((room) => ({
    name: `${room.floor} ${room.nr}`,
    value: `Currently Free`,
  }));

  console.log(freeRooms);

  if (freeRooms.length === 0) {
    return interaction.reply("No rooms found.");
  }

  // create embed with fields
  const embed = new EmbedBuilder().addFields(fields);
  return interaction.reply({ embeds: [embed] });
}
