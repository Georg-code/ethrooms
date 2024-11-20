import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { Building, Room, Roomid, rooms } from "../ethdata/roomdata";
import { getBelegungszeiten } from "../ethdata/getrooms";
import { isRoomFree } from "../ethdata/freerooms";
import { getallrooms } from "../ethdata/getallrooms";

export const data = new SlashCommandBuilder()
  .setName("rooms")
  .addStringOption((option) => {
    return option
      .setName("building")
      .setDescription("The building to search for")
      .setRequired(true);
  })
  .addIntegerOption((option) => {
    return option
      .setName("minimum")
      .setDescription("min min");
  })

  .setDescription("Find Rooms at ETH Zurich");

export async function execute(interaction: CommandInteraction) {
  // get the building from the user input
  const building = interaction.options.get("building")?.value as Building;
  const minmim = interaction.options.get("minimum")?.value as number;

  const freeRooms: Room[] = [];

  const allRooms = (await getallrooms()) as Record<Building, Room[]>;
  //console.log(allRooms);
  const roomPromises = allRooms[building].map(async (room) => {
    const roomid: Roomid = {
      building: building,
      room: { floor: room.floor, nr: room.nr },
    };

    const isFree = await isRoomFree(roomid, minmim);
    if (isFree) {
      freeRooms.push(room);
      console.log(`Room ${room.floor} ${room.nr} is free`);
    }
  });

  await Promise.all(roomPromises);

  // convert rooms into discordJS fields array
  const fields = freeRooms.slice(0, 25).map((room) => ({
    name: `${room.floor} ${room.nr}`,
    value: `Type: ${room.type}`,
  }));
  const date = new Date();
  if (freeRooms.length === 0) {
    const failembed = new EmbedBuilder()
      .addFields({
        name: "No rooms found",
        value: "get fucked",
      })
      .setTimestamp(date.getTime())
      .setColor("#FF0000")
      .toJSON();
    return interaction.reply({ embeds: [failembed] });
  }

  // create embed with fields
  const embed = new EmbedBuilder()
    .addFields(...fields)
    .setTimestamp(date.getTime())
    .setColor("#00FF00")
    .toJSON();
  return interaction.reply({ embeds: [embed] });
}
