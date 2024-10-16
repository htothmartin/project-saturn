# Szakdolgozat

## Issue Tracker dokumentacio

### Rendszer specifikacio

Az issu tracker alkalmazás célja, hogy otthoni és saját projekteket is könnyen lehessemn managelni egyedül, vagy akár kisebb csapatokban is. Az új felhasználók regisztrálhatnak egy új fiókot az oldalra, majd eztuán bejelentkezve érik el az oldal funkcióit. Lehetőségük van projekteket létrehozni, amihez meghívhatják ismerőseiket vagy az ismerőseik közül. A projektjeiket a főoldalon tekinthetik meg.

### Funkciok

- Regisztracio
- Bejelentkezes
- Projekt letrehozas
- Felhasznalok meghivasa
- Projekt setup
- Taskok felvetele
- Taskok allapota
- Comment a taskokon
- Taskok priorititasa
- Sprintek letrehozasa

### Fukcionális követelmények

1. Felhasználókezelés
   1. Az oldalra látogató felhasználóknak lehetőségük van regisztrálni az alkalmazásba. Megadandó adatok: vezetéknév, keresztnév, email, jelszó, jelszó ismét, születési dátum
   2. Lehetőség van belépésre az email cím és a jelszó megadásával.
   3. Minden felhasználó rendelkezik egy profil oldalal, ahol az alap adatokat módosíthatja. Beállíthat profilképet.
2. Projektkezelés
   1. Minden felhasználó létrehozhat projekteket, amihez email cím alapján hozzáadhat tagokat.
   2. A projektnek megadhatja a nevét. A projekthez létrehozhat sprinteket, aminek meg kell adnia a kezdő és a befejező dátumot.
   3. A saját projektjeit a felhasználó tudja törölni is.
3. Sprintek
   1. A sprintek projektekhez tartoznak, minden ember láthatja, aki hozzá van rendelve a projekthez.
   2. A sprintekhez létrehozhatóak issuek, amiket a fejlesztőknek kell a sprintben teljesíteni.
   3. A sprinteknek kulon statiszkakikat jeleneithetok meg, hogy ki milyen hatekonyan dolgozott a projekten, es teljesitette-e tervezett taskokat.2
4. Feladatok
   1. A feladatokat a projekthez rendelt felhasználók létrehozhatják. Megadhatják a címét, leírását hozzárendelt személyt, prioritást.
   2. A feladtoknak van egy sztátusza ami jelzi hogy milyen fázisban van a feladat.
5. Kommentek
   1. Kommenteket a felhasználók a feladatakhoz addhatnak hogy kommunikáljanak a többi fejlesztővel.
