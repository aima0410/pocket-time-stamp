// ---- Types ----
import ExperienceTable from "src/types/Level";

// ========== レベルデータ ==========
const levelTable: ExperienceTable = [
  { level: 1, requiredExp: 0, totalExp: 0 },
  { level: 2, requiredExp: 200, totalExp: 200 },
  { level: 3, requiredExp: 450, totalExp: 650 },
  { level: 4, requiredExp: 750, totalExp: 1400 },
  { level: 5, requiredExp: 1100, totalExp: 2500 },
  { level: 6, requiredExp: 1500, totalExp: 4000 },
  { level: 7, requiredExp: 1950, totalExp: 5950 },
  { level: 8, requiredExp: 2450, totalExp: 8400 },
  { level: 9, requiredExp: 3000, totalExp: 11400 },
  { level: 10, requiredExp: 3600, totalExp: 15000 },
  { level: 11, requiredExp: 4250, totalExp: 19250 },
  { level: 12, requiredExp: 4950, totalExp: 24200 },
  { level: 13, requiredExp: 5700, totalExp: 29900 },
  { level: 14, requiredExp: 6500, totalExp: 36400 },
  { level: 15, requiredExp: 7350, totalExp: 43750 },
  { level: 16, requiredExp: 8250, totalExp: 52000 },
  { level: 17, requiredExp: 9200, totalExp: 61200 },
  { level: 18, requiredExp: 10200, totalExp: 71400 },
  { level: 19, requiredExp: 11250, totalExp: 82650 },
  { level: 20, requiredExp: 12350, totalExp: 95000 },
  { level: 21, requiredExp: 13500, totalExp: 108500 },
  { level: 22, requiredExp: 14700, totalExp: 123200 },
  { level: 23, requiredExp: 15950, totalExp: 139150 },
  { level: 24, requiredExp: 17250, totalExp: 156400 },
  { level: 25, requiredExp: 18600, totalExp: 175000 },
  { level: 26, requiredExp: 20000, totalExp: 195000 },
  { level: 27, requiredExp: 21450, totalExp: 216450 },
  { level: 28, requiredExp: 22950, totalExp: 239400 },
  { level: 29, requiredExp: 24500, totalExp: 263900 },
  { level: 30, requiredExp: 26100, totalExp: 290000 },
  { level: 31, requiredExp: 27750, totalExp: 317750 },
  { level: 32, requiredExp: 29450, totalExp: 347200 },
  { level: 33, requiredExp: 31200, totalExp: 378400 },
  { level: 34, requiredExp: 33000, totalExp: 411400 },
  { level: 35, requiredExp: 34850, totalExp: 446250 },
  { level: 36, requiredExp: 36750, totalExp: 483000 },
  { level: 37, requiredExp: 38700, totalExp: 521700 },
  { level: 38, requiredExp: 40700, totalExp: 562400 },
  { level: 39, requiredExp: 42750, totalExp: 605150 },
  { level: 40, requiredExp: 44850, totalExp: 650000 },
  { level: 41, requiredExp: 47000, totalExp: 697000 },
  { level: 42, requiredExp: 49200, totalExp: 746200 },
  { level: 43, requiredExp: 51450, totalExp: 797650 },
  { level: 44, requiredExp: 53750, totalExp: 851400 },
  { level: 45, requiredExp: 56100, totalExp: 907500 },
  { level: 46, requiredExp: 58500, totalExp: 966000 },
  { level: 47, requiredExp: 60950, totalExp: 1026950 },
  { level: 48, requiredExp: 63450, totalExp: 1090400 },
  { level: 49, requiredExp: 66000, totalExp: 1156400 },
  { level: 50, requiredExp: 68600, totalExp: 1225000 },
  { level: 51, requiredExp: 71250, totalExp: 1296250 },
  { level: 52, requiredExp: 73950, totalExp: 1370200 },
  { level: 53, requiredExp: 76700, totalExp: 1446900 },
  { level: 54, requiredExp: 79500, totalExp: 1526400 },
  { level: 55, requiredExp: 82350, totalExp: 1608750 },
  { level: 56, requiredExp: 85250, totalExp: 1694000 },
  { level: 57, requiredExp: 88200, totalExp: 1782200 },
  { level: 58, requiredExp: 91200, totalExp: 1873400 },
  { level: 59, requiredExp: 94250, totalExp: 1967650 },
  { level: 60, requiredExp: 97350, totalExp: 2065000 },
  { level: 61, requiredExp: 100500, totalExp: 2165500 },
  { level: 62, requiredExp: 103700, totalExp: 2269200 },
  { level: 63, requiredExp: 106950, totalExp: 2376150 },
  { level: 64, requiredExp: 110250, totalExp: 2486400 },
  { level: 65, requiredExp: 113600, totalExp: 2600000 },
  { level: 66, requiredExp: 117000, totalExp: 2717000 },
  { level: 67, requiredExp: 120450, totalExp: 2837450 },
  { level: 68, requiredExp: 123950, totalExp: 2961400 },
  { level: 69, requiredExp: 127500, totalExp: 3088900 },
  { level: 70, requiredExp: 131100, totalExp: 3220000 },
  { level: 71, requiredExp: 134750, totalExp: 3354750 },
  { level: 72, requiredExp: 138450, totalExp: 3493200 },
  { level: 73, requiredExp: 142200, totalExp: 3635400 },
  { level: 74, requiredExp: 146000, totalExp: 3781400 },
  { level: 75, requiredExp: 149850, totalExp: 3931250 },
  { level: 76, requiredExp: 153750, totalExp: 4085000 },
  { level: 77, requiredExp: 157700, totalExp: 4242700 },
  { level: 78, requiredExp: 161700, totalExp: 4404400 },
  { level: 79, requiredExp: 165750, totalExp: 4570150 },
  { level: 80, requiredExp: 169850, totalExp: 4740000 },
  { level: 81, requiredExp: 174000, totalExp: 4914000 },
  { level: 82, requiredExp: 178200, totalExp: 5092200 },
  { level: 83, requiredExp: 182450, totalExp: 5274650 },
  { level: 84, requiredExp: 186750, totalExp: 5461400 },
  { level: 85, requiredExp: 191100, totalExp: 5652500 },
  { level: 86, requiredExp: 195500, totalExp: 5848000 },
  { level: 87, requiredExp: 199950, totalExp: 6047950 },
  { level: 88, requiredExp: 204450, totalExp: 6252400 },
  { level: 89, requiredExp: 209000, totalExp: 6461400 },
  { level: 90, requiredExp: 213600, totalExp: 6675000 },
  { level: 91, requiredExp: 218250, totalExp: 6893250 },
  { level: 92, requiredExp: 222950, totalExp: 7116200 },
  { level: 93, requiredExp: 227700, totalExp: 7343900 },
  { level: 94, requiredExp: 232500, totalExp: 7576400 },
  { level: 95, requiredExp: 237350, totalExp: 7813750 },
  { level: 96, requiredExp: 242250, totalExp: 8056000 },
  { level: 97, requiredExp: 247200, totalExp: 8303200 },
  { level: 98, requiredExp: 252200, totalExp: 8555400 },
  { level: 99, requiredExp: 257250, totalExp: 8812650 },
];

export default levelTable;