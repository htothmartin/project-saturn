# Adatbázis

## EK Diagram

![ek diagram](./ek.drawio.png)

## Relációs adatbázisséma

Felhasználó(<u>id</u>, keresztnév, vezetéknév, email, jelszó, regisztrált, profilkép_url)

Projekt (<u>id</u>, név, létrehozva, frissítve, <i>felhaználó_id</u>, ikon)

Feladat (<u>id</u>, leírás, cím, prioritás, típus, státusz, létrehozva, frissítve, <i>hozzásrendelt_id<i>, <i>bejelentő_id</i>, <i>projekt_id</i>)

Sprint (<u>id</u>, szám, kezdő_dátum, befejező_dátum, <i>projekt_id</i>)

Tevékenységnapló (<u>id</u>, <i>felhasználó_id</i>, tevékenység, időbélyeg, <i>feladat_id</i>)

Komment (<u>id</u>, tartalom, <i>létrehozó_id</i>, <i>feladat_id</i>)

Felhasználó_Projek (<u><i>felhasználó_id</i></u>, <u><i>projekt_id</i></u>)

    A séma első normál formában, mivel miden attributum atomi.

    A séma második normál formában van, mivel minden nem kulcs attribútum teljes mértékben függ az elsődleges kulcstól.

    A séma harmadik normál formában van mivel nincs tranzitív függés az attribútumok között.

### **Felhasználó**

| **Mező**      | **Típus**    | **Megjegyzés** |
| ------------- | ------------ | -------------- |
| id            | INTEGER      | PK             |
| keresztnév    | VARCHAR(50)  |                |
| vezetéknév    | VARCHAR(50)  |                |
| email         | VARCHAR(100) |                |
| jelszó        | TEXT         |                |
| regisztrált   | TIMESTAMP    |                |
| profilkép_url | TEXT         |                |

---

### **Projekt**

| **Mező**      | **Típus**   | **Megjegyzés**   |
| ------------- | ----------- | ---------------- |
| id            | INTEGER     | PK               |
| név           | VARCHAR(50) |                  |
| létrehozva    | TIMESTAMP   |                  |
| frissítve     | TIMESTAMP   |                  |
| felhaználó_id | INTEGER     | FK (Felhasználó) |
| ikon          | VARCHAR(30) |                  |

---

### **Feladat**

| **Mező**         | **Típus**    | **Megjegyzés**   |
| ---------------- | ------------ | ---------------- |
| id               | INTEGER      | PK               |
| cím              | VARCHAR(150) |                  |
| leírás           | TEXT         |                  |
| prioritás        | VARCHAR(30)  |                  |
| típus            | VARCHAR(30)  |                  |
| státusz          | VARCHAR(30)  |                  |
| létrehozva       | TIMESTAMP    |                  |
| frissítve        | TIMESTAMP    |                  |
| hozzásrendelt_id | INTEGER      | FK (Felhasználó) |
| bejelentő_id     | INTEGER      | FK (Felhasználó) |
| projekt_id       | INTEGER      | FK (Projekt)     |

---

### **Sprint**

| **Mező**       | **Típus** | **Megjegyzés** |
| -------------- | --------- | -------------- |
| id             | INTEGER   | PK             |
| szám           | INTEGER   |                |
| kezdő_dátum    | TIMESTAMP |                |
| befejező_dátum | TIMESTAMP |                |
| projekt_id     | INTEGER   | FK (Projekt)   |

---

### **Tevékenységnapló**

| **Mező**       | **Típus**    | **Megjegyzés**   |
| -------------- | ------------ | ---------------- |
| id             | INTEGER      | PK               |
| felhasználó_id | INTEGER      | FK (Felhasználó) |
| tevékenység    | VARCHAR(100) |                  |
| időbélyeg      | TIMESTAMP    |                  |
| feladat_id     | INTEGER      | FK (Feladat)     |

---

### **Komment**

| **Mező**     | **Típus** | **Megjegyzés**   |
| ------------ | --------- | ---------------- |
| id           | INTEGER   | PK               |
| tartalom     | TEXT      |                  |
| létrehozó_id | INTEGER   | FK (Felhasználó) |
| feladat_id   | INTEGER   | FK (Projekt)     |

---

### **Felhasználó_Projek**

| **Mező**       | **Típus** | **Megjegyzés**       |
| -------------- | --------- | -------------------- |
| felhasználó_id | INTEGER   | PK, FK (Felhasználó) |
| projekt_id     | INTEGER   | PK, FK (Projekt)     |
