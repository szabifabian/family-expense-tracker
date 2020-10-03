# Családi büdzsékezelő alkalmazás

## Feladat funkcionális követelményei

### Projektötlet

 - Célja a családi költségek nyomonkövetése, naplózása
 - A felhasználók létrehozhatnak családi csoportokat, ahol nyomonkövethetik a családtagok költségvetéseit
 - Az alkalmazást több ilyen családi csoport egymástól függetlenül használhatja

### Felhasznált technológiák

 - Node.js + express.js + Typescript (Backend)
 - Adatbáziskezeléshez: SQLite
 - Backend <-> frontend kommunikáció: REST api
 - Git verziókövető rendszer
 - Angular (Frontend)

### Felhasználói történetek

 - Regisztráció lehetőség, mint felhasználó
 -  Bejelentkezés lehetőség, mint felhasználó
 - Minden felhasználónak van egy profilja amiben egy egyedi ID is szerepel, amivel meg tud hívni más felhasználót is ebbe a csoportba
 - A meghívott fél dönthet arról, hogy elfogadja vagy sem a meghívást
 - Lehetőség családi csoport létrehozására
 - A kiadás és bevételek kezelése csoport szinten
 - Felhasználóként engedélyezett a családból való kilépés
 - Család létrehozójaként kidobhat bárkit az adott csoportból
 - Kijelentkezés az alkalmazásból
 
### Adatbázis felépítése

 - Felhasználók tábla -> név, jelszó, e-mail cím, egyedi azonosító
 - Meghívás tábla -> meghívó, meghívott, státusz
 - Családok tábla -> család_id
 - Család tábla -> felhasználó_id, szerep
 - Költségek -> költség_id, típus, összeg, cím, leírás
 - Család_Költésgek kapcsolótábla ->  felhasználó_id, költség_id
 
 ### Objektumok közötti reláció
 
 - 1<->n: felhasználó - család
 - 1<->n: családok - család
 - n<->n: család - költségek
 - 1<->n: felhasználó - meghívás 

 ## Feladat nem  funkcionális követelményei
 
 - CSS keretrendszer használata igényes kinézet céljából
 - Felhasználói élmény biztosítása
 -  Alkalmazáson belüli hibamentesség
 - Fejlesztői szinten jól skálázható kódbázis kialakítása

## Szerepkörök

 - Regisztráció szinten mindenki felhasználó
 - Család létrehozója az adott családon belül az admin, ezálltal joga van a csoporton belül kidobni embereket
