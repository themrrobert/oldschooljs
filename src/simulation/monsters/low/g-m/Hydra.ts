import LootTable from '../../../../structures/LootTable';
import SimpleMonster from '../../../../structures/SimpleMonster';
import HerbDropTable from '../../../subtables/HerbDropTable';
import { NotedHerbTable } from '../../../subtables/NotedHerbTable';
import { GemTable } from '../../../subtables/RareDropTable';
import RareSeedTable from '../../../subtables/RareSeedTable';

const HydraOffTaskUniqueTable = new LootTable()
	.oneIn(1_801, "Hydra's eye")
	/* We're only rolling the eye, bot will transmog.
	* it should be 1801 x 3 if you wanted to randomly assign
	.oneIn(1_801, "Hydra's heart")
	.oneIn(1_801, "Hydra's fang")
 	*/
	.oneIn(5_001, 'Hydra tail')
	.oneIn(10_000, 'Dragon thrownaxe', [200, 400])
	.oneIn(10_001, 'Dragon knife', [200, 400]);

const HydraOnTaskUniqueTable = new LootTable()
	.oneIn(1_801, "Hydra's eye")
	/* We're only rolling the eye, bot will transmog.
	* it should be 1801 x 3 if you wanted to randomly assign
	.oneIn(1_801, "Hydra's heart")
	.oneIn(1_801, "Hydra's fang")
 	*/
	.oneIn(5_001, 'Hydra tail')
	.oneIn(10_000, 'Dragon thrownaxe', [200, 400])
	.oneIn(10_001, 'Dragon knife', [200, 400]);

export const HydraPreTable = new LootTable()
	/* Weapons and armour */
	.add('Fire battlestaff', 1, 5)
	.add('Water battlestaff', 1, 5)
	.add("Black d'hide chaps", 1, 3)
	.add('Rune kiteshield', 1, 3)
	.add('Battlestaff', [2, 3], 2)
	.add('Rune platebody', 1, 1)
	.add('Mystic robe bottom', 1, 1)
	.add('Dragon longsword', 1, 1)

	/* Runes */
	.add('Blood rune', [15, 45], 9)
	.add('Chaos rune', [20, 50], 9)
	.add('Death rune', [30, 60], 9)
	.add('Fire rune', [70, 90], 9)
	.add('Law rune', [30, 60], 9)
	.add('Water rune', [70, 90], 9)

	/* Herbs */
	.add(HerbDropTable, 1, 4)
	.add(NotedHerbTable, 1, 2)

	/* Seeds */
	.add(RareSeedTable, 1, 4)

	/* Bolt tips */
	.oneIn(256, 'Diamond bolt tips', 20)
	.oneIn(285, 'Ruby bolt tips', 20)
	.oneIn(284, 'Emerald bolt tips', 20)
	.oneIn(366, 'Dragonstone bolt tips', 20)
	.oneIn(853, 'Onyx bolt tips', 20)
	.oneIn(1280, 'Sapphire bolt tips', 20)

	/* Other */
	.add('Coins', [500, 3500], 16)
	.add('Monkfish', 1, 11)
	.add('Super restore(1)', [1, 2], 6)
	.add('Super combat potion(1)', 1, 4)
	.add('Dragon bones', [3, 5], 3)

	/* Gem drop table */
	.add(GemTable, 1, 5);

const HydraTable = new LootTable()
	.every('Hydra bones')
	.every(HydraPreTable)
	// Uniques are also tertiary, so this is ok:
	.every(HydraOffTaskUniqueTable)

	/* Tertiary */
	.tertiary(128, 'Clue scroll (hard)')
	.tertiary(512, 'Clue scroll (elite)');

const HydraOnTaskTable = new LootTable()
	.every('Hydra bones')
	.every(HydraPreTable)
	// Uniques are also tertiary, so this is ok:
	.every(HydraOnTaskUniqueTable)

	/* Tertiary */
	.tertiary(128, 'Clue scroll (hard)')
	.tertiary(512, 'Clue scroll (elite)');

export default new SimpleMonster({
	id: 8609,
	name: 'Hydra',
	table: HydraTable,
	onTaskTable: HydraOnTaskTable,
	aliases: ['hydra']
});
