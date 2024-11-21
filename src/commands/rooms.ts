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

  let removedRequests = 0;
  const allRooms = (await getallrooms()) as Record<Building, Room[]>;
  //console.log(allRooms);
  
  if (allRooms[building]) {
  const roomPromises = allRooms[building].map(async (room) => {
    const roomid: Roomid = {
      building: building,
      room: { floor: room.floor, nr: room.nr },
    };

    if (room.type == String("Ausstellungsfläche") || room.type == String("Sitzungszimmer") || room.type == String("Computer")) {
      removedRequests += 1;
      console.log("Ausstellungsfläche oder Sitzungszimmer entfernt")
    } else {
      const isFree = await isRoomFree(roomid, minmim);
      if (isFree) {
        freeRooms.push(room);
        console.log(`Room ${room.floor} ${room.nr} is free`);
      }
    }
   
  
  });

  // remove duplicates from the array freeRooms
  


  
  await Promise.all(roomPromises);
} else {
  return interaction.reply("Please learn to spell first"); 
}
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
    .setTitle("Free Rooms in " + building)
    .setImage(`https://www.files.ethz.ch/webrelaunch/gebaeude/bilder/${building}.jpg`)
    .setDescription(`Please be gentle! To get this information the bot issued ${allRooms[building].length + 2 - removedRequests} requests to ETH Servers. To reduce this number all Ausstellungsflächen, Sitzungszimmer and Computerräume are removed.`)
    .setTimestamp(date.getTime())
    .setColor("#00FF00")
    .toJSON();
  return interaction.reply({ embeds: [embed] });
}
