
# Családi büdzsékezelő alkalmazás

## Feladat funkcionális követelményei

### Projektötlet

A projekt célja a családi költségek nyomon követése, naplózása. A felhasználók létrehozhatnak családi csoportot, ahova meghívhatják a család a többi tagját az egyedi azonosítójuk segítségével. A családon belül lehetőség van a bevételek, kiadások felvételére, kezelésére, amelyet a vizuális megjelenés szemléletesebbé tesz. (chartok). Az alkalmazást több család is használhatja egymástól függetlenül.

### Felhasznált technológiák

#### Backend
- Node.js
- Express.js
- Typescript 
- SQLite  
- REST api  (Frotend - Backend kommunikáció)

#### Frontend
- Angular (Frontend)

#### Verziókövető

- GitHub

### Felhasználói történetek

- Regisztráció lehetőség, mint felhasználó  
- Bejelentkezés lehetőség, mint felhasználó 
- Családi csoport létrehozása, és a család többi tagjának meghívása egy egyedi azonosító segítségével. (A család létrehozója admin jogon kap a családon belül)
- A meghívott fél dönthet arról, hogy elfogadja vagy sem a meghívást  
- A kiadás és bevételek kezelése csoport szinten  
- Felhasználóként engedélyezett a családból való kilépés  
- Család létrehozójaként kidobhat bárkit az adott csoportból  
- Kijelentkezés az alkalmazásból  
  
### Adatbázis felépítése

- **Felhasználók tábla**  (név, jelszó, e-mail cím, egyedi azonosító )
- **Meghívás tábla** (meghívó, meghívott, státusz)
- **Családok tábla** (család_id )
- **Család tábla** (felhasználó_id, szerep )
- **Költségek** (költség_id, típus, összeg, cím, leírás)  
- **Család Költségek kapcsolótábla** (felhasználó_id, költség_id )
  
### Objektumok közötti reláció  
  
- **felhasználó** - család  (1 <-> N)
- **családok** - család  (1<->n)
- **család** - költségek  (n<->n)
- **felhasználó** - meghívás (1<->n)

## Feladat nem funkcionális követelményei  
  
- CSS keretrendszer használata igényes kinézet céljából  
- Felhasználói élmény biztosítása  
- Alkalmazáson belüli hibamentesség  
- Fejlesztői szinten jól skálázható kódbázis kialakítása

## Szerepkörök

- Regisztráció szinten mindenki felhasználó  
- Család létrehozója az adott családon belül az admin, ezáltal joga van a csoporton belül kidobni embereket