
const randomColors: string[] = [
	"#f05d5e",
	"#00a5cf",
	"#fcd757",
	"#054a91",
	"#00af54",
	"#FE6847",
	"#89BBFE",
	"#F8C630",
	"#F28482",
	"#9046CF"
];

export const getRandomColor = (): string => {
	return randomColors[Math.floor(Math.random() * randomColors.length)];
};
