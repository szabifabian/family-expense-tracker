

# Családi büdzsékezelő alkalmazás [![Build Status](https://travis-ci.com/szabifabian/family-expense-tracker.svg?branch=master)](https://travis-ci.com/szabifabian/family-expense-tracker)

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

[Backend dokumentáció](https://github.com/szabifabian/family-expense-tracker/wiki/Backend-dokument%C3%A1ci%C3%B3)

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

- **User tábla**  (username, email, password, unique_code)
- **Invitation tábla** (invited_user, status, invited_by_id)
- **Family tábla** (family_name)
- **FamilyMember tábla** (role, user_id, family_id)
- **Balance tábla** (title, type, amount, about)  
- **Balance_FamilyMember kapcsolótábla** (balance_id, family_member_id)
  
### Objektumok közötti reláció  
  
- **User - FamilyMember**  (1 <-> N)
- **Family - FamilyMember**  (1<->n)
- **FamilyMember - Balance**  (n<->n)
- **User - Invitation** (1<->n)

## Feladat nem funkcionális követelményei  
  
- CSS keretrendszer használata igényes kinézet céljából  
- Felhasználói élmény biztosítása  
- Alkalmazáson belüli hibamentesség  
- Fejlesztői szinten jól skálázható kódbázis kialakítása

## Szerepkörök

- Regisztráció szinten mindenki felhasználó  
- Család létrehozója az adott családon belül az admin, ezáltal joga van a csoporton belül kidobni embereket
